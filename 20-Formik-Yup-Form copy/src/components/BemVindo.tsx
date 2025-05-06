import React from 'react'
import Cadastrar from './Cadastrar'
import { useNavigate } from 'react-router-dom'

function BemVindo() {
    const navigate = useNavigate()
    function cadastrar () {
        navigate('/Cadastrar')
    }
    function login () {
        navigate('/Login')
    }
  return (
    <>
    <h1>Bem vindo a nossa pagina o que voce deseja</h1>
    <button onClick={cadastrar}>Cadastrar</button>
    <button onClick={login}>Realizar login</button>
    <button>Encerrar a conta</button>
    </>
  )
}

export default BemVindo