import { string } from 'prop-types';
import z from 'zod';
import { productSchema } from './product.interface';
import { addressesSchema } from './endereco.interface';

export const ClientInitialvalues = {
  cliente: '',
  produtos: [],
  paymentMethod: '',
  endereco: null,
};

export const userSchema = z.object({
  cliente: z.string(),
  id: z.nullable(z.number()),
  paymentMethod: z.string(),
  produtos: z.array(productSchema),
  endereco: z.nullable(addressesSchema),
});

export type PedidoType = z.infer<typeof userSchema>;
