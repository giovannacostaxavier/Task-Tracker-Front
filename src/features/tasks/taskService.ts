import api from '../../services/api';
import type { TaskFormData, Task } from './schemas';

export const fetchTasks = async () => {
  const { data } = await api.get<Task[]>('/tasks');
  return data;
};

export const createTask = async (data: TaskFormData) => {
  const response = await api.post<Task>('/tasks', data);
  return response.data;
};

export const updateTask = async (id: string, data: TaskFormData) => {
  const response = await api.put<Task>(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
