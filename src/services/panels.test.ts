import { PanelType } from '../enums/panelType';
import { getPages, getPanelConfig, getPanelConfigs } from './panels';
import storage from '../utilities/storage';

jest.mock('../utilities/storage', () => ({
  getItem: jest.fn(),
  StorageKey: {},
}));

describe('panels service', () => {
  test('getPanelConfig returns a config', () => {
    const result = getPanelConfig(PanelType.Bookmarks);
    expect(result.name).toEqual('Bookmarks');
  });

  test('getPanelConfigs returns all configs', () => {
    const result = getPanelConfigs(true);
    expect(result.some((a) => a.kind === PanelType.New)).toEqual(true);
  });

  test('getPanelConfigs returns all configs except meta panels', () => {
    const result = getPanelConfigs();
    expect(result.some((a) => a.kind === PanelType.New)).toEqual(false);
  });

  test('getPages returns pages from storage', async () => {
    (storage.getItem as any).mockImplementation(() => [1, 2, 3]);
    const result = await getPages();

    expect(result.length).toEqual(3);
  });

  test('getPages returns [] if no pages in storage', async () => {
    (storage.getItem as any).mockImplementation(() => null);
    const result = await getPages();

    expect(result).toEqual([]);
  });
});
