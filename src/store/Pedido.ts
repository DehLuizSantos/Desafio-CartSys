import { create } from 'zustand';
import { PedidoType } from '../interfaces/pedido.interface';
import { ProductType } from '../interfaces/product.interface';
import { Endereco } from '../interfaces/endereco.interface';

interface PedidoStoreType {
  pedido: PedidoType;
  addClient: (client: string) => void;
  addProducts: (products: ProductType[]) => void;
  addPaymentMethod: (paymentMethod: string) => void;
  addAdresses: (addresses: Endereco) => void;
}

const pedido: PedidoType = {
  cliente: '',
  produtos: [],
  id: null,
  paymentMethod: '',
  endereco: null,
};

export const usePedidosStore = create<PedidoStoreType>()((set) => ({
  pedido: pedido,
  addClient: (e) => set((state) => ({ ...state, pedido: { ...state.pedido, cliente: e } })),
  addProducts: (e) => set((state) => ({ ...state, pedido: { ...state.pedido, produtos: e } })),
  addAdresses: (e) => set((state) => ({ ...state, pedido: { ...state.pedido, endereco: e } })),
  addPaymentMethod: (e) =>
    set((state) => ({ ...state, pedido: { ...state.pedido, paymentMethod: e } })),
}));
