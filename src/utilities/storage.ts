export const STORAGE_KEY = {
  SETTINGS: 'settings',
};

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

const storage = { getItem, setItem };
export default storage;
