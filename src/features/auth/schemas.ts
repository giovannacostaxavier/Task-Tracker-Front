import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'A senha precisa de pelo menos 6 caracteres'),
});

export const cadastroSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'A senha precisa de pelo menos 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type CadastroFormData = z.infer<typeof cadastroSchema>;
