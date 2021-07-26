import React, { useEffect, useState } from 'react';
import { ComponentBase } from '../models/ComponentBase';
import { Settings } from '../models/Settings';
import { getItem, setItem, StorageKey } from '../utilities/storage';
import { defaultSettings, AppSettingsContext } from './AppSettingsContext';

type AppSettingsProviderProps = ComponentBase;

export function AppSettingsProvider(props: AppSettingsProviderProps) {
  const [settings, setSettingsInternal] = useState<Settings>(defaultSettings);

  useEffect(() => {
    getItem<Settings>(StorageKey.Settings).then((res) => {
      setSettingsInternal({ ...defaultSettings, ...res });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setSettings(val: Settings) {
    setSettingsInternal(val);
    await setItem<Settings>(StorageKey.Settings, val);
  }

  return (
    <AppSettingsContext.Provider
      value={{
        settings,
        setSettings,
      }}
    >
      {props.children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const context = React.useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error('useAppSettings must be used within a AppSettingsProvider');
  }
  return context;
}
