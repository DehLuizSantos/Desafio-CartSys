import { z } from 'zod';

export const addressesSchema = z.object({
  localidade: z.string().min(1, { message: 'Obrigatório' }),
  complemento: z.nullable(z.string()),
  name: z.string(),
  bairro: z
    .string({ invalid_type_error: 'Obrigatório', required_error: 'Obrigatório' })
    .min(1, { message: 'Obrigatório' }),
  numero: z.nullable(z.string().min(1, { message: 'Obrigatório' })),
  uf: z.string().min(1, { message: 'Obrigatório' }),
  logradouro: z.string().min(1, { message: 'Obrigatório' }),
  zipCode: z.string(),
});

export type Endereco = z.infer<typeof addressesSchema>;

export const addressesInitialValue: Endereco = {
  name: '',
  logradouro: '',
  numero: '',
  bairro: '',
  localidade: '',
  uf: '',
  zipCode: '',
  complemento: '',
};
