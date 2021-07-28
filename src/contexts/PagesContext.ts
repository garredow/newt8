import React from 'react';
import { Page } from '../models/Page';

type PagesContextValue = {
  pages: Page[];
  activePage: Page;
  setPages: (pages: Page[]) => Promise<void>;
  savePage: (page: Page) => Promise<void>;
  deletePage: (pageId: string) => Promise<void>;
};

export const defaultPages: Page[] = [
  {
    id: 'page_0',
    name: 'Home',
    isActive: true,
    panels: [],
    grid: {
      rowSizes: [],
      colSizes: [],
      layout: [],
    },
  },
  {
    id: 'page_1',
    name: 'Work',
    isActive: false,
    panels: [],
    grid: {
      rowSizes: [],
      colSizes: [],
      layout: [],
    },
  },
];

const defaultValue: PagesContextValue = {
  pages: defaultPages,
  activePage: defaultPages[0],
  setPages: () => Promise.resolve(),
  savePage: () => Promise.resolve(),
  deletePage: () => Promise.resolve(),
};

export const PagesContext =
  React.createContext<PagesContextValue>(defaultValue);
