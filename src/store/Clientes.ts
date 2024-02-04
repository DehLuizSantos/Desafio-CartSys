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
    email: 'exemplo@exemplo.com',
    id: 0,
    nome: 'exemplo',
    cpf: '08160936958',
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
