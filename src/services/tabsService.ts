import { ChromeTab } from '../models/ChromeTab';
import { TabMetadata } from '../models/TabMetadata';
import { TabGroup } from '../models/TabGroup';
import { getAllTabs, getCurrentTab } from './chromeService';
import storage from '../utilities/storage';

export async function getRecentTabs(
  excludeCurrentTab = false
): Promise<ChromeTab[]> {
  const tabs = await getTabsWithMetadata(excludeCurrentTab);
  let sortedTabs = sortTabsBy(tabs, 'accessedAt');

  return sortedTabs;
}

export async function getGroupedTabs() {
  const tabs = await getTabsWithMetadata();

  const groups = tabs.reduce((acc: TabGroup[], tab) => {
    const index = acc.findIndex((a) => a.id === tab.windowId);

    if (index === -1) {
      acc.push({
        id: tab.windowId,
        title: `Window ${tab.windowId}`,
        createdAt: tab.createdAt,
        accessedAt: tab.accessedAt,
        tabs: [tab],
      });
      return acc;
    }

    const group = acc[index];
    group.createdAt =
      tab.createdAt > group.createdAt ? tab.createdAt : group.createdAt;
    group.accessedAt =
      tab.accessedAt > group.accessedAt ? tab.accessedAt : group.accessedAt;
    group.tabs.push(tab);

    return acc;
  }, []);

  return groups;
}

function sortTabsBy(tabs: ChromeTab[], sortField: string) {
  const sortedTabs = tabs.sort((a: any, b: any) => {
    if (a[sortField] < b[sortField]) return 1;
    else if (b[sortField] < a[sortField]) return -1;
    else return 0;
  });

  return sortedTabs;
}

export async function getMetadata(): Promise<TabMetadata[]> {
  const metadata = await storage.getItem<TabMetadata[]>('tabs');
  return metadata || [];
}

async function getTabsWithMetadata(
  excludeCurrentTab = false
): Promise<ChromeTab[]> {
  let rawTabs = await getAllTabs();

  if (excludeCurrentTab) {
    const currentTab = await getCurrentTab();
    rawTabs = rawTabs.filter((a) => a.id !== currentTab.id);
  }

  const metadata = await getMetadata();
  const metadataMap = metadata.reduce((acc: any, data) => {
    acc[data.id] = data;
    return acc;
  }, {});
  const tabs = rawTabs.map((rawTab) => {
    const meta = metadataMap[rawTab.id as number];
    return Object.assign(rawTab, {
      id: rawTab.id as number,
      createdAt: meta.createdAt || new Date().toISOString(),
      updatedAt: meta.updatedAt || new Date().toISOString(),
      accessedAt: meta.accessedAt || new Date().toISOString(),
    });
  });

  return tabs;
}
