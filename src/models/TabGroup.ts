import { ChromeTab } from './ChromeTab';

export type TabGroup = {
  id?: number;
  title: string;
  accessedAt: string;
  createdAt: string;
  tabs: ChromeTab[];
};
