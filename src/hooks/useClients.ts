import { useStore } from 'zustand';
import { useclientsStore } from '../store/Clientes';
import { ClientType } from '../interfaces/client.interface';

export const useClient = () => {
  const { addclient, clients, deleteclient, editclient } = useStore(useclientsStore);
  const handleGetUsers = async () => {
    return clients;
  };

  const handlePostUser = async (user: ClientType) => {
    const body = {
      ...user,
      id: clients.length + 1,
    };

    addclient(body);
    return clients;
  };
  const handlePutUser = async (id: number | null, user: ClientType) => {
    editclient(id, user);
    return clients;
  };
  const handleDelete = async (id: number | null) => {
    deleteclient(id);
    return clients;
  };

  return { handleGetUsers, handlePostUser, handlePutUser, handleDelete };
};