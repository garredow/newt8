import React from 'react';
import { DisplayDensity } from '../enums/displayDensity';
import { Orientation } from '../enums/orientation';
import { PanelDisplayType } from '../enums/panelDisplayType';
import { CardSettings } from '../models/CardSettings';
import { Panel } from '../models/Panel';

export type PanelSettings = {
  title: string;
  columns: number;
  displayDensity: DisplayDensity;
  displayStyle: PanelDisplayType;
  orientation: Orientation;
  fitCardsToViewport: boolean;
  cardWidth: 'auto' | 'equal';
  // Card settings
  showCardShadow: boolean;
  showCardDividers: boolean;
  // Site Row settings
  showSecondaryText: boolean;
  showAccentText: boolean;
  showSiteDividers: boolean;
};

export type PanelContextValue<TSettings = PanelSettings> = {
  settings: TSettings;
  cardSettingsMap: {
    [cardId: string]: CardSettings;
  };
  savePanel: (panel: Panel) => Promise<void>;
  saveCardSettings: (cardId: string, settings: CardSettings) => Promise<void>;
};

export const defaultPanelSettings: PanelSettings = {
  title: 'Panel',
  columns: 1,
  displayStyle: PanelDisplayType.Default,
  displayDensity: DisplayDensity.Normal,
  orientation: Orientation.Vertical,
  fitCardsToViewport: true,
  cardWidth: 'auto',
  showCardDividers: false,
  showCardShadow: true,
  showSecondaryText: true,
  showAccentText: true,
  showSiteDividers: false,
};

const defaultValue: PanelContextValue = {
  settings: defaultPanelSettings,
  cardSettingsMap: {},
  savePanel: () => Promise.resolve(),
  saveCardSettings: () => Promise.resolve(),
};

export const PanelContext =
  React.createContext<PanelContextValue<any>>(defaultValue);
