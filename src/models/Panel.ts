import { PanelKind } from '../enums/panelKind';
import { PanelSettings } from '../contexts/PanelContext';
import { CardSettings } from './CardSettings';

export type Panel<T = PanelSettings> = {
  id: string;
  kind: PanelKind;
  order?: number;
  options: PanelSettings & T;
  cardSettingsMap: {
    [cardId: string]: CardSettings;
  };
};
