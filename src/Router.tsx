import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Clientes } from './pages/Clientes';
import { LoginPage } from './pages/Login';
import { NewPainelShell } from './components/modules/AppShell';
import { Produtos } from './pages/Produtos';
import { AssistentePedidos } from './pages/AssistentePedido';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/clientes',
    element: (
      <NewPainelShell>
        <Clientes />
      </NewPainelShell>
    ),
  },
  {
    path: '/produtos',
    element: (
      <NewPainelShell>
        <Produtos />
      </NewPainelShell>
    ),
  },
  {
    path: '/pedidos',
    element: (
      <NewPainelShell>
        <AssistentePedidos />
      </NewPainelShell>
    ),
  },
]);

export function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
