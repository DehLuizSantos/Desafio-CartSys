import z from 'zod';

export const UsuariosInitialValues = {
  id: null,
  nome: '',
  adm: false,
  email: '',
  senha: '',
};

export const clienteVinculadoSchema = z.object({
  id: z.nullable(z.number()),
  idcliente: z.nullable(z.number()),
  idusuario: z.nullable(z.number()),
});

export const usuarioSchema = z.object({
  adm: z.boolean(),
  id: z.nullable(z.number()),
  nome: z.string().min(4, { message: 'O nome deve ter no mínimo 4 caractéres' }).max(50),
  email: z.string().email('Email Invalido'),
  senha: z.nullable(z.string().min(4, { message: 'A senha deve ter no mínimo 4 caractéres' })),
});

export type UsuarioType = z.infer<typeof usuarioSchema>;
