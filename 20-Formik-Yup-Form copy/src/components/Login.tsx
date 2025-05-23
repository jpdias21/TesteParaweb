import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
    const navigate = useNavigate()
    const [mostraSenha, setMostrarSenha]= useState(false)

    const validation = Yup.object({
        email : Yup.string()
        .email('Digite seu email')
        .required() , 
        senha : Yup.string()
        .required('Digite sua senha')
    })
    return (
    
    <>
    <Formik 
    initialValues={{email :'', senha: ''}}
    validationSchema={validation}
    onSubmit={async (values : any , {resetForm}) =>{
        try {
            const response = await axios.post("https://testeparaweb.onrender.com/api/login", values)
            console.log('Login realizado', response.data)
            resetForm()
            navigate('/Realizado')
        } catch (error) {
            console.error('error', error)
        }
    }}
    >
        <Form>
            <h3>Realize o login</h3>
            <label> Email : </label>
            <Field name='email' type='email' placeholder='Digigte seu email'/>
            <ErrorMessage name='email' component='div' />
            <br />
            <label>Senha : </label>
            <Field name='senha' placeholder='Digite sua senha' type={mostraSenha ? 'text' : 'password'} />
            <button type='button' onClick={() => setMostrarSenha(!mostraSenha)}>{mostraSenha ? 'Ocultar senha' : 'Mostrar senha' } </button>
            <ErrorMessage name='senha' />
            <br />
            <button type='submit'>Login</button>
        </Form>
    </Formik>
    </>
  )
}

export default Login