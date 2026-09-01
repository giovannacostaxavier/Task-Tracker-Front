import axios from 'axios';
import { useAuthStore } from '../features/auth/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
}); // Define o endereço do backend uma unica vez 

api.interceptors.request.use((config) => { 
  const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}); // Adiciona o token automaticamente em cada pedido
api.interceptors.response.use(
  (response) => response, // Função caso dê tudo certo
  (error) => { // função caso dê erro
    if (error.response?.status === 401) {
      useAuthStore.getState().logout(); // Se der erro chama o logout
      window.location.href = '/login'; // Atualiza realmente a pagina toda 
    }
    return Promise.reject(error); // Rejeito mesmo a promisse pra deixar claro que o erro nao foi resolvido
  },
);

export default api;
