import { PanelKind } from '../enums/panelKind';
import { PanelSettings } from '../contexts/PanelContext';

type CardSettings = {
  cardColor: string;
  headerColor: string;
};

export type Panel<T = PanelSettings> = {
  id: string;
  kind: PanelKind;
  order?: number;
  options: PanelSettings & T;
  cardSettings: {
    [cardId: string]: CardSettings;
  };
};
