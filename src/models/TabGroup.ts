import { Tab } from './Browser';

export type TabGroup = {
  id?: number;
  title: string;
  accessedAt: string;
  createdAt: string;
  tabs: Tab[];
};
