import React, { useState } from 'react'
import { buscarPeloId } from '../../../services/userService'

interface Carro {
  marca_carro: string;
  modelo_carro: string;
  ano_carro: string;
  cor: string;
  estado_do_veiculo: string;
  numero_de_portas: string;
  quilometragem: string;
  valor_carro: string;
}

function BuscarPeloId() {
 const [id, setId] = useState<string>('')  
 const [carro, setCarro] = useState<Carro | null>(null)
 const [naoTemCarro, setNaoTemCarro] = useState<boolean>(true)
 const resultado = async(event :any) => {
    event.preventDefault()
    try {
       const response =await buscarPeloId(id)
        setCarro(response)
        setNaoTemCarro(true)
    } catch (error) {
      setNaoTemCarro(false)  
      console.error('Deu erro', error)  
    }
 }
 return (
  <div className="form-container">
      <h2>Busque o carro pelo id</h2>
      
      <form onSubmit={resultado}>
          <div className="form-group">
              <input type="text" value={id} required placeholder='Digite o id do carro' onChange={(event) => setId(event.target.value)}/>
          </div>
          <div className="form-actions">
              <button type='submit' className="btn-primary">Buscar</button>
          </div>
      </form>
      
      {naoTemCarro === false && <div className="message error">Nao existe um carro com este id</div>}
      
      {carro && (
          <div className="info-card">
              <h3>Dados do Carro:</h3>
              <div className="info-grid">
                  <div className="info-item">
                      <strong>Marca:</strong> <span>{carro.marca_carro}</span>
                  </div>
                  <div className="info-item">
                      <strong>Modelo:</strong> <span>{carro.modelo_carro}</span>
                  </div>
                  <div className="info-item">
                      <strong>Ano:</strong> <span>{carro.ano_carro}</span>
                  </div>
                  <div className="info-item">
                      <strong>Cor:</strong> <span>{carro.cor}</span>
                  </div>
                  <div className="info-item">
                      <strong>Estado:</strong> <span>{carro.estado_do_veiculo}</span>
                  </div>
                  <div className="info-item">
                      <strong>Portas:</strong> <span>{carro.numero_de_portas}</span>
                  </div>
                  <div className="info-item">
                      <strong>Quilometragem:</strong> <span>{carro.quilometragem}</span>
                  </div>
                  <div className="info-item">
                      <strong>Valor:</strong> <span>R$ {carro.valor_carro}</span>
                  </div>
              </div>
          </div>
      )} 
  </div>
)
}

export default BuscarPeloId