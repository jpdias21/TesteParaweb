import './Home.scss'
import BemVindo from '../components/BemVindo'
import Cadastrar from '../components/Cadastrar'
import Login from '../components/Login'
import Realizado from '../components/Realizado'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'


function Home() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<BemVindo/>}/>
    <Route path='/Cadastrar' element={<Cadastrar/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Realizado' element={<Realizado/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Home
