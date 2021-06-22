import { PanelType } from '../enums/panelType';
import { PanelOptions } from '../services/panels';

export type Panel = {
  id: string;
  kind: PanelType;
  order?: number;
  options: PanelOptions;
};
