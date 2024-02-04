import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Usuarios } from './pages/Usuario';
import { LoginPage } from './pages/Login';
import { NewPainelShell } from './components/modules/AppShell';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/usuarios',
    element: (
      <NewPainelShell>
        <Usuarios />
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
