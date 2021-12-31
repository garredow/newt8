import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
// import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import App from './App';
import { AppSettingsProvider } from './contexts/AppSettingsProvider';
import { PagesProvider } from './contexts/PagesProvider';
import { ComponentBaseProps } from './models/ComponentBaseProps';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
    },
  },
});

// const localStoragePersistor = createWebStoragePersistor({
//   storage: window.localStorage,
// });
// persistQueryClient({
//   queryClient,
//   persistor: localStoragePersistor,
// });

function AppWrapper(props: ComponentBaseProps) {
  return (
    <AppSettingsProvider>
      <PagesProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </PagesProvider>
    </AppSettingsProvider>
  );
}

export default AppWrapper;
