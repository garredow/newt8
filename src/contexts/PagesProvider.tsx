import React, { useEffect, useState } from 'react';
import { ComponentBase } from '../models/ComponentBase';
import { Page } from '../services/panels';
import { getItem, setItem, StorageKey } from '../utilities/storage';
import { defaultPages, PagesContext } from './PagesContext';

type PagesProviderProps = ComponentBase;

export function PagesProvider(props: PagesProviderProps) {
  const [pages, setPagesInternal] = useState<Page[]>([]);

  useEffect(() => {
    getItem<Page[]>(StorageKey.Pages).then((res) => {
      setPagesInternal(res || defaultPages);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setPages(val: Page[]) {
    setPagesInternal(val);
    await setItem<Page[]>(StorageKey.Pages, val);
  }

  async function savePage(page: Page) {
    let newPages = [...pages];
    const index = newPages.findIndex((a) => a.id === page.id);
    if (index === -1) {
      newPages.push(page);
    } else {
      newPages[index] = page;
    }

    // New page gets to be active
    if (index === -1) {
      newPages = newPages.map((a, i) =>
        i === newPages.length - 1
          ? { ...a, isActive: true }
          : { ...a, isActive: false }
      );
    }
    setPages(newPages);
  }

  async function deletePage(pageId: string) {
    if (pages.length === 1) {
      console.warn('Cannot delete. There must always be one page.');
      return;
    }
    const newPages = pages
      .filter((a) => a.id !== pageId)
      .map((a, i) =>
        i === 0 ? { ...a, isActive: true } : { ...a, isActive: false }
      );

    setPages(newPages);
  }

  return (
    <PagesContext.Provider value={{ pages, setPages, savePage, deletePage }}>
      {props.children}
    </PagesContext.Provider>
  );
}

export function usePages() {
  const context = React.useContext(PagesContext);
  if (context === undefined) {
    throw new Error('usePages must be used within a PagesProvider');
  }
  return context;
}
