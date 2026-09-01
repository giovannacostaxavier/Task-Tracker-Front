import api from '../../services/api';
import type { LoginFormData, CadastroFormData } from './schemas';

export const loginUser = async (data: LoginFormData) => { // Recebe data que é do tipo LoginFormData, ou seja um objeto com email e senha
  const response = await api.post('/login', data);// Faz um pedido POST para LOGIN 
  return response.data; // Esse response.data vem do AXIOS e tras o corpo da resposta
};

export const cadastroUser = async (data: CadastroFormData) => { //Recebe data que é do tipo CadastroFormData, ou seja um objeto com nome, email e senha
  const response = await api.post('/users', data); // Faz um pedido POST para USERS
  return response.data; // Corpo da resposta AXIOS
};
