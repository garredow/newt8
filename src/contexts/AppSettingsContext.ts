import React from 'react';
import { DisplayDensity } from '../enums/displayDensity';
import { PanelDisplayType } from '../enums/panelDisplayType';
import { Settings } from '../models/Settings';
import { Theme } from '../models/Theme';

type AppSettingsContextValue = {
  settings: Settings;
  setSettings: (settings: Settings) => Promise<void>;
};

const fontWeightOptions = [
  { key: '100', name: '100' },
  { key: '200', name: '200' },
  { key: '300', name: '300' },
  { key: '400', name: '400' },
  { key: '500', name: '500' },
  { key: '600', name: '600' },
  { key: '700', name: '700' },
  { key: '800', name: '800' },
  { key: '900', name: '900' },
];

const defaultThemes: Theme[] = [
  {
    id: 'light',
    name: 'Light',
    values: {
      appBgColor: {
        name: 'app-bg-color',
        type: 'color',
        variable: 'app-bg-color',
        value: '#f4f5f5',
      },
      appAccentColor: {
        name: 'app-accent-color',
        type: 'color',
        variable: 'app-accent-color',
        value: '#75abbc',
      },
      dividerColor: {
        name: 'divider-color',
        type: 'color',
        variable: 'panel-divider-color',
        value: 'rgba(0,0,0, 0.2)',
      },
      primaryTextColor: {
        name: 'primary-text-color',
        type: 'color',
        variable: 'primary-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      secondaryTextColor: {
        name: 'secondary-text-color',
        type: 'color',
        variable: 'secondary-text-color',
        value: 'rgba(0,0,0, 0.5)',
      },
      warningTextColor: {
        name: 'warning-text-color',
        type: 'color',
        variable: 'warning-text-color',
        value: '#D3D60A',
      },
      errorTextColor: {
        name: 'error-text-color',
        type: 'color',
        variable: 'error-text-color',
        value: '#f45d52',
      },
      baseTextSize: {
        name: 'base-text-size',
        type: 'number',
        variable: 'base-text-size',
        value: '16',
      },
      baseTextWeight: {
        name: 'base-text-weight',
        type: 'string',
        variable: 'base-text-weight',
        value: '400',
        options: fontWeightOptions,
      },
      primaryButtonBgColor: {
        name: 'primary-button-bg-color',
        type: 'color',
        variable: 'primary-button-bg-color',
        value: '#75abbc',
      },
      primaryButtonTextColor: {
        name: 'primary-button-text-color',
        type: 'color',
        variable: 'primary-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      secondaryButtonBgColor: {
        name: 'secondary-button-bg-color',
        type: 'color',
        variable: 'secondary-button-bg-color',
        value: '#d0d6dd',
      },
      secondaryButtonTextColor: {
        name: 'secondary-button-text-color',
        type: 'color',
        variable: 'secondary-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      warningButtonBgColor: {
        name: 'warning-button-bg-color',
        type: 'color',
        variable: 'warning-button-bg-color',
        value: '#f6f862',
      },
      warningButtonTextColor: {
        name: 'warning-button-text-color',
        type: 'color',
        variable: 'warning-button-text-color',
        value: 'rgba(0, 0, 0, 0.88)',
      },
      dangerButtonBgColor: {
        name: 'danger-button-bg-color',
        type: 'color',
        variable: 'danger-button-bg-color',
        value: '#f45d52',
      },
      dangerButtonTextColor: {
        name: 'danger-button-text-color',
        type: 'color',
        variable: 'danger-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },

      panelBgColor: {
        name: 'panel-bg-color',
        type: 'color',
        variable: 'panel-bg-color',
        value: '#f4f5f5',
      },
      panelAccentColor: {
        name: 'panel-accent-color',
        type: 'color',
        variable: 'panel-accent-color',
        value: '#75abbc',
      },
      panelDividerColor: {
        name: 'panel-divider-color',
        type: 'color',
        variable: 'panel-divider-color',
        value: 'rgba(0,0,0, 0.2)',
      },
      panelTitleTextColor: {
        name: 'panel-title-text-color',
        type: 'color',
        variable: 'panel-title-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      panelTitleTextSize: {
        name: 'panel-title-text-size',
        type: 'string',
        variable: 'panel-title-text-size',
        value: '2em',
      },
      panelTitleTextWeight: {
        name: 'panel-title-text-weight',
        type: 'string',
        variable: 'panel-title-text-weight',
        value: '600',
        options: fontWeightOptions,
      },
      panelPrimaryTextColor: {
        name: 'panel-primary-text-color',
        type: 'color',
        variable: 'panel-primary-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      panelSecondaryTextColor: {
        name: 'panel-secondary-text-color',
        type: 'color',
        variable: 'panel-secondary-text-color',
        value: 'rgba(0,0,0, 0.5)',
      },
      panelPrimaryButtonBgColor: {
        name: 'panel-primary-button-bg-color',
        type: 'color',
        variable: 'panel-primary-button-bg-color',
        value: '#75abbc',
      },
      panelPrimaryButtonTextColor: {
        name: 'panel-primary-button-text-color',
        type: 'color',
        variable: 'panel-primary-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      panelSecondaryButtonBgColor: {
        name: 'panel-secondary-button-bg-color',
        type: 'color',
        variable: 'panel-secondary-button-bg-color',
        value: '#d0d6dd',
      },
      panelSecondaryButtonTextColor: {
        name: 'panel-secondary-button-text-color',
        type: 'color',
        variable: 'panel-secondary-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      panelWarningButtonBgColor: {
        name: 'panel-warning-button-bg-color',
        type: 'color',
        variable: 'panel-warning-button-bg-color',
        value: '#f6f862',
      },
      panelWarningButtonTextColor: {
        name: 'panel-warning-button-text-color',
        type: 'color',
        variable: 'panel-warning-button-text-color',
        value: 'rgba(0, 0, 0, 0.88)',
      },
      panelDangerButtonBgColor: {
        name: 'panel-danger-button-bg-color',
        type: 'color',
        variable: 'panel-danger-button-bg-color',
        value: '#f45d52',
      },
      panelDangerButtonTextColor: {
        name: 'panel-danger-button-text-color',
        type: 'color',
        variable: 'panel-danger-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },

      cardBgColor: {
        name: 'card-bg-color',
        type: 'color',
        variable: 'card-bg-color',
        value: '#ffffff',
      },
      cardAccentColor: {
        name: 'card-accent-color',
        type: 'color',
        variable: 'card-accent-color',
        value: '#75abbc',
      },
      cardDividerColor: {
        name: 'card-divider-color',
        type: 'color',
        variable: 'card-divider-color',
        value: 'rgba(0,0,0, 0.1)',
      },
      cardTitleTextColor: {
        name: 'card-title-text-color',
        type: 'color',
        variable: 'card-title-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      cardTitleTextSize: {
        name: 'card-title-text-size',
        type: 'string',
        variable: 'card-title-text-size',
        value: '1.5em',
      },
      cardTitleTextWeight: {
        name: 'card-title-text-weight',
        type: 'string',
        variable: 'card-title-text-weight',
        value: '500',
        options: fontWeightOptions,
      },
      cardPrimaryTextColor: {
        name: 'card-primary-text-color',
        type: 'color',
        variable: 'card-primary-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      cardSecondaryTextColor: {
        name: 'card-secondary-text-color',
        type: 'color',
        variable: 'card-secondary-text-color',
        value: 'rgba(0,0,0, 0.5)',
      },
      cardPrimaryButtonBgColor: {
        name: 'card-primary-button-bg-color',
        type: 'color',
        variable: 'card-primary-button-bg-color',
        value: '#75abbc',
      },
      cardPrimaryButtonTextColor: {
        name: 'card-primary-button-text-color',
        type: 'color',
        variable: 'card-primary-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      cardSecondaryButtonBgColor: {
        name: 'card-secondary-button-bg-color',
        type: 'color',
        variable: 'card-secondary-button-bg-color',
        value: '#d0d6dd',
      },
      cardSecondaryButtonTextColor: {
        name: 'card-secondary-button-text-color',
        type: 'color',
        variable: 'card-secondary-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      cardWarningButtonBgColor: {
        name: 'card-warning-button-bg-color',
        type: 'color',
        variable: 'card-warning-button-bg-color',
        value: '#f6f862',
      },
      cardWarningButtonTextColor: {
        name: 'card-warning-button-text-color',
        type: 'color',
        variable: 'card-warning-button-text-color',
        value: 'rgba(0, 0, 0, 0.88)',
      },
      cardDangerButtonBgColor: {
        name: 'card-danger-button-bg-color',
        type: 'color',
        variable: 'card-danger-button-bg-color',
        value: '#f45d52',
      },
      cardDangerButtonTextColor: {
        name: 'card-danger-button-text-color',
        type: 'color',
        variable: 'card-danger-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },

      sidebarBgColor: {
        name: 'sidebar-bg-color',
        type: 'color',
        variable: 'sidebar-bg-color',
        value: '#ffffff',
      },
      sidebarAccentColor: {
        name: 'sidebar-accent-color',
        type: 'color',
        variable: 'sidebar-accent-color',
        value: '#75abbc',
      },
      sidebarDividerColor: {
        name: 'sidebar-divider-color',
        type: 'color',
        variable: 'sidebar-divider-color',
        value: 'rgba(0,0,0, 0.1)',
      },
      sidebarTitleTextColor: {
        name: 'sidebar-title-text-color',
        type: 'color',
        variable: 'sidebar-title-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      sidebarTitleTextSize: {
        name: 'sidebar-title-text-size',
        type: 'string',
        variable: 'sidebar-title-text-size',
        value: '1.2em',
      },
      sidebarPrimaryTextColor: {
        name: 'sidebar-primary-text-color',
        type: 'color',
        variable: 'sidebar-primary-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      sidebarSecondaryTextColor: {
        name: 'sidebar-secondary-text-color',
        type: 'color',
        variable: 'sidebar-secondary-text-color',
        value: 'rgba(0,0,0, 0.5)',
      },
      sidebarPrimaryButtonBgColor: {
        name: 'sidebar-primary-button-bg-color',
        type: 'color',
        variable: 'sidebar-primary-button-bg-color',
        value: '#75abbc',
      },
      sidebarPrimaryButtonTextColor: {
        name: 'sidebar-primary-button-text-color',
        type: 'color',
        variable: 'sidebar-primary-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      sidebarSecondaryButtonBgColor: {
        name: 'sidebar-secondary-button-bg-color',
        type: 'color',
        variable: 'sidebar-secondary-button-bg-color',
        value: '#d0d6dd',
      },
      sidebarSecondaryButtonTextColor: {
        name: 'sidebar-secondary-button-text-color',
        type: 'color',
        variable: 'sidebar-secondary-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      sidebarWarningButtonBgColor: {
        name: 'sidebar-warning-button-bg-color',
        type: 'color',
        variable: 'sidebar-warning-button-bg-color',
        value: '#f6f862',
      },
      sidebarWarningButtonTextColor: {
        name: 'sidebar-warning-button-text-color',
        type: 'color',
        variable: 'sidebar-warning-button-text-color',
        value: 'rgba(0, 0, 0, 0.88)',
      },
      sidebarDangerButtonBgColor: {
        name: 'sidebar-danger-button-bg-color',
        type: 'color',
        variable: 'sidebar-danger-button-bg-color',
        value: '#f45d52',
      },
      sidebarDangerButtonTextColor: {
        name: 'sidebar-danger-button-text-color',
        type: 'color',
        variable: 'sidebar-danger-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
    },
  },
  {
    id: 'dark',
    name: 'Dark',
    values: {
      appBgColor: {
        name: 'app-bg-color',
        type: 'color',
        variable: 'app-bg-color',
        value: '#121517',
      },
      appAccentColor: {
        name: 'app-accent-color',
        type: 'color',
        variable: 'app-accent-color',
        value: '#6A8D92',
      },
      dividerColor: {
        name: 'divider-color',
        type: 'color',
        variable: 'panel-divider-color',
        value: 'rgba(255,255,255,.2',
      },
      primaryTextColor: {
        name: 'primary-text-color',
        type: 'color',
        variable: 'primary-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      secondaryTextColor: {
        name: 'secondary-text-color',
        type: 'color',
        variable: 'secondary-text-color',
        value: 'rgba(255, 255, 255, 0.6)',
      },
      warningTextColor: {
        name: 'warning-text-color',
        type: 'color',
        variable: 'warning-text-color',
        value: '#EAB948',
      },
      errorTextColor: {
        name: 'error-text-color',
        type: 'color',
        variable: 'error-text-color',
        value: '#A52422',
      },
      baseTextSize: {
        name: 'base-text-size',
        type: 'number',
        variable: 'base-text-size',
        value: '16',
      },
      baseTextWeight: {
        name: 'base-text-weight',
        type: 'string',
        variable: 'base-text-weight',
        value: '400',
        options: fontWeightOptions,
      },
      primaryButtonBgColor: {
        name: 'primary-button-bg-color',
        type: 'color',
        variable: 'primary-button-bg-color',
        value: '#6A8D92',
      },
      primaryButtonTextColor: {
        name: 'primary-button-text-color',
        type: 'color',
        variable: 'primary-button-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      secondaryButtonBgColor: {
        name: 'secondary-button-bg-color',
        type: 'color',
        variable: 'secondary-button-bg-color',
        value: '#222E2F',
      },
      secondaryButtonTextColor: {
        name: 'secondary-button-text-color',
        type: 'color',
        variable: 'secondary-button-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      warningButtonBgColor: {
        name: 'warning-button-bg-color',
        type: 'color',
        variable: 'warning-button-bg-color',
        value: '#EAC948',
      },
      warningButtonTextColor: {
        name: 'warning-button-text-color',
        type: 'color',
        variable: 'warning-button-text-color',
        value: 'rgba(0, 0, 0, 0.88)',
      },
      dangerButtonBgColor: {
        name: 'danger-button-bg-color',
        type: 'color',
        variable: 'danger-button-bg-color',
        value: '#A52422',
      },
      dangerButtonTextColor: {
        name: 'danger-button-text-color',
        type: 'color',
        variable: 'danger-button-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },

      panelBgColor: {
        name: 'panel-bg-color',
        type: 'color',
        variable: 'panel-bg-color',
        value: '#121517',
      },
      panelAccentColor: {
        name: 'panel-accent-color',
        type: 'color',
        variable: 'panel-accent-color',
        value: '#6A8D92',
      },
      panelDividerColor: {
        name: 'panel-divider-color',
        type: 'color',
        variable: 'panel-divider-color',
        value: 'rgba(255,255,255,.2',
      },
      panelTitleTextColor: {
        name: 'panel-title-text-color',
        type: 'color',
        variable: 'panel-title-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      panelTitleTextSize: {
        name: 'panel-title-text-size',
        type: 'string',
        variable: 'panel-title-text-size',
        value: '2em',
      },
      panelTitleTextWeight: {
        name: 'panel-title-text-weight',
        type: 'string',
        variable: 'panel-title-text-weight',
        value: '600',
        options: fontWeightOptions,
      },
      panelPrimaryTextColor: {
        name: 'panel-primary-text-color',
        type: 'color',
        variable: 'panel-primary-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      panelSecondaryTextColor: {
        name: 'panel-secondary-text-color',
        type: 'color',
        variable: 'panel-secondary-text-color',
        value: 'rgba(255, 255, 255, 0.6)',
      },
      panelPrimaryButtonBgColor: {
        name: 'panel-primary-button-bg-color',
        type: 'color',
        variable: 'panel-primary-button-bg-color',
        value: '#6A8D92',
      },
      panelPrimaryButtonTextColor: {
        name: 'panel-primary-button-text-color',
        type: 'color',
        variable: 'panel-primary-button-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      panelSecondaryButtonBgColor: {
        name: 'panel-secondary-button-bg-color',
        type: 'color',
        variable: 'panel-secondary-button-bg-color',
        value: '#222E2F',
      },
      panelSecondaryButtonTextColor: {
        name: 'panel-secondary-button-text-color',
        type: 'color',
        variable: 'panel-secondary-button-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      panelWarningButtonBgColor: {
        name: 'panel-warning-button-bg-color',
        type: 'color',
        variable: 'panel-warning-button-bg-color',
        value: '#EAC948',
      },
      panelWarningButtonTextColor: {
        name: 'panel-warning-button-text-color',
        type: 'color',
        variable: 'panel-warning-button-text-color',
        value: 'rgba(0, 0, 0, 0.88)',
      },
      panelDangerButtonBgColor: {
        name: 'panel-danger-button-bg-color',
        type: 'color',
        variable: 'panel-danger-button-bg-color',
        value: '#A52422',
      },
      panelDangerButtonTextColor: {
        name: 'panel-danger-button-text-color',
        type: 'color',
        variable: 'panel-danger-button-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },

      cardBgColor: {
        name: 'card-bg-color',
        type: 'color',
        variable: 'card-bg-color',
        value: '#1B1F22',
      },
      cardAccentColor: {
        name: 'card-accent-color',
        type: 'color',
        variable: 'card-accent-color',
        value: '#6A8D92',
      },
      cardDividerColor: {
        name: 'card-divider-color',
        type: 'color',
        variable: 'card-divider-color',
        value: 'rgba(255,255,255,.2',
      },
      cardTitleTextColor: {
        name: 'card-title-text-color',
        type: 'color',
        variable: 'card-title-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      cardTitleTextSize: {
        name: 'card-title-text-size',
        type: 'string',
        variable: 'card-title-text-size',
        value: '1.5em',
      },
      cardTitleTextWeight: {
        name: 'card-title-text-weight',
        type: 'string',
        variable: 'card-title-text-weight',
        value: '500',
        options: fontWeightOptions,
      },
      cardPrimaryTextColor: {
        name: 'card-primary-text-color',
        type: 'color',
        variable: 'card-primary-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      cardSecondaryTextColor: {
        name: 'card-secondary-text-color',
        type: 'color',
        variable: 'card-secondary-text-color',
        value: 'rgba(255, 255, 255, 0.6)',
      },
      cardPrimaryButtonBgColor: {
        name: 'card-primary-button-bg-color',
        type: 'color',
        variable: 'card-primary-button-bg-color',
        value: '#6A8D92',
      },
      cardPrimaryButtonTextColor: {
        name: 'card-primary-button-text-color',
        type: 'color',
        variable: 'card-primary-button-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      cardSecondaryButtonBgColor: {
        name: 'card-secondary-button-bg-color',
        type: 'color',
        variable: 'card-secondary-button-bg-color',
        value: '#222E2F',
      },
      cardSecondaryButtonTextColor: {
        name: 'card-secondary-button-text-color',
        type: 'color',
        variable: 'card-secondary-button-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      cardWarningButtonBgColor: {
        name: 'card-warning-button-bg-color',
        type: 'color',
        variable: 'card-warning-button-bg-color',
        value: '#EAC948',
      },
      cardWarningButtonTextColor: {
        name: 'card-warning-button-text-color',
        type: 'color',
        variable: 'card-warning-button-text-color',
        value: 'rgba(0, 0, 0, 0.88)',
      },
      cardDangerButtonBgColor: {
        name: 'card-danger-button-bg-color',
        type: 'color',
        variable: 'card-danger-button-bg-color',
        value: '#A52422',
      },
      cardDangerButtonTextColor: {
        name: 'card-danger-button-text-color',
        type: 'color',
        variable: 'card-danger-button-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },

      sidebarBgColor: {
        name: 'sidebar-bg-color',
        type: 'color',
        variable: 'sidebar-bg-color',
        value: '#1B1F22',
      },
      sidebarAccentColor: {
        name: 'sidebar-accent-color',
        type: 'color',
        variable: 'sidebar-accent-color',
        value: '#6A8D92',
      },
      sidebarDividerColor: {
        name: 'sidebar-divider-color',
        type: 'color',
        variable: 'sidebar-divider-color',
        value: 'rgba(255,255,255,.2',
      },
      sidebarTitleTextColor: {
        name: 'sidebar-title-text-color',
        type: 'color',
        variable: 'sidebar-title-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      sidebarTitleTextSize: {
        name: 'sidebar-title-text-size',
        type: 'string',
        variable: 'sidebar-title-text-size',
        value: '1.2em',
      },
      sidebarPrimaryTextColor: {
        name: 'sidebar-primary-text-color',
        type: 'color',
        variable: 'sidebar-primary-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      sidebarSecondaryTextColor: {
        name: 'sidebar-secondary-text-color',
        type: 'color',
        variable: 'sidebar-secondary-text-color',
        value: 'rgba(255, 255, 255, 0.6)',
      },
      sidebarPrimaryButtonBgColor: {
        name: 'sidebar-primary-button-bg-color',
        type: 'color',
        variable: 'sidebar-primary-button-bg-color',
        value: '#6A8D92',
      },
      sidebarPrimaryButtonTextColor: {
        name: 'sidebar-primary-button-text-color',
        type: 'color',
        variable: 'sidebar-primary-button-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      sidebarSecondaryButtonBgColor: {
        name: 'sidebar-secondary-button-bg-color',
        type: 'color',
        variable: 'sidebar-secondary-button-bg-color',
        value: '#222E2F',
      },
      sidebarSecondaryButtonTextColor: {
        name: 'sidebar-secondary-button-text-color',
        type: 'color',
        variable: 'sidebar-secondary-button-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
      sidebarWarningButtonBgColor: {
        name: 'sidebar-warning-button-bg-color',
        type: 'color',
        variable: 'sidebar-warning-button-bg-color',
        value: '#EAC948',
      },
      sidebarWarningButtonTextColor: {
        name: 'sidebar-warning-button-text-color',
        type: 'color',
        variable: 'sidebar-warning-button-text-color',
        value: 'rgba(0, 0, 0, 0.88)',
      },
      sidebarDangerButtonBgColor: {
        name: 'sidebar-danger-button-bg-color',
        type: 'color',
        variable: 'sidebar-danger-button-bg-color',
        value: '#A52422',
      },
      sidebarDangerButtonTextColor: {
        name: 'sidebar-danger-button-text-color',
        type: 'color',
        variable: 'sidebar-danger-button-text-color',
        value: 'rgba(255, 255, 255, 0.84)',
      },
    },
  },
  {
    id: 'cobalt2',
    name: 'Cobalt2',
    values: {
      appBgColor: {
        name: 'app-bg-color',
        type: 'color',
        variable: 'app-bg-color',
        value: 'rgb(17,35,46)',
      },
      appAccentColor: {
        name: 'app-accent-color',
        type: 'color',
        variable: 'app-accent-color',
        value: '#ffc600',
      },
      dividerColor: {
        name: 'divider-color',
        type: 'color',
        variable: 'panel-divider-color',
        value: 'rgba(255, 255, 255, 0.2)',
      },
      primaryTextColor: {
        name: 'primary-text-color',
        type: 'color',
        variable: 'primary-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },
      secondaryTextColor: {
        name: 'secondary-text-color',
        type: 'color',
        variable: 'secondary-text-color',
        value: 'rgba(255, 255, 255, 0.6)',
      },
      warningTextColor: {
        name: 'warning-text-color',
        type: 'color',
        variable: 'warning-text-color',
        value: '#f5f749',
      },
      errorTextColor: {
        name: 'error-text-color',
        type: 'color',
        variable: 'error-text-color',
        value: '#A52422',
      },
      baseTextSize: {
        name: 'base-text-size',
        type: 'number',
        variable: 'base-text-size',
        value: '16',
      },
      baseTextWeight: {
        name: 'base-text-weight',
        type: 'string',
        variable: 'base-text-weight',
        value: '400',
        options: fontWeightOptions,
      },
      primaryButtonBgColor: {
        name: 'primary-button-bg-color',
        type: 'color',
        variable: 'primary-button-bg-color',
        value: '#ffc600',
      },
      primaryButtonTextColor: {
        name: 'primary-button-text-color',
        type: 'color',
        variable: 'primary-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      secondaryButtonBgColor: {
        name: 'secondary-button-bg-color',
        type: 'color',
        variable: 'secondary-button-bg-color',
        value: '#0d3a58',
      },
      secondaryButtonTextColor: {
        name: 'secondary-button-text-color',
        type: 'color',
        variable: 'secondary-button-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },
      warningButtonBgColor: {
        name: 'warning-button-bg-color',
        type: 'color',
        variable: 'warning-button-bg-color',
        value: '#f5f749',
      },
      warningButtonTextColor: {
        name: 'warning-button-text-color',
        type: 'color',
        variable: 'warning-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      dangerButtonBgColor: {
        name: 'danger-button-bg-color',
        type: 'color',
        variable: 'danger-button-bg-color',
        value: '#A52422',
      },
      dangerButtonTextColor: {
        name: 'danger-button-text-color',
        type: 'color',
        variable: 'danger-button-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },

      panelBgColor: {
        name: 'panel-bg-color',
        type: 'color',
        variable: 'panel-bg-color',
        value: 'rgb(17,35,46)',
      },
      panelAccentColor: {
        name: 'panel-accent-color',
        type: 'color',
        variable: 'panel-accent-color',
        value: '#ffc600',
      },
      panelDividerColor: {
        name: 'panel-divider-color',
        type: 'color',
        variable: 'panel-divider-color',
        value: 'rgba(255, 255, 255, 0.2)',
      },
      panelTitleTextColor: {
        name: 'panel-title-text-color',
        type: 'color',
        variable: 'panel-title-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },
      panelTitleTextSize: {
        name: 'panel-title-text-size',
        type: 'string',
        variable: 'panel-title-text-size',
        value: '2em',
      },
      panelTitleTextWeight: {
        name: 'panel-title-text-weight',
        type: 'string',
        variable: 'panel-title-text-weight',
        value: '600',
        options: fontWeightOptions,
      },
      panelPrimaryTextColor: {
        name: 'panel-primary-text-color',
        type: 'color',
        variable: 'panel-primary-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },
      panelSecondaryTextColor: {
        name: 'panel-secondary-text-color',
        type: 'color',
        variable: 'panel-secondary-text-color',
        value: 'rgba(255, 255, 255, 0.6)',
      },
      panelPrimaryButtonBgColor: {
        name: 'panel-primary-button-bg-color',
        type: 'color',
        variable: 'panel-primary-button-bg-color',
        value: '#ffc600',
      },
      panelPrimaryButtonTextColor: {
        name: 'panel-primary-button-text-color',
        type: 'color',
        variable: 'panel-primary-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      panelSecondaryButtonBgColor: {
        name: 'panel-secondary-button-bg-color',
        type: 'color',
        variable: 'panel-secondary-button-bg-color',
        value: '#0d3a58',
      },
      panelSecondaryButtonTextColor: {
        name: 'panel-secondary-button-text-color',
        type: 'color',
        variable: 'panel-secondary-button-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },
      panelWarningButtonBgColor: {
        name: 'panel-warning-button-bg-color',
        type: 'color',
        variable: 'panel-warning-button-bg-color',
        value: '#f5f749',
      },
      panelWarningButtonTextColor: {
        name: 'panel-warning-button-text-color',
        type: 'color',
        variable: 'panel-warning-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      panelDangerButtonBgColor: {
        name: 'panel-danger-button-bg-color',
        type: 'color',
        variable: 'panel-danger-button-bg-color',
        value: '#A52422',
      },
      panelDangerButtonTextColor: {
        name: 'panel-danger-button-text-color',
        type: 'color',
        variable: 'panel-danger-button-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },

      cardBgColor: {
        name: 'card-bg-color',
        type: 'color',
        variable: 'card-bg-color',
        value: 'rgb(15,53,75)',
      },
      cardAccentColor: {
        name: 'card-accent-color',
        type: 'color',
        variable: 'card-accent-color',
        value: '#ffc600',
      },
      cardDividerColor: {
        name: 'card-divider-color',
        type: 'color',
        variable: 'card-divider-color',
        value: 'rgba(255, 255, 255, 0.2)',
      },
      cardTitleTextColor: {
        name: 'card-title-text-color',
        type: 'color',
        variable: 'card-title-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },
      cardTitleTextSize: {
        name: 'card-title-text-size',
        type: 'string',
        variable: 'card-title-text-size',
        value: '1.5em',
      },
      cardTitleTextWeight: {
        name: 'card-title-text-weight',
        type: 'string',
        variable: 'card-title-text-weight',
        value: '500',
        options: fontWeightOptions,
      },
      cardPrimaryTextColor: {
        name: 'card-primary-text-color',
        type: 'color',
        variable: 'card-primary-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },
      cardSecondaryTextColor: {
        name: 'card-secondary-text-color',
        type: 'color',
        variable: 'card-secondary-text-color',
        value: 'rgba(255, 255, 255, 0.6)',
      },
      cardPrimaryButtonBgColor: {
        name: 'card-primary-button-bg-color',
        type: 'color',
        variable: 'card-primary-button-bg-color',
        value: '#ffc600',
      },
      cardPrimaryButtonTextColor: {
        name: 'card-primary-button-text-color',
        type: 'color',
        variable: 'card-primary-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      cardSecondaryButtonBgColor: {
        name: 'card-secondary-button-bg-color',
        type: 'color',
        variable: 'card-secondary-button-bg-color',
        value: '#1F4662',
      },
      cardSecondaryButtonTextColor: {
        name: 'card-secondary-button-text-color',
        type: 'color',
        variable: 'card-secondary-button-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },
      cardWarningButtonBgColor: {
        name: 'card-warning-button-bg-color',
        type: 'color',
        variable: 'card-warning-button-bg-color',
        value: '#f5f749',
      },
      cardWarningButtonTextColor: {
        name: 'card-warning-button-text-color',
        type: 'color',
        variable: 'card-warning-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      cardDangerButtonBgColor: {
        name: 'card-danger-button-bg-color',
        type: 'color',
        variable: 'card-danger-button-bg-color',
        value: '#A52422',
      },
      cardDangerButtonTextColor: {
        name: 'card-danger-button-text-color',
        type: 'color',
        variable: 'card-danger-button-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },

      sidebarBgColor: {
        name: 'sidebar-bg-color',
        type: 'color',
        variable: 'sidebar-bg-color',
        value: 'rgb(15,53,75)',
      },
      sidebarAccentColor: {
        name: 'sidebar-accent-color',
        type: 'color',
        variable: 'sidebar-accent-color',
        value: '#ffc600',
      },
      sidebarDividerColor: {
        name: 'sidebar-divider-color',
        type: 'color',
        variable: 'sidebar-divider-color',
        value: 'rgba(255, 255, 255, 0.2)',
      },
      sidebarTitleTextColor: {
        name: 'sidebar-title-text-color',
        type: 'color',
        variable: 'sidebar-title-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },
      sidebarTitleTextSize: {
        name: 'sidebar-title-text-size',
        type: 'string',
        variable: 'sidebar-title-text-size',
        value: '1.2em',
      },
      sidebarPrimaryTextColor: {
        name: 'sidebar-primary-text-color',
        type: 'color',
        variable: 'sidebar-primary-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },
      sidebarSecondaryTextColor: {
        name: 'sidebar-secondary-text-color',
        type: 'color',
        variable: 'sidebar-secondary-text-color',
        value: 'rgba(255, 255, 255, 0.6)',
      },
      sidebarPrimaryButtonBgColor: {
        name: 'sidebar-primary-button-bg-color',
        type: 'color',
        variable: 'sidebar-primary-button-bg-color',
        value: '#ffc600',
      },
      sidebarPrimaryButtonTextColor: {
        name: 'sidebar-primary-button-text-color',
        type: 'color',
        variable: 'sidebar-primary-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      sidebarSecondaryButtonBgColor: {
        name: 'sidebar-secondary-button-bg-color',
        type: 'color',
        variable: 'sidebar-secondary-button-bg-color',
        value: '#1F4662',
      },
      sidebarSecondaryButtonTextColor: {
        name: 'sidebar-secondary-button-text-color',
        type: 'color',
        variable: 'sidebar-secondary-button-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },
      sidebarWarningButtonBgColor: {
        name: 'sidebar-warning-button-bg-color',
        type: 'color',
        variable: 'sidebar-warning-button-bg-color',
        value: '#f5f749',
      },
      sidebarWarningButtonTextColor: {
        name: 'sidebar-warning-button-text-color',
        type: 'color',
        variable: 'sidebar-warning-button-text-color',
        value: 'rgba(0,0,0, 0.88)',
      },
      sidebarDangerButtonBgColor: {
        name: 'sidebar-danger-button-bg-color',
        type: 'color',
        variable: 'sidebar-danger-button-bg-color',
        value: '#A52422',
      },
      sidebarDangerButtonTextColor: {
        name: 'sidebar-danger-button-text-color',
        type: 'color',
        variable: 'sidebar-danger-button-text-color',
        value: 'rgba(255, 255, 255, 0.88)',
      },
    },
  },
];

export const defaultSettings: Settings = {
  themes: defaultThemes,
  activeTheme: 'light',
  dynamicThemes: false,
  lightTheme: 'light',
  darkTheme: 'dark',
  showSettingHelpText: true,
  confirmBeforeDelete: true,
  showActionsOnHover: false,
  showSiteDividers: false,
  showCardDividers: false,
  showCardShadow: true,
  displayDensity: DisplayDensity.Normal,
  defaultPanelDisplay: PanelDisplayType.Cards,
};

const defaultValue: AppSettingsContextValue = {
  settings: defaultSettings,
  setSettings: () => Promise.resolve(),
};

export const AppSettingsContext =
  React.createContext<AppSettingsContextValue>(defaultValue);
