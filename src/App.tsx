import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';
import { Router } from './Router';
import ThemeWrapper from './styles/theme/themeProvider';
import 'dayjs/locale/pt-br';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
export default function App() {
  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <ThemeWrapper>
        <Notifications position="top-right" />
        <Router />
      </ThemeWrapper>
    </PersistQueryClientProvider>
  );
}
