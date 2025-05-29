import axios from 'axios'

const API = 'http://localhost:3000'

interface VeiculoData {
    marca_carro: string;
    modelo_carro: string;
    ano_carro: string;
    cor: string;
    estado_do_veiculo: string;
    numero_de_portas: string;
    quilometragem: string;
    valor_carro: string;
  }
  
export const cadastroCarro = async (dados : VeiculoData) => {
    const response = await axios.post(`${API}/cadastro`, dados)
    return response.data
}

export const buscarPeloId = async(id : string) => {
  const response = await axios.get(`${API}/cadastro/${id}`)
  return response.data
}

export const apagarDadosDoCarro = async (id : string) => {
  const response = await axios.delete(`${API}/cadastro/${id}`)
  return response
}

export const mostrarTodosCarrosDisponiveis = async () => {
  const response = await axios.get(`${API}/cadastro`)
  return response.data
}