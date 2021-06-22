import React from 'react';
import { Page } from './services/panels';

type PagesContextValue = {
  pages: Page[];
  setPages: (pages: Page[]) => Promise<void>;
  savePage: (page: Page) => Promise<void>;
};

export const defaultPages: Page[] = [
  {
    id: 'page_0',
    name: 'Home',
    isActive: true,
    panels: [],
  },
  {
    id: 'page_1',
    name: 'Work',
    isActive: false,
    panels: [],
  },
];

const defaultValue: PagesContextValue = {
  pages: [],
  setPages: () => Promise.resolve(),
  savePage: () => Promise.resolve(),
};

export const PagesContext =
  React.createContext<PagesContextValue>(defaultValue);
