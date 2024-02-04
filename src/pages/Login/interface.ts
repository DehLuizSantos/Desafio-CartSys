import z from 'zod';

export const LoginInitialValues = {
  login: '',
  senha: '',
};

export const loginSchema = z.object({
  login: z
    .string()
    .min(4, { message: 'Usuario deve ter no mínimo 4 caractéres' })
    .email('E-mail inválido'),
  senha: z.string().min(4, { message: 'Senha deve ter no mínimo 4 caractéres' }).max(50),
});

export const clientSchema = z.object({
  id: z.number(),
  idusuario: z.number(),
  idcliente: z.number(),
  nome: z.string(),
});

export const userSchema = z.object({
  adm: z.boolean(),
  clientes: z.array(clientSchema),
  email: z.string(),
  id: z.number(),
  nome: z.string(),
  senha: z.string(),
});
export const filtersDateSchema = z.object({
  d1: z.string().or(z.date()),
  d2: z.string().or(z.date()),
  idcliente: z.number(),
});

export type UserType = z.infer<typeof userSchema>;
export const changePasswordSchema = z.object({
  senha: z.string().min(4, { message: 'Senha deve ter no mínimo 4 caractéres' }).max(50),
  id: z.number(),
  nome: z.string(),
  email: z.string(),
});

export type LoginType = z.infer<typeof loginSchema>;

export type ChangePassWordType = z.infer<typeof changePasswordSchema>;
export type FilterDateType = z.infer<typeof filtersDateSchema>;
