import { PanelType } from '../enums/panelType';
import { PanelOptions } from '../services/panels';

export type Panel = {
  id: PanelType;
  order?: number;
  options: PanelOptions;
};
