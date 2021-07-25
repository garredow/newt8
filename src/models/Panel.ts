import { PanelKind } from '../enums/panelKind';
import { PanelSettings } from '../ui-components/panel/PanelContext';

export type Panel = {
  id: string;
  kind: PanelKind;
  order?: number;
  options: PanelSettings;
};
