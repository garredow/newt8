import React from 'react';
import { Settings } from './models/Settings';

type SettingsContextValue = {
  settings: Settings;
  setSettings: (settings: Settings) => Promise<void>;
};

export const defaultSettings = {
  showSettingHelpText: false, // Display help text along with (under?) each settings item
};

const defaultValue = {
  settings: defaultSettings,
  setSettings: () => Promise.resolve(),
};

export const SettingsContext = React.createContext<SettingsContextValue>(
  defaultValue
);
