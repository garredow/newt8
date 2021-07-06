import { cloneDeep } from 'lodash';
import { PanelType } from '../enums/panelType';
import { Panel } from '../models/Panel';
import { getItem, StorageKey } from '../utilities/storage';
import { Permission, PermissionDetail } from './permissions';

export type PanelConfigMap = {
  [key in PanelType]: PanelConfig;
};

export type PanelOptions = {
  title: string;
  width: number;
  columns: number;
};

export type PanelConfig = {
  id: string;
  kind: PanelType;
  name: string;
  description: string;
  permissions: PermissionDetail[];
  defaultOptions: {
    [key: string]: string | number | boolean;
  };
  options: {
    [key: string]: string | number | boolean;
  };
};

const panelConfigs: PanelConfigMap = {
  [PanelType.Bookmarks]: {
    id: '',
    name: 'Bookmarks',
    kind: PanelType.Bookmarks,
    description:
      'Choose a folder in your bookmarks and a card will be created for each sub folder, which will list each site inside of it.',
    permissions: [
      { key: Permission.Bookmarks, reason: 'Access list of bookmarks.' },
      {
        key: Permission.Tabs,
        reason: 'Open sites in current tab and create new tabs.',
      },
      {
        key: Permission.FavIcon,
        reason: 'Display a high quality icon for each site.',
      },
    ],
    defaultOptions: {
      title: 'Bookmarks',
      columns: 0,
      width: 3,
    },
    options: {},
  },
  [PanelType.Devices]: {
    id: '',
    name: 'Devices',
    kind: PanelType.Devices,
    description:
      'A card for each browser window open on any other devices signed into your Chrome account.',
    permissions: [
      { key: Permission.Sessions, reason: 'Access list of devices.' },
      {
        key: Permission.Tabs,
        reason: 'Open sites in current tab and create new tabs.',
      },
      {
        key: Permission.FavIcon,
        reason: 'Display a high quality icon for each site.',
      },
    ],
    defaultOptions: {
      title: 'Devices',
      columns: 1,
      width: 3,
    },
    options: {},
  },
  [PanelType.NewBookmarks]: {
    id: '',
    name: 'New Bookmarks',
    kind: PanelType.NewBookmarks,
    description: 'A list of your 20 most recently added bookmarks.',
    permissions: [
      { key: Permission.Bookmarks, reason: 'Access list of bookmarks.' },
      {
        key: Permission.Tabs,
        reason: 'Open sites in current tab and create new tabs.',
      },
      {
        key: Permission.FavIcon,
        reason: 'Display a high quality icon for each site.',
      },
    ],
    defaultOptions: {
      title: 'New Bookmarks',
      columns: 1,
      width: 3,
    },
    options: {},
  },
  [PanelType.RecentTabs]: {
    id: '',
    name: 'Recent Tabs',
    kind: PanelType.RecentTabs,
    description:
      'A list of your tabs in the order in which you have accessed them, starting with the latest.',
    permissions: [
      {
        key: Permission.Tabs,
        reason: 'Open sites in current tab and create new tabs.',
      },
      {
        key: Permission.FavIcon,
        reason: 'Display a high quality icon for each site.',
      },
    ],
    defaultOptions: {
      title: 'Recent Tabs',
      columns: 1,
      width: 3,
    },
    options: {},
  },
  [PanelType.RecentlyClosed]: {
    id: '',
    name: 'Recently Closed',
    kind: PanelType.RecentlyClosed,
    description:
      "A list of tabs you've recently closed. This allows you to easily find and reopen something you may have closed by accident.",
    permissions: [
      {
        key: Permission.Sessions,
        reason: 'Access list of recently closed tabs.',
      },
      {
        key: Permission.Tabs,
        reason: 'Open sites in current tab and create new tabs.',
      },
      {
        key: Permission.FavIcon,
        reason: 'Display a high quality icon for each site.',
      },
    ],
    defaultOptions: {
      title: 'Recently Closed',
      columns: 1,
      width: 3,
    },
    options: {},
  },
  [PanelType.TopSites]: {
    id: '',
    name: 'Top Sites',
    kind: PanelType.TopSites,
    description:
      'Just like the standard Chrome new tab page, this shows your 10 most visited sites.',
    permissions: [
      { key: Permission.TopSites, reason: 'Access list of sites.' },
      {
        key: Permission.Tabs,
        reason: 'Open sites in current tab and create new tabs.',
      },
      {
        key: Permission.FavIcon,
        reason: 'Display a high quality icon for each site.',
      },
    ],
    defaultOptions: {
      title: 'Top Sites',
      columns: 1,
      width: 3,
    },
    options: {},
  },
  [PanelType.Windows]: {
    id: '',
    name: 'Windows',
    kind: PanelType.Windows,
    description:
      "A card for each open browser window on your computer, excluding the window you're currently looking at. Clicking a site will focus that tab and window.",
    permissions: [
      {
        key: Permission.Tabs,
        reason: 'Open sites in current tab and create new tabs.',
      },
      {
        key: Permission.FavIcon,
        reason: 'Display a high quality icon for each site.',
      },
    ],
    defaultOptions: {
      title: 'Windows',
      columns: 1,
      width: 3,
      showTabAccessedTime: false,
    },
    options: {},
  },
  [PanelType.Empty]: {
    id: '',
    name: 'Empty',
    kind: PanelType.Empty,
    description:
      'Just want some extra whitespace? Throw one (or more) of these in there.',
    permissions: [],
    defaultOptions: {
      title: '',
      columns: 1,
      width: 3,
    },
    options: {},
  },
  [PanelType.New]: {
    id: '',
    name: 'New',
    kind: PanelType.New,
    description:
      'A brand new panel where you can choose what you want displayed.',
    permissions: [],
    defaultOptions: {},
    options: {},
  },
};

type PanelNameMap = {
  [key in PanelType]: string;
};
export const panelNameMap = Object.values(panelConfigs).reduce((acc, val) => {
  acc[val.kind] = val.name;
  return acc;
}, {} as PanelNameMap);

export function getPanelConfig(panel: PanelType): PanelConfig {
  return cloneDeep(panelConfigs[panel]);
}

export function getPanelConfigs(includeMetaPanels = false): PanelConfig[] {
  let result = Object.values(panelConfigs);

  if (!includeMetaPanels) {
    result = result.filter((a) => a.kind !== PanelType.New);
  }

  return result;
}

export type Page = {
  id: string;
  name: string;
  isActive: boolean;
  panels: Panel[];
};

export async function getPages(): Promise<Page[]> {
  const pages = await getItem<Page[]>(StorageKey.Pages);
  return pages || [];
}
