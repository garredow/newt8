import { PanelKind } from '../enums/panelKind';
import { PanelSettings } from '../contexts/PanelContext';

export type Panel = {
  id: string;
  kind: PanelKind;
  order?: number;
  options: PanelSettings;
};
