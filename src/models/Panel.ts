import { PanelSettings } from '../contexts/PanelContext';
import { PanelKind } from '../enums/panelKind';
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
