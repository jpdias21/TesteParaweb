import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const valitation = Yup.object({
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
    validateSchema={valitation}
    onSubmit={async (values : any , {resetForm}) =>{
        try {
            const response = await axios.get("https://apigenerator.dronahq.com/api/c5NwQzpP/data", values)
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
            <Field name='senha' placeholder='Digite sua senha' />
            <ErrorMessage name='senha' />
            <br />
            <button type='submit'>Login</button>
        </Form>
    </Formik>
    </>
  )
}

export default Login