import React from 'react';
import { DisplayDensity } from '../../enums/displayDensity';
import { Orientation } from '../../enums/orientation';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { CardSettings } from '../card/Card';
import { SiteRowSettings } from '../list';

export type PanelSettings = CardSettings &
  SiteRowSettings & {
    title: string;
    columns: number;
    displayStyle: PanelDisplayType;
    orientation: Orientation;
  };

export type PanelContextValue = {
  settings: PanelSettings;
};

export const defaultPanelSettings: PanelSettings = {
  title: 'Panel',
  columns: 1,
  displayStyle: PanelDisplayType.Default,
  displayDensity: DisplayDensity.Normal,
  orientation: Orientation.Vertical,
  showCardDividers: false,
  showCardShadow: true,
  showSecondaryText: true,
  showAccentText: true,
  showSiteDividers: false,
};

const defaultValue: PanelContextValue = {
  settings: defaultPanelSettings,
};

export const PanelContext =
  React.createContext<PanelContextValue>(defaultValue);
