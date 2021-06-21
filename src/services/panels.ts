import { cloneDeep } from 'lodash';
import { PanelType } from '../enums/panelType';
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
  [PanelType.RecentTabs]: {
    id: '',
    name: 'Recent Tabs',
    kind: PanelType.RecentTabs,
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
  [PanelType.Windows]: {
    id: '',
    name: 'Windows',
    kind: PanelType.Windows,
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
    },
    options: {},
  },
  [PanelType.Devices]: {
    id: '',
    name: 'Devices',
    kind: PanelType.Devices,
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
  [PanelType.New]: {
    id: '',
    name: 'New',
    kind: PanelType.New,
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
