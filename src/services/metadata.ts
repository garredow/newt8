import { Tab } from '../models/Browser';
import { TabMetadata } from '../models/TabMetadata';
import storage from '../utilities/storage';

export type MetadataMap = {
  [index: number]: TabMetadata;
};

export async function getMetadata(): Promise<MetadataMap> {
  const metadata = await storage.getItem<TabMetadata[]>('tabs');
  const map = metadata.reduce((acc, data) => {
    acc[data.id] = data;
    return acc;
  }, {} as MetadataMap);

  return map;
}

export function saveMetadata(metadata: TabMetadata[]) {
  return new Promise<void>((resolve) => {
    chrome.storage.local.set({ tabs: metadata }, resolve);
  });
}

export async function getMetadataForTabs(
  tabs: chrome.tabs.Tab[]
): Promise<Tab[]> {
  const metadata = await getMetadata();
  let result = tabs.map((tab) => {
    const meta = metadata[tab.id!];
    return Object.assign(tab, {
      id: tab.id as number,
      createdAt: meta?.createdAt || new Date().toISOString(),
      accessedAt: meta?.accessedAt || new Date().toISOString(),
    });
  });

  return result;
}
