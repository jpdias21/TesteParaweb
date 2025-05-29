import { cadastroCarro } from '../../../services/userService.ts'
import { useState } from 'react'


function RegisterVehicle() {
    const [confirmarRegistro, setConfirmaRegistro] = useState<boolean | null>(null)
    
    const cadastro = async(event : any, ) => {
      event.preventDefault()
      try {
        const dadosLimpos = {
          ...dados,
          valor_carro: dados.valor_carro.replace(/\D/g, ''), // remove R$, ponto e vírgula
          quilometragem: dados.quilometragem.replace(/\D/g, '') // remove pontos
        }
    
        await cadastroCarro(dadosLimpos)
        setConfirmaRegistro(true)
        setDados({
          marca_carro: "",
          modelo_carro: "", 
          ano_carro: "", 
          cor: "", 
          estado_do_veiculo: "", 
          numero_de_portas: "",  
          quilometragem: "", 
          valor_carro: ""
        })
        } catch (error) {
          console.error(error, 'deu erro')
          setConfirmaRegistro(false)
        }
    }
    const [dados, setDados] = useState({
      marca_carro: "",
      modelo_carro: "", 
      ano_carro: "", 
      cor: '', 
      estado_do_veiculo: '', 
      numero_de_portas: '',  
      quilometragem: "", 
      valor_carro: ""
    })
//
  const mascaraMoeda = (event: React.ChangeEvent<HTMLInputElement>) => {
      const onlyDigits = event.currentTarget.value
        .replace(/\D/g, '') // remove tudo que não for número
        .padStart(3, "0")
    
      const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    
      const valorFormatado = maskCurrency(digitsFloat)
    
      setDados(prev => ({ ...prev, valor_carro: valorFormatado }))
    }
    
    const maskCurrency = (valor: string, locale = 'pt-BR', currency = 'BRL') => {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
      }).format(parseFloat(valor))
    }
//
const mascaraQuilometragem = (event: React.ChangeEvent<HTMLInputElement>) => {
  // Remove tudo que não for número
  const somenteNumeros = event.currentTarget.value.replace(/\D/g, '')

  // Formata com separador de milhar (pt-BR usa ponto)
  const formatado = new Intl.NumberFormat('pt-BR').format(Number(somenteNumeros))

  // Atualiza o estado
  setDados(prev => ({ ...prev, quilometragem: formatado }))
}

return (
    <>
    <h2>Faça o cadastro do veiculo</h2>
    <br />
    <form onSubmit={cadastro}>
    <label>Marca do carro : </label>
    <input type="text" value={dados.marca_carro} required placeholder='Digite o marca do carro' onChange={(event) => setDados({...dados, marca_carro : event.target.value})} />
    <br />
    <label>Modelo do carro : </label>
    <input type="text" value={dados.modelo_carro} required placeholder='Digite o modelo do carro' onChange={(event) => setDados({...dados, modelo_carro : event.target.value})} />
    <br />
    <label>Ano do carro : </label>
    <input type="text" value={dados.ano_carro} required placeholder='Ano de fabricaçao' onChange={(event) => setDados({...dados, ano_carro : event.target.value})} />
    <br />
    <label>Cor do carro : </label>
    <input type="text" value={dados.cor} required placeholder='Digite a cor do carro' onChange={(event) => setDados({...dados, cor : event.target.value})} />
    <br />
    <label>Numero de portas : </label>
    <input type="text" value={dados.numero_de_portas} required placeholder='Digite o numro de portas' onChange={(event) => setDados({...dados, numero_de_portas: event.target.value})} />
    <br />
    <label>Quilometragem: </label>
    <input type="text" value={dados.quilometragem} required placeholder='Digite a quilometragem do carro' onChange={mascaraQuilometragem} />
    <br />
    <label>Valor do carro : </label>
    <input type="text" value={dados.valor_carro} required placeholder='o valor do carro' onChange={mascaraMoeda} />
    <br />
    <br />
  <button type='submit'>Enviar</button>
  </form>
  <br />
  <br />
  {confirmarRegistro ? <p>Registro confirmado</p> : ""}
    </>
  )
}

export default RegisterVehicle