import api from '../../services/api';
import type { LoginFormData, CadastroFormData } from './schemas';

export const loginUser = async (data: LoginFormData) => {
  const response = await api.post('/login', data);
  return response.data;
};

export const cadastroUser = async (data: CadastroFormData) => {
  const response = await api.post('/users', data);
  return response.data;
};
