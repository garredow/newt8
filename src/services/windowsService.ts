import { ChromeTab } from '../models/ChromeTab';
import { ChromeWindow } from '../models/ChromeWindow';
import { getAllWindows, getCurrentWindow } from './chromeService';
import { getMetadata } from './tabsService';

export async function getWindows(
  excludeCurrentWindow = true
): Promise<ChromeWindow[]> {
  const metadata = await getMetadata();
  const metadataMap = metadata.reduce((acc: any, data) => {
    acc[data.id] = data;
    return acc;
  }, {});

  let windows = await getAllWindows();

  if (excludeCurrentWindow) {
    const currentWindow = await getCurrentWindow();
    windows = windows.filter((a) => a.id !== currentWindow.id);
  }

  const result = windows.map((window) => {
    window.tabs = window.tabs?.map((rawTab) => {
      const meta = metadataMap[rawTab.id as number];
      return Object.assign(rawTab, {
        createdAt: meta.createdAt || new Date().toISOString(),
        updatedAt: meta.updatedAt || new Date().toISOString(),
        accessedAt: meta.accessedAt || new Date().toISOString(),
      }) as ChromeTab;
    });

    return window;
  });

  return result;
}
