import store from 'store2';
import { UsuarioType } from '../pages/Usuario/interface';

export const useUser = () => {
  const users = [
    {
      admin: false,
      email: 'exemplo@exemplo.com',
      id: 1,
      nome: 'exemplo',
    },
  ];
  const handleGetUsers = async () => {
    return users;
  };

  const handlePostUser = async (user: UsuarioType) => {
    return users;
  };
  const handlePutUser = async (user: UsuarioType) => {
    return users;
  };
  const handleDelete = async (id: string) => {
    return users;
  };

  return { handleGetUsers, handlePostUser, handlePutUser, handleDelete };
};
