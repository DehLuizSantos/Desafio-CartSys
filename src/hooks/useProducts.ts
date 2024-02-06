import { useStore } from 'zustand';
import { useproductStore } from '../store/Products';
import { ProductType } from '../interfaces/product.interface';

export const useProduct = () => {
  const { addProduct, deleteProduct, editProduct, product } = useStore(useproductStore);
  const handleGetProducts = async () => {
    return product;
  };

  const handlePostProduct = async (product: ProductType) => {
    const uuid = Math.floor(Math.random() * 1001); // Gera um número inteiro entre 0 e 1000

    const body = {
      ...product,
      id: uuid,
    };

    addProduct(body);
    return product;
  };
  const handlePutProduct = async (id: number | null, product: ProductType) => {
    editProduct(id, product);
    return product;
  };
  const handleDeleteProduct = async (id: number | null) => {
    deleteProduct(id);
    return product;
  };

  const handleSearchProduct = async (searchParam: string) => {
    const searchUpper = searchParam.toLowerCase();
    const productFiltered = product.filter((item) =>
      item.descricao.toLowerCase().includes(searchUpper)
    );
    return productFiltered;
  };

  return {
    handleGetProducts,
    handlePostProduct,
    handlePutProduct,
    handleDeleteProduct,
    handleSearchProduct,
  };
};
