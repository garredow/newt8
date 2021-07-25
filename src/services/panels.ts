import { cloneDeep } from 'lodash';
import { Orientation } from '../enums/orientation';
import { PanelDisplayType } from '../enums/panelDisplayType';
import { PanelKind } from '../enums/panelKind';
import { GridLayout } from '../models/GridLayout';
import { Panel } from '../models/Panel';
import { getItem, StorageKey } from '../utilities/storage';
import { Permission, PermissionDetail } from './permissions';

export type PanelConfigMap = {
  [key in PanelKind]: PanelConfig;
};

export type PanelOptions = {
  title: string;
  columns: number;
  display: PanelDisplayType;
  orientation: Orientation;
};

export type PanelConfig = {
  id: string;
  kind: PanelKind;
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

const defaultPanelOptions: PanelOptions = {
  title: 'Panel',
  columns: 1,
  display: PanelDisplayType.Default,
  orientation: Orientation.Vertical,
};

const panelConfigs: PanelConfigMap = {
  [PanelKind.Bookmarks]: {
    id: '',
    name: 'Bookmarks',
    kind: PanelKind.Bookmarks,
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
      ...defaultPanelOptions,
      title: 'Bookmarks',
      columns: 0,
    },
    options: {},
  },
  [PanelKind.Devices]: {
    id: '',
    name: 'Devices',
    kind: PanelKind.Devices,
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
      ...defaultPanelOptions,
      title: 'Devices',
      showTabAccessedTime: false,
      showUrl: true,
    },
    options: {},
  },
  [PanelKind.NewBookmarks]: {
    id: '',
    name: 'New Bookmarks',
    kind: PanelKind.NewBookmarks,
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
      ...defaultPanelOptions,
      title: 'New Bookmarks',
    },
    options: {},
  },
  [PanelKind.RecentTabs]: {
    id: '',
    name: 'Recent Tabs',
    kind: PanelKind.RecentTabs,
    description:
      'A list of your tabs in the order in which you have accessed them, starting with the latest. After approving permissions, you may have to restart your browser to get this panel to work correctly.',
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
      ...defaultPanelOptions,
      title: 'Recent Tabs',
    },
    options: {},
  },
  [PanelKind.RecentlyClosed]: {
    id: '',
    name: 'Recently Closed',
    kind: PanelKind.RecentlyClosed,
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
      ...defaultPanelOptions,
      title: 'Recently Closed',
    },
    options: {},
  },
  [PanelKind.TopSites]: {
    id: '',
    name: 'Top Sites',
    kind: PanelKind.TopSites,
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
      ...defaultPanelOptions,
      title: 'Top Sites',
    },
    options: {},
  },
  [PanelKind.Windows]: {
    id: '',
    name: 'Windows',
    kind: PanelKind.Windows,
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
      ...defaultPanelOptions,
      title: 'Windows',
      showTabAccessedTime: false,
      showUrl: true,
    },
    options: {},
  },
  [PanelKind.Empty]: {
    id: '',
    name: 'Empty',
    kind: PanelKind.Empty,
    description:
      'Just want some extra whitespace? Throw one (or more) of these in there.',
    permissions: [],
    defaultOptions: {
      ...defaultPanelOptions,
      title: '',
    },
    options: {},
  },
  [PanelKind.New]: {
    id: '',
    name: 'New',
    kind: PanelKind.New,
    description:
      'A brand new panel where you can choose what you want displayed.',
    permissions: [],
    defaultOptions: {
      ...defaultPanelOptions,
      title: 'New Panel',
    },
    options: {},
  },
};

type PanelNameMap = {
  [key in PanelKind]: string;
};
export const panelNameMap = Object.values(panelConfigs).reduce((acc, val) => {
  acc[val.kind] = val.name;
  return acc;
}, {} as PanelNameMap);

export function getPanelConfig(panel: PanelKind): PanelConfig {
  return cloneDeep(panelConfigs[panel]);
}

export function getPanelConfigs(includeMetaPanels = false): PanelConfig[] {
  let result = Object.values(panelConfigs);

  if (!includeMetaPanels) {
    result = result.filter((a) => a.kind !== PanelKind.New);
  }

  return result;
}

export type Page = {
  id: string;
  name: string;
  isActive: boolean;
  panels: Panel[];
  grid: GridLayout;
};

export async function getPages(): Promise<Page[]> {
  const pages = await getItem<Page[]>(StorageKey.Pages);
  return pages || [];
}
