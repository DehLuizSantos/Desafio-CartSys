import { create } from 'zustand';
import { ProductType } from '../interfaces/product.interface';

interface producttoreType {
  product: ProductType[];
  addProduct: (product: ProductType) => void;
  editProduct: (productId: number | null, updatedproduct: ProductType) => void;
  deleteProduct: (productId: number | null) => void;
}

const products: ProductType[] = [
  {
    ativo: true,
    id: 1,
    descricao: 'Caixa de ferramentas Bosh',
    estoque: 10,
    preco: 50.0,
  },
  {
    ativo: true,
    id: 2,
    descricao: 'Papel de parede cinza escuro',
    estoque: 15,
    preco: 150.0,
  },
];

export const useproductStore = create<producttoreType>()((set) => ({
  product: products,
  addProduct: (product) => set((state) => ({ product: [...state.product, product] })),
  editProduct: (productId, updatedproduct) =>
    set((state) => ({
      product: state.product.map((product) =>
        product.id === productId ? { ...product, ...updatedproduct } : product
      ),
    })),
  deleteProduct: (productId) =>
    set((state) => ({ product: state.product.filter((product) => product.id !== productId) })),
}));
