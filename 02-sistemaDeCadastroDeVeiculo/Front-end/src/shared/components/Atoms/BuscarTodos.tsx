import React, { useState } from 'react'
import { mostrarTodosCarrosDisponiveis } from '../../../services/userService'

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
function BuscarTodos() {
  const [dados, setDados] = useState<Carro[]>([])

  const mostrarCarro = async () => {
    try {
      const response = await mostrarTodosCarrosDisponiveis()
      setDados(response)
    } catch (error) {
      console.log('Deu erro',error)

    }
  }
  return (
    <div className="app-container">
        <div className="text-center mb-4">
            <button onClick={mostrarCarro} className="btn-primary btn-large">Mostrar Todos os carros disponniveis</button>
        </div>
        
        <hr />
        
        <div className="cars-list">
            {dados.map((carro, index) => (
                <div key={index} className="car-card">
                    <div className="car-header">
                        <h4>{carro?.marca_carro} {carro?.modelo_carro}</h4>
                        <div className="car-value">R$ {carro?.valor_carro}</div>
                    </div>
                    
                    <div className="car-details">
                        <div className="detail-item">
                            <span className="label">Ano</span>
                            <span className="value">{carro?.ano_carro}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Cor</span>
                            <span className="value">{carro?.cor}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Estado</span>
                            <span className="value">{carro?.estado_do_veiculo}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Portas</span>
                            <span className="value">{carro?.numero_de_portas}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Quilometragem</span>
                            <span className="value">{carro?.quilometragem}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)
}

export default BuscarTodos