import { PanelType } from '../enums/panelType';

export type Panel = {
  id: PanelType;
  order?: number;
  options: {};
};
