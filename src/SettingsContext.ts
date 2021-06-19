import React from 'react';
import { Settings } from './models/Settings';
import { Theme } from './models/Theme';

type SettingsContextValue = {
  settings: Settings;
  setSettings: (settings: Settings) => Promise<void>;
};

const defaultThemes: Theme[] = [
  {
    id: 'dark',
    name: 'Dark',
    base: [
      { id: 'app-bg-color', name: 'app-bg-color', value: '#0c1920' },
      { id: 'app-accent-color', name: 'app-accent-color', value: '#ffa500' },
      {
        id: 'primary-text-color',
        name: 'primary-text-color',
        value: '#ffffff',
      },
      {
        id: 'secondary-text-color',
        name: 'secondary-text-color',
        value: '#cccccc',
      },
      {
        id: 'warning-text-color',
        name: 'warning-text-color',
        value: '#f5f749',
      },
      { id: 'error-text-color', name: 'error-text-color', value: '#f24236' },
      {
        id: 'primary-button-bg-color',
        name: 'primary-button-bg-color',
        value: '#ffa500',
      },
      {
        id: 'primary-button-text-color',
        name: 'primary-button-text-color',
        value: '#ffffff',
      },
      {
        id: 'secondary-button-bg-color',
        name: 'secondary-button-bg-color',
        value: '#1c3a4a',
      },
      {
        id: 'secondary-button-text-color',
        name: 'secondary-button-text-color',
        value: '#ffffff',
      },
      {
        id: 'warning-button-bg-color',
        name: 'warning-button-bg-color',
        value: '#f5f749',
      },
      {
        id: 'warning-button-text-color',
        name: 'warning-button-text-color',
        value: '#cccccc',
      },
      {
        id: 'danger-button-bg-color',
        name: 'danger-button-bg-color',
        value: '#f24236',
      },
      {
        id: 'danger-button-text-color',
        name: 'danger-button-text-color',
        value: '#ffffff',
      },
    ],
    panel: [
      { id: 'panel-bg-color', name: 'panel-bg-color', value: '#0c1920' },
      {
        id: 'panel-accent-color',
        name: 'panel-accent-color',
        value: '#ffa500',
      },
      {
        id: 'panel-divider-color',
        name: 'panel-divider-color',
        value: '#cccccc',
      },
      {
        id: 'panel-title-text-color',
        name: 'panel-title-text-color',
        value: '#ffffff',
      },
      {
        id: 'panel-primary-text-color',
        name: 'panel-primary-text-color',
        value: '#ffffff',
      },
      {
        id: 'panel-secondary-text-color',
        name: 'panel-secondary-text-color',
        value: '#cccccc',
      },
      {
        id: 'panel-primary-button-text-color',
        name: 'panel-primary-button-text-color',
        value: '#ffffff',
      },
      {
        id: 'panel-secondary-button-bg-color',
        name: 'panel-secondary-button-bg-color',
        value: '#1c3a4a',
      },
      {
        id: 'panel-secondary-button-text-color',
        name: 'panel-secondary-button-text-color',
        value: '#ffffff',
      },
      {
        id: 'panel-warning-button-bg-color',
        name: 'panel-warning-button-bg-color',
        value: '#f5f749',
      },
      {
        id: 'panel-warning-button-text-color',
        name: 'panel-warning-button-text-color',
        value: '#cccccc',
      },
      {
        id: 'panel-danger-button-bg-color',
        name: 'panel-danger-button-bg-color',
        value: '#f24236',
      },
      {
        id: 'panel-danger-button-text-color',
        name: 'panel-danger-button-text-color',
        value: '#ffffff',
      },
    ],
    card: [
      { id: 'card-bg-color', name: 'card-bg-color', value: '#12252f' },
      {
        id: 'card-accent-color',
        name: 'card-accent-color',
        value: '#ffa500',
      },
      {
        id: 'card-divider-color',
        name: 'card-divider-color',
        value: '#cccccc',
      },
      {
        id: 'card-title-text-color',
        name: 'card-title-text-color',
        value: '#ffffff',
      },
      {
        id: 'card-primary-text-color',
        name: 'card-primary-text-color',
        value: '#ffffff',
      },
      {
        id: 'card-secondary-text-color',
        name: 'card-secondary-text-color',
        value: '#cccccc',
      },
      {
        id: 'card-primary-button-text-color',
        name: 'card-primary-button-text-color',
        value: '#ffffff',
      },
      {
        id: 'card-secondary-button-bg-color',
        name: 'card-secondary-button-bg-color',
        value: '#1c3a4a',
      },
      {
        id: 'card-secondary-button-text-color',
        name: 'card-secondary-button-text-color',
        value: '#ffffff',
      },
      {
        id: 'card-warning-button-bg-color',
        name: 'card-warning-button-bg-color',
        value: '#f5f749',
      },
      {
        id: 'card-warning-button-text-color',
        name: 'card-warning-button-text-color',
        value: '#cccccc',
      },
      {
        id: 'card-danger-button-bg-color',
        name: 'card-danger-button-bg-color',
        value: '#f24236',
      },
      {
        id: 'card-danger-button-text-color',
        name: 'card-danger-button-text-color',
        value: '#ffffff',
      },
    ],
  },
  {
    id: 'light',
    name: 'Light',
    base: [
      { id: 'app-bg-color', name: 'app-bg-color', value: '#efefef' },
      { id: 'app-accent-color', name: 'app-accent-color', value: '#ffa500' },
      {
        id: 'primary-text-color',
        name: 'primary-text-color',
        value: '#ffffff',
      },
      {
        id: 'secondary-text-color',
        name: 'secondary-text-color',
        value: '#cccccc',
      },
      {
        id: 'warning-text-color',
        name: 'warning-text-color',
        value: '#f5f749',
      },
      { id: 'error-text-color', name: 'error-text-color', value: '#f24236' },
      {
        id: 'primary-button-bg-color',
        name: 'primary-button-bg-color',
        value: '#ffa500',
      },
      {
        id: 'primary-button-text-color',
        name: 'primary-button-text-color',
        value: '#ffffff',
      },
      {
        id: 'secondary-button-bg-color',
        name: 'secondary-button-bg-color',
        value: '#1c3a4a',
      },
      {
        id: 'secondary-button-text-color',
        name: 'secondary-button-text-color',
        value: '#ffffff',
      },
      {
        id: 'warning-button-bg-color',
        name: 'warning-button-bg-color',
        value: '#f5f749',
      },
      {
        id: 'warning-button-text-color',
        name: 'warning-button-text-color',
        value: '#cccccc',
      },
      {
        id: 'danger-button-bg-color',
        name: 'danger-button-bg-color',
        value: '#f24236',
      },
      {
        id: 'danger-button-text-color',
        name: 'danger-button-text-color',
        value: '#ffffff',
      },
    ],
    panel: [
      { id: 'panel-bg-color', name: 'panel-bg-color', value: '#0c1920' },
      {
        id: 'panel-accent-color',
        name: 'panel-accent-color',
        value: '#ffa500',
      },
      {
        id: 'panel-divider-color',
        name: 'panel-divider-color',
        value: '#cccccc',
      },
      {
        id: 'panel-title-text-color',
        name: 'panel-title-text-color',
        value: '#ffffff',
      },
      {
        id: 'panel-primary-text-color',
        name: 'panel-primary-text-color',
        value: '#ffffff',
      },
      {
        id: 'panel-secondary-text-color',
        name: 'panel-secondary-text-color',
        value: '#cccccc',
      },
      {
        id: 'panel-primary-button-text-color',
        name: 'panel-primary-button-text-color',
        value: '#ffffff',
      },
      {
        id: 'panel-secondary-button-bg-color',
        name: 'panel-secondary-button-bg-color',
        value: '#1c3a4a',
      },
      {
        id: 'panel-secondary-button-text-color',
        name: 'panel-secondary-button-text-color',
        value: '#ffffff',
      },
      {
        id: 'panel-warning-button-bg-color',
        name: 'panel-warning-button-bg-color',
        value: '#f5f749',
      },
      {
        id: 'panel-warning-button-text-color',
        name: 'panel-warning-button-text-color',
        value: '#cccccc',
      },
      {
        id: 'panel-danger-button-bg-color',
        name: 'panel-danger-button-bg-color',
        value: '#f24236',
      },
      {
        id: 'panel-danger-button-text-color',
        name: 'panel-danger-button-text-color',
        value: '#ffffff',
      },
    ],
    card: [
      { id: 'card-bg-color', name: 'card-bg-color', value: '#12252f' },
      {
        id: 'card-accent-color',
        name: 'card-accent-color',
        value: '#ffa500',
      },
      {
        id: 'card-divider-color',
        name: 'card-divider-color',
        value: '#cccccc',
      },
      {
        id: 'card-title-text-color',
        name: 'card-title-text-color',
        value: '#ffffff',
      },
      {
        id: 'card-primary-text-color',
        name: 'card-primary-text-color',
        value: '#ffffff',
      },
      {
        id: 'card-secondary-text-color',
        name: 'card-secondary-text-color',
        value: '#cccccc',
      },
      {
        id: 'card-primary-button-text-color',
        name: 'card-primary-button-text-color',
        value: '#ffffff',
      },
      {
        id: 'card-secondary-button-bg-color',
        name: 'card-secondary-button-bg-color',
        value: '#1c3a4a',
      },
      {
        id: 'card-secondary-button-text-color',
        name: 'card-secondary-button-text-color',
        value: '#ffffff',
      },
      {
        id: 'card-warning-button-bg-color',
        name: 'card-warning-button-bg-color',
        value: '#f5f749',
      },
      {
        id: 'card-warning-button-text-color',
        name: 'card-warning-button-text-color',
        value: '#cccccc',
      },
      {
        id: 'card-danger-button-bg-color',
        name: 'card-danger-button-bg-color',
        value: '#f24236',
      },
      {
        id: 'card-danger-button-text-color',
        name: 'card-danger-button-text-color',
        value: '#ffffff',
      },
    ],
  },
];

export const defaultSettings = {
  themes: defaultThemes,
  activeTheme: 'dark',
  showSettingHelpText: false, // Display help text along with (under?) each settings item
};

const defaultValue = {
  settings: defaultSettings,
  setSettings: () => Promise.resolve(),
};

export const SettingsContext =
  React.createContext<SettingsContextValue>(defaultValue);
