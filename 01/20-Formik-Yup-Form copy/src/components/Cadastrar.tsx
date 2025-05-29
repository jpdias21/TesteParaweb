
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Values{
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    senha: string;
    confirmarSenha : string

}

function Cadastrar() {
    const [cadastroRealizado,setCadastroRealizado] = useState<boolean>(false)
    const navigate = useNavigate()
    const [mostraSenha, setMostrarSenha]= useState(false)
   
   
    const valitaion = Yup.object({
        nome : Yup.string()
        .min(2,'Nome muito curto')
        .max(50, 'Muito longo')
        .required('Este campo e obrigatorio'), 
        sobrenome : Yup.string()
        .min(2, 'Muito curto')
        .max(50, 'Muito longo')
        .required('Campo obrigatorio'),
        email : Yup.string()
        .email('Email invalido')
        .required('Campo Obrigatorio'),
        telefone : Yup.string()
        .matches(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
        .required('Numero obrigatorio'),
        senha : Yup.string()
        .min(6,'Senha muito curta')
        .required('Campo Obrigatorio') ,
        confirmarSenha : Yup.string()
        .oneOf([Yup.ref('senha')], 'As senhas devem ser iguais')
        .required('Confirme sua senha')
      })
  return (
    <>
      <Formik
      initialValues={{nome : '', sobrenome: '', email : '', telefone : '',senha : '', confirmarSenha : ''}}
      validationSchema={valitaion}
      onSubmit={async (values: Values, {resetForm}) => {
        try {
          const response = await axios.post("https://testeparaweb.onrender.com/api/registro", values)
          console.log('response', response.data)
          resetForm()
          setCadastroRealizado(true)
        } catch (error) {
          console.error('Erro', error)  
        }
      }}
      >
        <Form>      
          <label>Nome: </label>
          <Field name='nome' placeholder='Digite seu nome' />
          <ErrorMessage name='nome' component='div'/>
          <br />
          <label>Sobre nome : </label>
          <Field name='sobrenome' placeholder='Digite seu sobrenome'/>
          <ErrorMessage name='sobrenome' component='div'/>
          <br />
          <label>Email : </label>
          <Field name='email' type='email' placeholder='Digite seu email' />
          <ErrorMessage name='email' component='div'/>
          <br />
          <label>Telefone : </label>
          <Field name='telefone' placeholder='Digite seu telefone' />
          <ErrorMessage name='telefone' component='div'/>
          <br />
          <label>Senha : </label>
          <Field name='senha' placeholder='Digite uma senha' type={mostraSenha ? 'text' : 'password'} />
          <ErrorMessage name='senha' component='div'/>
          <br />
          <Field name='confirmarSenha' placeholder='confirme sua senha' type={mostraSenha ? 'text' : 'password'} />
          <br />
          <button type='button' onClick={() => setMostrarSenha(!mostraSenha)}>{mostraSenha ? 'Ocultar senha' : 'Mostrar senha' } </button>
            <ErrorMessage name='senha' />
          <button type='submit'>Cadastrar</button>
        </Form>
      </Formik>
      <br />
      {cadastroRealizado ? <p>Cadastro realizado com sucesso</p> : ''}
      <br />
      {cadastroRealizado ? <button onClick={() => navigate('/login')}>Faça login</button> : ''}
    </>
  )
}

export default Cadastrar