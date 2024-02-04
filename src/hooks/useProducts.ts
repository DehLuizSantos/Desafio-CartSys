import { useStore } from 'zustand';
import { useproductStore } from '../store/Products';
import { ProductType } from '../interfaces/product.interface';

export const useProduct = () => {
  const { addProduct, deleteProduct, editProduct, product } = useStore(useproductStore);
  const handleGetProducts = async () => {
    return product;
  };

  const handlePostProduct = async (user: ProductType) => {
    const body = {
      ...user,
      id: product.length + 1,
    };

    addProduct(body);
    return product;
  };
  const handlePutProduct = async (id: number | null, user: ProductType) => {
    editProduct(id, user);
    return product;
  };
  const handleDeleteProduct = async (id: number | null) => {
    deleteProduct(id);
    return product;
  };

  return { handleGetProducts, handlePostProduct, handlePutProduct, handleDeleteProduct };
};
