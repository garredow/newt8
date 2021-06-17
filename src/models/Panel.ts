import { PanelType } from '../enums/panelType';
import { PanelOptions } from '../ui-components/panel';

export type Panel = {
  id: PanelType;
  order?: number;
  options: PanelOptions;
};
