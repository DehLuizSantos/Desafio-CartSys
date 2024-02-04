import z from 'zod';

export const ProductInitialvalues = {
  ativo: false,
  id: null,
  descricao: '',
  estoque: 1,
  preco: 0,
};

export const productSchema = z.object({
  ativo: z.boolean(),
  id: z.nullable(z.number()),
  estoque: z.nullable(z.number()),
  preco: z.nullable(z.number()),
  descricao: z.string(),
});

export type ProductType = z.infer<typeof productSchema>;
