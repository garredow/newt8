import { DisplayDensity } from '../enums/displayDensity';
import { PanelDisplayType } from '../enums/panelDisplayType';
import { Theme } from './Theme';

export type Settings = {
  themes: Theme[];
  activeTheme: string;
  dynamicThemes: boolean;
  lightTheme: string;
  darkTheme: string;
  showSettingHelpText: boolean;
  confirmBeforeDelete: boolean;
  showActionsOnHover: boolean;
  showSiteDividers: boolean;
  showCardDividers: boolean;
  showCardShadow: boolean;
  displayDensity: DisplayDensity;
  defaultPanelDisplay: PanelDisplayType;
};
