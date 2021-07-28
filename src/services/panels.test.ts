import { PanelKind } from '../enums/panelKind';
import { getPages, getPanelConfig, getPanelConfigs } from './panels';
import storage from '../utilities/storage';

jest.mock('../utilities/storage', () => ({
  getItem: jest.fn(),
  StorageKey: {},
}));

describe('panels service', () => {
  test('getPanelConfig returns a config', () => {
    const result = getPanelConfig(PanelKind.Bookmarks);
    expect(result.name).toEqual('Bookmarks');
  });

  test('getPanelConfigs returns all configs', () => {
    const result = getPanelConfigs(true);
    expect(result.some((a) => a.kind === PanelKind.New)).toEqual(true);
  });

  test('getPanelConfigs returns all configs except meta panels', () => {
    const result = getPanelConfigs();
    expect(result.some((a) => a.kind === PanelKind.New)).toEqual(false);
  });
});
