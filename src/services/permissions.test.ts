import { PanelKind } from '../enums/panelKind';
import {
  getAllPermissions,
  Permission,
  removePermissions,
  requestPermissions,
  verifyPermissions,
  verifyPermissionsForPanel,
} from './permissions';

jest.mock('./panels', () => ({
  getPanelConfig: () => ({ permissions: ['bookmarks', 'chrome://favicon/*'] }),
}));

describe('permissions service', () => {
  describe('getAllPermissions', () => {
    test('returns permissions', async () => {
      const spy = jest
        .spyOn(chrome.permissions, 'getAll')
        .mockImplementation((callback) =>
          callback({
            permissions: ['one', 'two'],
            origins: ['three'],
          })
        );
      const result = await getAllPermissions();

      expect(result.length).toEqual(3);
      expect(result[0]).toEqual('one');
      expect(result[1]).toEqual('two');
      expect(result[2]).toEqual('three');

      spy.mockRestore();
    });

    test('returns an empty array', async () => {
      const spy = jest
        .spyOn(chrome.permissions, 'getAll')
        .mockImplementation((callback) => callback({}));
      const result = await getAllPermissions();

      expect(result).toEqual([]);

      spy.mockRestore();
    });
  });

  describe('verifyPermissions', () => {
    test('returns missing permissions', async () => {
      const spy = jest
        .spyOn(chrome.permissions, 'getAll')
        .mockImplementation((callback) =>
          callback({
            permissions: [Permission.Bookmarks, Permission.FavIcon],
          })
        );
      const result = await verifyPermissions([
        Permission.Bookmarks,
        Permission.FavIcon,
        Permission.Sessions,
      ]);

      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(Permission.Sessions);

      spy.mockRestore();
    });
  });

  describe('verifyPermissionsForPanel', () => {
    test('returns permissions', async () => {
      const spy = jest
        .spyOn(chrome.permissions, 'getAll')
        .mockImplementation((callback) =>
          callback({
            permissions: [Permission.Bookmarks, Permission.FavIcon],
          })
        );
      const result = await verifyPermissionsForPanel(PanelKind.Bookmarks);

      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(Permission.Bookmarks);
      expect(result[1]).toEqual(Permission.FavIcon);

      spy.mockRestore();
    });
  });

  describe('requestPermissions', () => {
    test('returns true', async () => {
      const spy = jest
        .spyOn(chrome.permissions, 'request')
        .mockImplementation((data, callback) => callback!(true));
      const result = await requestPermissions([
        Permission.Bookmarks,
        Permission.FavIcon,
      ]);

      expect(result).toEqual(true);

      spy.mockRestore();
    });
  });

  describe('removePermissions', () => {
    test('returns missing permissions', async () => {
      const spy = jest
        .spyOn(chrome.permissions, 'remove')
        .mockImplementation((data, callback) => callback!(true));
      const result = await removePermissions([
        Permission.Bookmarks,
        Permission.FavIcon,
      ]);

      expect(result).toEqual(true);

      spy.mockRestore();
    });
  });
});
