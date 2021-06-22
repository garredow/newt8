import { ChromeWindow } from '../models/ChromeWindow';

export function getAllTabs(): Promise<chrome.tabs.Tab[]> {
  return new Promise((resolve) => {
    chrome.tabs.query({}, (tabs) => resolve(tabs));
  });
}

export function getCurrentTab(): Promise<chrome.tabs.Tab> {
  return new Promise((resolve) => {
    chrome.tabs.getCurrent((tab) => resolve(tab!));
  });
}

export function getCurrentWindow(): Promise<ChromeWindow> {
  return new Promise((resolve) => {
    chrome.windows.getCurrent({ windowTypes: ['normal'] }, (window) =>
      resolve(window as ChromeWindow)
    );
  });
}

export function getAllWindows(): Promise<ChromeWindow[]> {
  return new Promise((resolve) => {
    chrome.windows.getAll(
      { populate: true, windowTypes: ['normal'] },
      (windows) => resolve(windows as ChromeWindow[])
    );
  });
}

export function getBookmarks(
  folderId: string
): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
  return new Promise(async (resolve) => {
    chrome.bookmarks.getSubTree(folderId, (subTree) => {
      const folders = subTree[0].children || [];
      resolve(folders);
    });
  });
}

export function getAllBookmarks(): Promise<
  chrome.bookmarks.BookmarkTreeNode[]
> {
  return new Promise(async (resolve) => {
    chrome.bookmarks.getTree((tree) => resolve(tree[0].children || []));
  });
}

export function getRecentBookmarks(): Promise<
  chrome.bookmarks.BookmarkTreeNode[]
> {
  return new Promise(async (resolve) => {
    chrome.bookmarks.getRecent(20, resolve);
  });
}

export function getTopSites(): Promise<chrome.topSites.MostVisitedURL[]> {
  return new Promise(async (resolve) => {
    chrome.topSites.get(resolve);
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
