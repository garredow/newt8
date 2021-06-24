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
    values: {
        appBgColor: {name: 'app-bg-color', variable: 'app-bg-color', value: '#121517'},
        appAccentColor: {name: 'app-accent-color', variable: 'app-accent-color', value: '#6A8D92'},
        dividerColor: {name: 'divider-color', variable: 'panel-divider-color', value: 'rgba(255,255,255,.2'},
        primaryTextColor: {name: 'primary-text-color', variable: 'primary-text-color', value: 'rgba(255, 255, 255, 0.84)'},
        secondaryTextColor: {name: 'secondary-text-color', variable: 'secondary-text-color', value: 'rgba(255, 255, 255, 0.6)'},
        warningTextColor: {name: 'warning-text-color', variable: 'warning-text-color', value: '#EAB948'},
        errorTextColor: {name: 'error-text-color', variable: 'error-text-color', value: '#A52422'},
        primaryButtonBgColor: {name: 'primary-button-bg-color', variable: 'primary-button-bg-color', value: '#6A8D92'},
        primaryButtonTextColor: {name: 'primary-button-text-color', variable: 'primary-button-text-color', value: 'rgba(255, 255, 255, 0.84)'},
        secondaryButtonBgColor: {name: 'secondary-button-bg-color', variable: 'secondary-button-bg-color', value: '#222E2F'},
        secondaryButtonTextColor: {name: 'secondary-button-text-color', variable: 'secondary-button-text-color', value: 'rgba(255, 255, 255, 0.84)'},
        warningButtonBgColor: {name: 'warning-button-bg-color', variable: 'warning-button-bg-color', value: '#EAC948'},
        warningButtonTextColor: {name: 'warning-button-text-color', variable: 'warning-button-text-color', value: 'rgba(0, 0, 0, 0.88)'},
        dangerButtonBgColor: {name: 'danger-button-bg-color', variable: 'danger-button-bg-color', value: '#A52422'},
        dangerButtonTextColor: {name: 'danger-button-text-color', variable: 'danger-button-text-color', value: 'rgba(255, 255, 255, 0.84)'},

        panelBgColor: {name: 'panel-bg-color', variable: 'panel-bg-color', value: '#121517'},
        panelAccentColor: {name: 'panel-accent-color', variable: 'panel-accent-color', value: '#6A8D92'},
        panelDividerColor: {name: 'panel-divider-color', variable: 'panel-divider-color', value: 'rgba(255,255,255,.2'},
        panelTitleTextColor: {name: 'panel-title-text-color', variable: 'panel-title-text-color', value: 'rgba(255, 255, 255, 0.84)'},
        panelPrimaryTextColor: {name: 'panel-primary-text-color', variable: 'panel-primary-text-color', value: 'rgba(255, 255, 255, 0.84)'},
        panelSecondaryTextColor: {name: 'panel-secondary-text-color', variable: 'panel-secondary-text-color', value: 'rgba(255, 255, 255, 0.6)'},
        panelPrimaryButtonBgColor: {name: 'panel-primary-button-bg-color', variable: 'panel-primary-button-bg-color', value: '#6A8D92'},
        panelPrimaryButtonTextColor: {name: 'panel-primary-button-text-color', variable: 'panel-primary-button-text-color', value: 'rgba(255, 255, 255, 0.84)'},
        panelSecondaryButtonBgColor: {name: 'panel-secondary-button-bg-color', variable: 'panel-secondary-button-bg-color', value: '#222E2F'},
        panelSecondaryButtonTextColor: {name: 'panel-secondary-button-text-color', variable: 'panel-secondary-button-text-color', value: 'rgba(255, 255, 255, 0.84)'},
        panelWarningButtonBgColor: {name: 'panel-warning-button-bg-color', variable: 'panel-warning-button-bg-color', value: '#EAC948'},
        panelWarningButtonTextColor: {name: 'panel-warning-button-text-color', variable: 'panel-warning-button-text-color', value: 'rgba(0, 0, 0, 0.88)'},
        panelDangerButtonBgColor: {name: 'panel-danger-button-bg-color', variable: 'panel-danger-button-bg-color', value: '#A52422'},
        panelDangerButtonTextColor: {name: 'panel-danger-button-text-color', variable: 'panel-danger-button-text-color', value: 'rgba(255, 255, 255, 0.84)'},

        cardBgColor: {name: 'card-bg-color', variable: 'card-bg-color', value: '#1B1F22'},
        cardAccentColor: {name: 'card-accent-color', variable: 'card-accent-color', value: '#6A8D92'},
        cardDividerColor: {name: 'card-divider-color', variable: 'card-divider-color', value: 'rgba(255,255,255,.2'},
        cardTitleTextColor: {name: 'card-title-text-color', variable: 'card-title-text-color', value: 'rgba(255, 255, 255, 0.84)'},
        cardPrimaryTextColor: {name: 'card-primary-text-color', variable: 'card-primary-text-color', value: 'rgba(255, 255, 255, 0.84)'},
        cardSecondaryTextColor: {name: 'card-secondary-text-color', variable: 'card-secondary-text-color', value: 'rgba(255, 255, 255, 0.6)'},
        cardPrimaryButtonBgColor: {name: 'card-primary-button-bg-color', variable: 'card-primary-button-bg-color', value: '#6A8D92'},
        cardPrimaryButtonTextColor: {name: 'card-primary-button-text-color', variable: 'card-primary-button-text-color', value: 'rgba(255, 255, 255, 0.84)'},
        cardSecondaryButtonBgColor: {name: 'card-secondary-button-bg-color', variable: 'card-secondary-button-bg-color', value: '#222E2F'},
        cardSecondaryButtonTextColor: {name: 'card-secondary-button-text-color', variable: 'card-secondary-button-text-color', value: 'rgba(255, 255, 255, 0.84)'},
        cardWarningButtonBgColor: {name: 'card-warning-button-bg-color', variable: 'card-warning-button-bg-color', value: '#EAC948'},
        cardWarningButtonTextColor: {name: 'card-warning-button-text-color', variable: 'card-warning-button-text-color', value: 'rgba(0, 0, 0, 0.88)'},
        cardDangerButtonBgColor: {name: 'card-danger-button-bg-color', variable: 'card-danger-button-bg-color', value: '#A52422'},
        cardDangerButtonTextColor: {name: 'card-danger-button-text-color', variable: 'card-danger-button-text-color', value: 'rgba(255, 255, 255, 0.84)'},
    }
},
  {
    id: 'light',
    name: 'Light',
    values: {
      appBgColor: {name: 'app-bg-color', variable: 'app-bg-color', value: '#f4f5f5'},
      appAccentColor: {name: 'app-accent-color', variable: 'app-accent-color', value: '#75abbc'},
      dividerColor: {name: 'divider-color', variable: 'panel-divider-color', value: 'rgba(0,0,0, 0.2)'},
      primaryTextColor: {name: 'primary-text-color', variable: 'primary-text-color', value: 'rgba(0,0,0, 0.88)'},
      secondaryTextColor: {name: 'secondary-text-color', variable: 'secondary-text-color', value: 'rgba(0,0,0, 0.5)'},
      warningTextColor: {name: 'warning-text-color', variable: 'warning-text-color', value: '#f6f862'},
      errorTextColor: {name: 'error-text-color', variable: 'error-text-color', value: '#f45d52'},
      primaryButtonBgColor: {name: 'primary-button-bg-color', variable: 'primary-button-bg-color', value: '#75abbc'},
      primaryButtonTextColor: {name: 'primary-button-text-color', variable: 'primary-button-text-color', value: 'rgba(0,0,0, 0.88)'},
      secondaryButtonBgColor: {name: 'secondary-button-bg-color', variable: 'secondary-button-bg-color', value: '#d0d6dd'},
      secondaryButtonTextColor: {name: 'secondary-button-text-color', variable: 'secondary-button-text-color', value: 'rgba(0,0,0, 0.88)'},
      warningButtonBgColor: {name: 'warning-button-bg-color', variable: 'warning-button-bg-color', value: '#f6f862'},
      warningButtonTextColor: {name: 'warning-button-text-color', variable: 'warning-button-text-color', value: 'rgba(0, 0, 0, 0.88)'},
      dangerButtonBgColor: {name: 'danger-button-bg-color', variable: 'danger-button-bg-color', value: '#f45d52'},
      dangerButtonTextColor: {name: 'danger-button-text-color', variable: 'danger-button-text-color', value: 'rgba(0,0,0, 0.88)'},
  
      panelBgColor: {name: 'panel-bg-color', variable: 'panel-bg-color', value: '#f4f5f5'},
      panelAccentColor: {name: 'panel-accent-color', variable: 'panel-accent-color', value: '#75abbc'},
      panelDividerColor: {name: 'panel-divider-color', variable: 'panel-divider-color', value: 'rgba(0,0,0, 0.2)'},
      panelTitleTextColor: {name: 'panel-title-text-color', variable: 'panel-title-text-color', value: 'rgba(0,0,0, 0.88)'},
      panelPrimaryTextColor: {name: 'panel-primary-text-color', variable: 'panel-primary-text-color', value: 'rgba(0,0,0, 0.88)'},
      panelSecondaryTextColor: {name: 'panel-secondary-text-color', variable: 'panel-secondary-text-color', value: 'rgba(0,0,0, 0.5)'},
      panelPrimaryButtonBgColor: {name: 'panel-primary-button-bg-color', variable: 'panel-primary-button-bg-color', value: '#75abbc'},
      panelPrimaryButtonTextColor: {name: 'panel-primary-button-text-color', variable: 'panel-primary-button-text-color', value: 'rgba(0,0,0, 0.88)'},
      panelSecondaryButtonBgColor: {name: 'panel-secondary-button-bg-color', variable: 'panel-secondary-button-bg-color', value: '#d0d6dd'},
      panelSecondaryButtonTextColor: {name: 'panel-secondary-button-text-color', variable: 'panel-secondary-button-text-color', value: 'rgba(0,0,0, 0.88)'},
      panelWarningButtonBgColor: {name: 'panel-warning-button-bg-color', variable: 'panel-warning-button-bg-color', value: '#f6f862'},
      panelWarningButtonTextColor: {name: 'panel-warning-button-text-color', variable: 'panel-warning-button-text-color', value: 'rgba(0, 0, 0, 0.88)'},
      panelDangerButtonBgColor: {name: 'panel-danger-button-bg-color', variable: 'panel-danger-button-bg-color', value: '#f45d52'},
      panelDangerButtonTextColor: {name: 'panel-danger-button-text-color', variable: 'panel-danger-button-text-color', value: 'rgba(0,0,0, 0.88)'},
  
      cardBgColor: {name: 'card-bg-color', variable: 'card-bg-color', value: '#ffffff'},
      cardAccentColor: {name: 'card-accent-color', variable: 'card-accent-color', value: '#75abbc'},
      cardDividerColor: {name: 'card-divider-color', variable: 'card-divider-color', value: 'rgba(0,0,0, 0.1)'},
      cardTitleTextColor: {name: 'card-title-text-color', variable: 'card-title-text-color', value: 'rgba(0,0,0, 0.88)'},
      cardPrimaryTextColor: {name: 'card-primary-text-color', variable: 'card-primary-text-color', value: 'rgba(0,0,0, 0.88)'},
      cardSecondaryTextColor: {name: 'card-secondary-text-color', variable: 'card-secondary-text-color', value: 'rgba(0,0,0, 0.5)'},
      cardPrimaryButtonBgColor: {name: 'card-primary-button-bg-color', variable: 'card-primary-button-bg-color', value: '#75abbc'},
      cardPrimaryButtonTextColor: {name: 'card-primary-button-text-color', variable: 'card-primary-button-text-color', value: 'rgba(0,0,0, 0.88)'},
      cardSecondaryButtonBgColor: {name: 'card-secondary-button-bg-color', variable: 'card-secondary-button-bg-color', value: '#d0d6dd'},
      cardSecondaryButtonTextColor: {name: 'card-secondary-button-text-color', variable: 'card-secondary-button-text-color', value: 'rgba(0,0,0, 0.88)'},
      cardWarningButtonBgColor: {name: 'card-warning-button-bg-color', variable: 'card-warning-button-bg-color', value: '#f6f862'},
      cardWarningButtonTextColor: {name: 'card-warning-button-text-color', variable: 'card-warning-button-text-color', value: 'rgba(0, 0, 0, 0.88)'},
      cardDangerButtonBgColor: {name: 'card-danger-button-bg-color', variable: 'card-danger-button-bg-color', value: '#f45d52'},
      cardDangerButtonTextColor: {name: 'card-danger-button-text-color', variable: 'card-danger-button-text-color', value: 'rgba(0,0,0, 0.88)'},
    }
  },
  {
    id: 'cobalt2',
    name: 'Cobalt2',
    values: {
      appBgColor: {name: 'app-bg-color', variable: 'app-bg-color', value: 'rgb(17,35,46)'},
      appAccentColor: {name: 'app-accent-color', variable: 'app-accent-color', value: '#ffc600'},
      dividerColor: {name: 'divider-color', variable: 'panel-divider-color', value: 'rgba(255, 255, 255, 0.2)'},
      primaryTextColor: {name: 'primary-text-color', variable: 'primary-text-color', value: 'rgba(255, 255, 255, 0.88)'},
      secondaryTextColor: {name: 'secondary-text-color', variable: 'secondary-text-color', value: 'rgba(255, 255, 255, 0.6)'},
      warningTextColor: {name: 'warning-text-color', variable: 'warning-text-color', value: '#f5f749'},
      errorTextColor: {name: 'error-text-color', variable: 'error-text-color', value: '#ff0088'},
      primaryButtonBgColor: {name: 'primary-button-bg-color', variable: 'primary-button-bg-color', value: '#ffc600'},
      primaryButtonTextColor: {name: 'primary-button-text-color', variable: 'primary-button-text-color', value: 'rgba(0,0,0, 0.88)'},
      secondaryButtonBgColor: {name: 'secondary-button-bg-color', variable: 'secondary-button-bg-color', value: '#0d3a58'},
      secondaryButtonTextColor: {name: 'secondary-button-text-color', variable: 'secondary-button-text-color', value: 'rgba(255, 255, 255, 0.88)'},
      warningButtonBgColor: {name: 'warning-button-bg-color', variable: 'warning-button-bg-color', value: '#f5f749'},
      warningButtonTextColor: {name: 'warning-button-text-color', variable: 'warning-button-text-color', value: 'rgba(0,0,0, 0.88)'},
      dangerButtonBgColor: {name: 'danger-button-bg-color', variable: 'danger-button-bg-color', value: '#ff0088'},
      dangerButtonTextColor: {name: 'danger-button-text-color', variable: 'danger-button-text-color', value: 'rgba(255, 255, 255, 0.88)'},
  
      panelBgColor: {name: 'panel-bg-color', variable: 'panel-bg-color', value: 'rgb(17,35,46)'},
      panelAccentColor: {name: 'panel-accent-color', variable: 'panel-accent-color', value: '#ffc600'},
      panelDividerColor: {name: 'panel-divider-color', variable: 'panel-divider-color', value: 'rgba(255, 255, 255, 0.2)'},
      panelTitleTextColor: {name: 'panel-title-text-color', variable: 'panel-title-text-color', value: 'rgba(255, 255, 255, 0.88)'},
      panelPrimaryTextColor: {name: 'panel-primary-text-color', variable: 'panel-primary-text-color', value: 'rgba(255, 255, 255, 0.88)'},
      panelSecondaryTextColor: {name: 'panel-secondary-text-color', variable: 'panel-secondary-text-color', value: 'rgba(255, 255, 255, 0.6)'},
      panelPrimaryButtonBgColor: {name: 'panel-primary-button-bg-color', variable: 'panel-primary-button-bg-color', value: '#ffc600'},
      panelPrimaryButtonTextColor: {name: 'panel-primary-button-text-color', variable: 'panel-primary-button-text-color', value: 'rgba(0,0,0, 0.88)'},
      panelSecondaryButtonBgColor: {name: 'panel-secondary-button-bg-color', variable: 'panel-secondary-button-bg-color', value: '#0d3a58'},
      panelSecondaryButtonTextColor: {name: 'panel-secondary-button-text-color', variable: 'panel-secondary-button-text-color', value: 'rgba(255, 255, 255, 0.88)'},
      panelWarningButtonBgColor: {name: 'panel-warning-button-bg-color', variable: 'panel-warning-button-bg-color', value: '#f5f749'},
      panelWarningButtonTextColor: {name: 'panel-warning-button-text-color', variable: 'panel-warning-button-text-color', value: 'rgba(0,0,0, 0.88)'},
      panelDangerButtonBgColor: {name: 'panel-danger-button-bg-color', variable: 'panel-danger-button-bg-color', value: '#ff0088'},
      panelDangerButtonTextColor: {name: 'panel-danger-button-text-color', variable: 'panel-danger-button-text-color', value: 'rgba(255, 255, 255, 0.88)'},
  
      cardBgColor: {name: 'card-bg-color', variable: 'card-bg-color', value: 'rgb(15,53,75)'},
      cardAccentColor: {name: 'card-accent-color', variable: 'card-accent-color', value: '#ffc600'},
      cardDividerColor: {name: 'card-divider-color', variable: 'card-divider-color', value: 'rgba(255, 255, 255, 0.2)'},
      cardTitleTextColor: {name: 'card-title-text-color', variable: 'card-title-text-color', value: 'rgba(255, 255, 255, 0.88)'},
      cardPrimaryTextColor: {name: 'card-primary-text-color', variable: 'card-primary-text-color', value: 'rgba(255, 255, 255, 0.88)'},
      cardSecondaryTextColor: {name: 'card-secondary-text-color', variable: 'card-secondary-text-color', value: 'rgba(255, 255, 255, 0.6)'},
      cardPrimaryButtonBgColor: {name: 'card-primary-button-bg-color', variable: 'card-primary-button-bg-color', value: '#ffc600'},
      cardPrimaryButtonTextColor: {name: 'card-primary-button-text-color', variable: 'card-primary-button-text-color', value: 'rgba(0,0,0, 0.88)'},
      cardSecondaryButtonBgColor: {name: 'card-secondary-button-bg-color', variable: 'card-secondary-button-bg-color', value: '#1F4662'},
      cardSecondaryButtonTextColor: {name: 'card-secondary-button-text-color', variable: 'card-secondary-button-text-color', value: 'rgba(255, 255, 255, 0.88)'},
      cardWarningButtonBgColor: {name: 'card-warning-button-bg-color', variable: 'card-warning-button-bg-color', value: '#f5f749'},
      cardWarningButtonTextColor: {name: 'card-warning-button-text-color', variable: 'card-warning-button-text-color', value: 'rgba(0,0,0, 0.88)'},
      cardDangerButtonBgColor: {name: 'card-danger-button-bg-color', variable: 'card-danger-button-bg-color', value: '#ff0088'},
      cardDangerButtonTextColor: {name: 'card-danger-button-text-color', variable: 'card-danger-button-text-color', value: 'rgba(255, 255, 255, 0.88)'},
    }
  },
];

export const defaultSettings = {
  themes: defaultThemes,
  activeTheme: 'light',
  dynamicThemes: false,
  lightTheme: 'light',
  darkTheme: 'dark',
  showSettingHelpText: true,
};

const defaultValue = {
  settings: defaultSettings,
  setSettings: () => Promise.resolve(),
};

export const SettingsContext =
  React.createContext<SettingsContextValue>(defaultValue);
