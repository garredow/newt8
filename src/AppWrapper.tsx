import React from 'react';
import App from './App';
import { AppSettingsProvider } from './contexts/AppSettingsProvider';
import { PagesProvider } from './contexts/PagesProvider';
import { ComponentBase } from './models/ComponentBase';

function AppWrapper(props: ComponentBase) {
  return (
    <AppSettingsProvider>
      <PagesProvider>
        <App />
      </PagesProvider>
    </AppSettingsProvider>
  );
}

export default AppWrapper;
