import { PanelType } from '../enums/panelType';

export enum Permission {
  Bookmarks = 'bookmarks',
  Tabs = 'tabs',
  Sessions = 'sessions',
  TopSites = 'topSites',
  FavIcon = 'chrome://favicon/*',
}

export const permissionNameMap = {
  [Permission.Bookmarks]: 'Bookmarks',
  [Permission.Tabs]: 'Tabs',
  [Permission.Sessions]: 'Sessions',
  [Permission.TopSites]: 'Top Sites',
  [Permission.FavIcon]: 'FavIcon',
};

export type PermissionDetail = {
  key: Permission;
  reason: string;
};

export type PanelPermissions = {
  [key in PanelType]: PermissionDetail[];
};

const permissionsMap: PanelPermissions = {
  [PanelType.Bookmarks]: [
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
  [PanelType.RecentTabs]: [
    {
      key: Permission.Tabs,
      reason: 'Open sites in current tab and create new tabs.',
    },
    {
      key: Permission.FavIcon,
      reason: 'Display a high quality icon for each site.',
    },
  ],
  [PanelType.Windows]: [
    {
      key: Permission.Tabs,
      reason: 'Open sites in current tab and create new tabs.',
    },
    {
      key: Permission.FavIcon,
      reason: 'Display a high quality icon for each site.',
    },
  ],
  [PanelType.RecentlyClosed]: [
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
  [PanelType.Devices]: [
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
  [PanelType.New]: [],
};

export function getAllPermissions(): Promise<Permission[]> {
  return new Promise((resolve) =>
    chrome.permissions.getAll((res) => {
      const all = [];
      if (res.permissions) all.push(...res.permissions);
      if (res.origins) all.push(...res.origins);
      resolve(all as Permission[]);
    })
  );
}

export async function verifyPermissions(
  permissions: Permission[]
): Promise<Permission[]> {
  const existing = await getAllPermissions();
  const missing = permissions.filter((a) => !existing.includes(a));

  return missing;
}

export async function verifyPermissionsForPanel(
  panel: PanelType
): Promise<PermissionDetail[]> {
  const existing = await getAllPermissions();
  const missing = permissionsMap[panel].filter(
    (a) => !existing.includes(a.key)
  );

  return missing;
}

export function requestPermissions(
  permissions: Permission[]
): Promise<boolean> {
  const data: any = {
    permissions: [],
    origins: [],
  };
  permissions.forEach((a) =>
    a.includes('://') ? data.origins.push(a) : data.permissions.push(a)
  );
  return new Promise((resolve) =>
    chrome.permissions.request(data, (success) => {
      resolve(success);
    })
  );
}

export function removePermissions(permissions: Permission[]): Promise<boolean> {
  const data: any = {
    permissions: [],
    origins: [],
  };
  permissions.forEach((a) =>
    a.includes('://') ? data.origins.push(a) : data.permissions.push(a)
  );
  return new Promise((resolve) => chrome.permissions.remove(data, resolve));
}
