import { ChromeWindow } from '../models/ChromeWindow';

export function getAllTabs(): Promise<chrome.tabs.Tab[]> {
  return new Promise((resolve) => {
    chrome.tabs.query({}, (tabs) => resolve(tabs));
  });
}

export function getCurrentTab(): Promise<chrome.tabs.Tab> {
  return new Promise((resolve) => {
    chrome.tabs.getCurrent((tab) => resolve(tab));
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

export function getBookmarks(): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
  return new Promise(async (resolve) => {
    const newtfolderId = await getNewtFolderId();

    chrome.bookmarks.getSubTree(newtfolderId, (subTree) => {
      const folders = subTree[0].children;
      resolve(folders);
    });
  });
}

// export function openInCurrentTab(url: string) {
//   chrome.tabs.update({ url });
// }

// export function openInNewTab(url: string, active = true) {
//   chrome.tabs.create({ url, active });
// }

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

export async function getItem<T>(key: string): Promise<T> {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => resolve(result[key]));
  });
}

export async function setItem<T>(key: string, data: T) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: data }, resolve);
  });
}

export function getNewtFolderId(): Promise<string> {
  return new Promise((resolve) => {
    chrome.bookmarks.search({ title: 'NewtData' }, (results) => {
      if (results[0]) {
        return resolve(results[0].id);
      }

      chrome.bookmarks.create({ title: 'NewtData' }, (createdBookmark) =>
        resolve(createdBookmark.id)
      );
    });
  });
}
