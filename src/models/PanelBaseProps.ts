import { Panel } from './Panel';

export type PanelBaseProps<T> = {
  className?: string;
  panel: Panel<T>;
  onOptionsChanged: (options: T) => void;
  onDeletePanel: () => void;
};
