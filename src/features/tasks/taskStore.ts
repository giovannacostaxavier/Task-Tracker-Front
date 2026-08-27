import { create } from 'zustand';
import * as taskService from './taskService';
import type { Task, TaskFormData } from './schemas';

type TaskStore = {
  tasks: Task[];
  loading: boolean;
  error: string | null;

  fetchTasks: () => Promise<void>;
  addTask: (data: TaskFormData) => Promise<void>;
  updateTask: (id: string, data: TaskFormData) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  moveTask: (id: string, status: string) => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await taskService.fetchTasks();
      set({ tasks, loading: false });
    } catch {
      set({ error: 'Erro ao carregar tasks', loading: false });
    }
  },

  addTask: async (data) => {
    set({ error: null });
    try {
      const novaTask = await taskService.createTask(data);
      set({ tasks: [...get().tasks, novaTask] });
    } catch {
      set({ error: 'Erro ao criar task' });
    }
  },

  updateTask: async (id, data) => {
    set({ error: null });
    try {
      const taskAtualizada = await taskService.updateTask(id, data);
      set({
        tasks: get().tasks.map((t) => (t.id === id ? taskAtualizada : t)),
      });
    } catch {
      set({ error: 'Erro ao editar task' });
    }
  },

  removeTask: async (id) => {
    set({ error: null });
    try {
      await taskService.deleteTask(id);
      set({ tasks: get().tasks.filter((t) => t.id !== id) });
    } catch {
      set({ error: 'Erro ao excluir task' });
    }
  },
  moveTask: async (id, status) => {
    set({ error: null });
    try {
      const taskAtualizada = await taskService.updateTaskStatus(id, status);
      set({
        tasks: get().tasks.map((t) => (t.id === id ? taskAtualizada : t)),
      });
    } catch {
      set({ error: 'Erro ao mover task' });
    }
  },
}));
