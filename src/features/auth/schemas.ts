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
/*z.infer é uma funcionalidade do ZOD que gera automaticamente um tipo TypeScript, ou seja ele sabe que tipo é aquele dado e ja tipa automaticamente sem voce precisar fazer isso */
export type CadastroFormData = z.infer<typeof cadastroSchema>;
