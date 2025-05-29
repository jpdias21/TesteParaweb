import { BrowserRouter, Route, Routes} from 'react-router-dom'
import RegisterVehicle from '../shared/components/Molecules/RegisterVehicle'
import BuscarPeloId from '../shared/components/Atoms/BuscarPeloId'
import ApagarCarro from '../shared/components/Atoms/ApagarCarro'
import InitialPage from '../shared/components/Atoms/InitialPage'
import BuscarTodos from '../shared/components/Atoms/BuscarTodos'
import './App.scss'

function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<InitialPage/>}/>
          <Route path='/RegistreVehicle' element={<RegisterVehicle/>}/>
          <Route path='/BuscarPeloId' element={<BuscarPeloId/>}/>
          <Route path='/ApagarCarro' element={<ApagarCarro/>}/>
          <Route path='/BuscarTodos' element={<BuscarTodos/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
