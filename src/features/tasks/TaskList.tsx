import { create } from 'zustand';
import api from '../../services/api.js';

export type Task = {
  id: string;
  titulo: string;
  descricao: string;
  status: string;
  user_id: number;
};

type TaskStore = {
  tasks: Task[];
  loading: boolean;
  error: string | null;

  fetchTasks: () => Promise<void>;
  addTask: (titulo: string, descricao: string) => Promise<void>;
  updateTask: (id: string, titulo: string, descricao: string) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get<Task[]>('/tasks');
      set({ tasks: data, loading: false });
    } catch {
      set({ error: 'Erro ao carregar tasks', loading: false });
    }
  },

  addTask: async (titulo, descricao) => {
    set({ error: null });
    try {
      const { data } = await api.post<Task>('/tasks', { titulo, descricao });
      set({ tasks: [...get().tasks, data] });
    } catch {
      set({ error: 'Erro ao criar task' });
    }
  },

  updateTask: async (id, titulo, descricao) => {
    set({ error: null });
    try {
      const { data } = await api.put<Task>(`/tasks/${id}`, {
        titulo,
        descricao,
      });
      set({
        tasks: get().tasks.map((t) => (t.id === id ? data : t)),
      });
    } catch {
      set({ error: 'Erro ao editar task' });
    }
  },

  removeTask: async (id) => {
    set({ error: null });
    try {
      await api.delete(`/tasks/${id}`);
      set({
        tasks: get().tasks.filter((t) => t.id !== id),
      });
    } catch {
      set({ error: 'Erro ao excluir task' });
    }
  },
}));
