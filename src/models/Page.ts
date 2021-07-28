import { GridLayout } from './GridLayout';
import { Panel } from './Panel';

export type Page = {
  id: string;
  name: string;
  isActive: boolean;
  panels: Panel[];
  grid: GridLayout;
};
