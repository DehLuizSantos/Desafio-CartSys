import { useStore } from 'zustand';
import { useclientsStore } from '../store/Clientes';
import { ClientType } from '../interfaces/client.interface';

export const useClient = () => {
  const { addclient, clients, deleteclient, editclient } = useStore(useclientsStore);
  const handleGetClients = async () => {
    return clients;
  };

  const handlePostClient = async (client: ClientType) => {
    const uuid = Math.floor(Math.random() * 1001); // Gera um número inteiro entre 0 e 1000

    const body = {
      ...client,
      id: uuid,
    };

    addclient(body);
    return clients;
  };
  const handlePutClient = async (id: number | null, client: ClientType) => {
    editclient(id, client);
    return clients;
  };
  const handleDelete = async (id: number | null) => {
    deleteclient(id);
    return clients;
  };

  return { handleGetClients, handlePostClient, handlePutClient, handleDelete };
};
