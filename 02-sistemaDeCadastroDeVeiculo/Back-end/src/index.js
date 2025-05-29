const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const pool = require('./db')


app.use(express.json())
app.use(cors())
///buscar todos os veículos disponíveis 
app.get('/cadastro', async (request, response) => {
    try {
        const {rows} = await pool.query('SELECT * FROM "Carros"')
        response.json(rows)
    } catch (error) {
        console.error(error, 'deu erro')
        response.status(500).send('Deu erro')
    }
})

//buscar um veículo específico através do ID 
app.get('/cadastro/:id', async (request, response) => {
    const id = request.params.id
    try {
        const {rows} = await pool.query('SELECT * FROM "Carros" WHERE id = $1', [id])
        if(rows.length === 0){
            return response.status(400).json({mensagem : 'carro nao encontrado'})
        }
        response.status(200).json(rows[0])
    } catch (error) {
        console.error(error, 'deu erro')
        response.status(500).json({ error: 'Erro ao buscar carro' }) 
    }
})

///cadastrar um novo veículo na loja
app.post('/cadastro', async (request, response) => {
    const { marca_carro,modelo_carro,ano_carro,cor,estado_do_veiculo,numero_de_portas,quilometragem,valor_carro} = request.body

    try {
        const resultado = await pool.query('INSERT INTO "Carros" (marca_carro,modelo_carro,ano_carro,cor,estado_do_veiculo,numero_de_portas,quilometragem,valor_carro) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [marca_carro,modelo_carro,ano_carro,cor,estado_do_veiculo,numero_de_portas,quilometragem,valor_carro])
        response.status(200).json(resultado.rows[0])
    } catch (error) {
            console.error(error, 'deu erro')
            response.status(500).json({erro: 'Erro ao cadastrar'})
    }
})

//Atulizar 
app.put('/cadastro/:id', async (request, response) => {
    const id = request.params.id;

    const {
        marca_carro,modelo_carro,ano_carro,cor,estado_do_veiculo,numero_de_portas,quilometragem,valor_carro
    } = request.body;

    try {
        const resultado = await pool.query(
            `UPDATE "Carros" SET marca_carro = $1, modelo_carro = $2, ano_carro = $3, cor = $4, estado_do_veiculo = $5, numero_de_portas = $6, quilometragem = $7, valor_carro = $8 WHERE id = $9 RETURNING *`,
            [marca_carro,modelo_carro,ano_carro,cor,estado_do_veiculo,numero_de_portas,quilometragem,valor_carro,id
            ]
        );

        if (resultado.rows.length === 0) {
            return response.status(404).json({ erro: 'Carro não encontrado para atualização.' });
        }

        response.status(200).json({ mensagem: 'Carro atualizado com sucesso!', carro: resultado.rows[0] });
    } catch (error) {
        console.error(error, 'Erro ao atualizar o carro');
        response.status(500).json({ erro: 'Erro no servidor ao atualizar o carro' });
    }
})


//excluir um veículo vendido através do ID
app.delete('/cadastro/:id', async(request, response) => {
    const id = request.params.id

    try {
        const {rows} = await pool.query('DELETE FROM "Carros" WHERE id = $1 RETURNING*', [id])
        if(rows.length === 0){
            return response.status(400).json({mensagem: 'Carro nao encontrado'})
        }
        response.status(200).json(rows[0])
    } catch (error) {
        console.error(error)
        response.status(500)
    }
})

app.listen(PORT, () => {
    console.log('Sercidor iniciado')
})