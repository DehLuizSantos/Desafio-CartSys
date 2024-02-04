import z from 'zod';

export const LoginInitialValues = {
  login: '',
  senha: '',
};

export const ClientInitialvalues = {
  email: '',
  id: null,
  nome: '',
  cpf: null,
  cnpj: null,
};

export const loginSchema = z.object({
  login: z
    .string()
    .min(4, { message: 'Usuario deve ter no mínimo 4 caractéres' })
    .email('E-mail inválido'),
  senha: z.string().min(4, { message: 'Senha deve ter no mínimo 4 caractéres' }).max(50),
});

export const userSchema = z.object({
  email: z.string(),
  id: z.nullable(z.number()),
  nome: z.string(),
  cpf: z.nullable(z.string()),
  cnpj: z.nullable(z.string()),
});

export type ClientType = z.infer<typeof userSchema>;
export type LoginType = z.infer<typeof loginSchema>;
