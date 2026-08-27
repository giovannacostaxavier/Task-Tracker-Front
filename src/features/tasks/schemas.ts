import { z } from 'zod';

export const taskSchema = z.object({
  titulo: z.string().min(1, 'O título é obrigatório'),
  descricao: z.string().min(1, 'A descrição é obrigatória'),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export type Task = {
  id: string;
  titulo: string;
  descricao: string;
  status: string;
  user_id: number;
};
