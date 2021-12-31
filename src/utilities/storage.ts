export enum StorageKey {
  Settings = 'settings',
  Panels = 'panels',
  Pages = 'pages',
  Themes = 'themes',
  AzureDevOps = 'azureDevOps',
}

export async function getItem<T>(key: string): Promise<T | undefined> {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => resolve(result[key]));
  });
}

export async function setItem<T>(key: string, data: T): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: data }, resolve);
  });
}

const storage = { getItem, setItem };
export default storage;
