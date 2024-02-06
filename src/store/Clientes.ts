import { create } from 'zustand';
import { ClientType } from '../interfaces/client.interface';

interface clientStoreType {
  clients: ClientType[];
  addclient: (client: ClientType) => void;
  editclient: (clientId: number | null, updatedclient: ClientType) => void;
  deleteclient: (clientId: number | null) => void;
}

const clients: ClientType[] = [
  {
    email: 'andré@carsys.com',
    id: 1,
    nome: 'André',
    cpf: '08160936958',
    cnpj: null,
  },
  {
    email: 'yan@carsys.com',
    id: 2,
    nome: 'Yan Oliveira',
    cpf: '123456789-58',
    cnpj: null,
  },
];

export const useclientsStore = create<clientStoreType>()((set) => ({
  clients: clients,
  addclient: (client) => set((state) => ({ clients: [...state.clients, client] })),
  editclient: (clientId, updatedclient) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId ? { ...client, ...updatedclient } : client
      ),
    })),
  deleteclient: (clientId) =>
    set((state) => ({ clients: state.clients.filter((client) => client.id !== clientId) })),
}));
