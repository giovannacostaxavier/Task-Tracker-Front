import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  //tipagem da funcao <AuthState>()
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      login: (token) => set({ token, isAuthenticated: true }),
      logout: () => set({ token: null, isAuthenticated: false }),
    }),
    {
      //configuracao de persistencia
      name: 'auth-storage', //nome que fica salvo no localStorage
      storage: createJSONStorage(() => localStorage),
      // usa o localStorage como mecanismo de armazenamento
    },
  ),
);

/*IMPORTANTE: esse codigo pode ser reutilizado para outros projetos que precisem de guardar o token e se o usuario esta logado ou nao no localStorage com persistencia, precisando de algumas adaptacoes a depender da proposta*/
