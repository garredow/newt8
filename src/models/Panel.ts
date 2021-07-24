import { PanelKind } from '../enums/panelKind';
import { PanelOptions } from '../services/panels';

export type Panel = {
  id: string;
  kind: PanelKind;
  order?: number;
  options: PanelOptions;
};
