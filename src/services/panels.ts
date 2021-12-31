import { cloneDeep } from 'lodash';
import { defaultPanelSettings, PanelSettings } from '../contexts/PanelContext';
import { PanelKind } from '../enums/panelKind';
import { Permission, PermissionDetail } from './permissions';

export type PanelConfigMap = {
  [key in PanelKind]: PanelConfig;
};

export type PanelConfig = {
  id: string;
  kind: PanelKind;
  name: string;
  description: string;
  permissions: PermissionDetail[];
  defaultOptions: PanelSettings & {
    [key: string]: string | number | boolean;
  };
  options: {
    [key: string]: string | number | boolean;
  };
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
      ...defaultPanelSettings,
      fitCardsToViewport: false,
      title: 'Bookmarks',
      columns: 0,
      showSecondaryText: false,
      showAccentText: false,
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
      ...defaultPanelSettings,
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
      ...defaultPanelSettings,
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
      ...defaultPanelSettings,
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
      ...defaultPanelSettings,
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
      ...defaultPanelSettings,
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
      ...defaultPanelSettings,
      title: 'Windows',
      showTabAccessedTime: false,
      showUrl: true,
    },
    options: {},
  },
  [PanelKind.Tasks]: {
    id: '',
    name: 'Tasks',
    kind: PanelKind.Tasks,
    description: 'A place to put tasks you need to keep track of.',
    permissions: [],
    defaultOptions: {
      ...defaultPanelSettings,
      title: 'Tasks',
      dateFormat: 'relative',
      showCompleted: true,
      showDeleted: false,
    },
    options: {},
  },
  [PanelKind.AzureDevOps]: {
    id: '',
    name: 'AzureDevOps',
    kind: PanelKind.AzureDevOps,
    description: 'View ADO stuff.',
    permissions: [],
    defaultOptions: {
      ...defaultPanelSettings,
      title: 'Azure DevOps',
    },
    options: {},
  },
  [PanelKind.GitHub]: {
    id: '',
    name: 'GitHub',
    kind: PanelKind.GitHub,
    description: 'View your recent GitHub activity.',
    permissions: [],
    defaultOptions: {
      ...defaultPanelSettings,
      title: 'GitHub',
      showUserCard: true,
      showNotificationsCard: false,
      showEventsCard: true,
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
      ...defaultPanelSettings,
      fitCardsToViewport: false,
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
      ...defaultPanelSettings,
      fitCardsToViewport: false,
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
