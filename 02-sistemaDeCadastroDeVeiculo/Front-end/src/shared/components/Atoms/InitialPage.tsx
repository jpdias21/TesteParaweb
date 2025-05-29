import React from 'react'
import { useNavigate } from 'react-router-dom'

function InitialPage() {
    const navigate = useNavigate()
    const registraCarro = () => {
        navigate('/RegistreVehicle')
    }
    const buscarCarro = () => {
        navigate('/BuscarPeloId')
    }
    
    const apagarCarro = () => {
        navigate('/ApagarCarro')
    }
    const buscarTodos = () => {
        navigate('/BuscarTodos')
    }
    return (
    <>
  <div className="initial-page">
  <h1>Sistema de Cadastro de Veículos</h1>
  <p className="subtitle">Gerencie sua frota de veículos de forma simples e eficiente</p>
  
  <div className="button-grid">
    <button className="btn-primary btn-large" onClick={registraCarro}>
      🚗 Registrar Carro
    </button>
    <button className="btn-primary btn-large" onClick={buscarCarro}>
      🔍 Buscar Carro
    </button>
    <button className="btn-danger btn-large" onClick={apagarCarro}>
      🗑️ Apagar Carro
    </button>
    <button className="btn-secondary btn-large" onClick={buscarTodos}>
      📋 Buscar Todos
    </button>
  </div>
</div>
    </>
  )
}

export default InitialPage