import { z } from 'zod';

export const taskSchema = z.object({
  titulo: z.string().min(1, 'O título é obrigatório'),
  descricao: z.string().min(1, 'A descrição é obrigatória'),
});

export type TaskFormData = z.infer<typeof taskSchema>; // Usamos z.infer para tipar dados que precisam de validacao

export type Task = { // usamos type para tipar dados que nao precisam de validacao ou vem de um lugar que vc confia como do back por exemplo
  id: string;
  titulo: string;
  descricao: string;
  status: string;
  user_id: number;
};
