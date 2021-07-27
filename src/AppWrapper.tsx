import React from 'react';
import App from './App';
import { AppSettingsProvider } from './contexts/AppSettingsProvider';
import { PagesProvider } from './contexts/PagesProvider';
import { ComponentBaseProps } from './models/ComponentBaseProps';

function AppWrapper(props: ComponentBaseProps) {
  return (
    <AppSettingsProvider>
      <PagesProvider>
        <App />
      </PagesProvider>
    </AppSettingsProvider>
  );
}

export default AppWrapper;
