import {
  Bookmark,
  Device,
  Session,
  Site,
  Tab,
  Window,
} from '../models/Browser';
import { promisify } from '../utilities/promisify';
import { applyMetadataToTabs, getMetadata } from './metadata';

export enum SortOrder {
  Original = 'original',
  MostRecent = 'mostRecent',
}

// Tabs

type GetTabsOptions = {
  sortOrder?: SortOrder;
  limit?: number;
};
export async function getTabs({
  sortOrder = SortOrder.Original,
  limit = 30,
}: GetTabsOptions): Promise<Tab[]> {
  let rawTabs = await promisify<chrome.tabs.Tab[]>(chrome.tabs.query, {});

  const metadata = await getMetadata();
  let tabs = applyMetadataToTabs(metadata, rawTabs);

  if (sortOrder !== SortOrder.Original) {
    tabs = tabs.sort((a: Tab, b: Tab) => {
      if (a.accessedAt < b.accessedAt) return 1;
      else if (b.accessedAt < a.accessedAt) return -1;
      else return 0;
    });
  }

  if (limit > 0) {
    tabs = tabs.slice(0, limit);
  }

  return tabs;
}

export function getCurrentTab(): Promise<chrome.tabs.Tab> {
  return new Promise((resolve) => {
    chrome.tabs.getCurrent((tab) => resolve(tab!));
  });
}

export function openUrl(url: string, newTab = false) {
  newTab
    ? chrome.tabs.create({ url, active: true })
    : chrome.tabs.update({ url });
}

export function switchToTab(windowId: number, tabId: number) {
  chrome.windows.update(windowId, { focused: true });
  chrome.tabs.update(tabId, { active: true });
  window.close();
}

// Windows

export function getCurrentWindow(): Promise<Window> {
  return new Promise((resolve) => {
    chrome.windows.getCurrent({ windowTypes: ['normal'] }, (window) =>
      resolve(window as Window)
    );
  });
}

export function getAllWindows(): Promise<Window[]> {
  return new Promise((resolve) => {
    chrome.windows.getAll(
      { populate: true, windowTypes: ['normal'] },
      (windows) => resolve(windows as Window[])
    );
  });
}

export async function getWindows(
  excludeCurrentWindow = true
): Promise<Window[]> {
  const metadata = await getMetadata();
  let windows = await getAllWindows();

  if (excludeCurrentWindow) {
    const currentWindow = await getCurrentWindow();
    windows = windows.filter((a) => a.id !== currentWindow.id);
  }

  const result = windows.map((window) => {
    window.tabs = applyMetadataToTabs(metadata, window.tabs);
    return window;
  });

  return result;
}

// Bookmarks

export async function getBookmarks(folderId: string) {
  const bookmarks = await promisify<Bookmark[]>(
    chrome.bookmarks.getSubTree,
    folderId
  );
  return bookmarks[0].children || [];
}

export async function getAllBookmarks() {
  const result = await promisify<Bookmark[]>(chrome.bookmarks.getTree);
  return result[0].children || [];
}

export function getRecentBookmarks() {
  return promisify<Bookmark[]>(chrome.bookmarks.getRecent, 20);
}

// Top Sites

export function getTopSites(): Promise<Site[]> {
  return new Promise(async (resolve) => {
    chrome.topSites.get(resolve);
  });
}

// Sessions

export function getRecentlyClosed(): Promise<Session[]> {
  return new Promise((resolve) =>
    chrome.sessions.getRecentlyClosed({ maxResults: 15 }, (sessions) => {
      const tabs = sessions.filter((a) => !!a.tab);
      resolve(tabs);
    })
  );
}

export function getDevices(): Promise<Device[]> {
  return new Promise((resolve) =>
    chrome.sessions.getDevices({ maxResults: 15 }, resolve)
  );
}
