import {
  getAllBookmarks,
  getAllWindows,
  getBookmarks,
  getCurrentTab,
  getCurrentWindow,
  getDevices,
  getRecentBookmarks,
  getRecentlyClosed,
  getTabs,
  getTopSites,
  getWindows,
  openUrl,
  OpenSiteOption,
  SortOrder,
  switchToTab,
} from './browser';

jest.mock('./metadata', () => ({
  getMetadataForTabs: (tabs: any) => tabs,
}));

describe('browser', () => {
  // Tabs

  test('getTabs returns a list of tabs', async () => {
    const spy = jest
      .spyOn(chrome.tabs, 'query')
      .mockImplementation(((data: any, callback: any) =>
        callback([{ id: 1 }, { id: 2 }])) as any);

    const result = await getTabs({});

    expect(result.length).toEqual(2);
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(2);

    spy.mockRestore();
  });

  test('getTabs returns a list of sorted tabs', async () => {
    const spy = jest.spyOn(chrome.tabs, 'query').mockImplementation(((
      data: any,
      callback: any
    ) =>
      callback([
        { id: 1, accessedAt: '2021-06-28T00:00:00.000Z' },
        { id: 2, accessedAt: '2021-06-27T00:00:00.000Z' },
        { id: 3, accessedAt: '2021-06-29T00:00:00.000Z' },
        { id: 4, accessedAt: '2021-06-27T00:00:00.000Z' },
      ])) as any);

    const result = await getTabs({ sortOrder: SortOrder.MostRecent });

    expect(result.length).toEqual(4);
    expect(result[0].id).toEqual(3);
    expect(result[1].id).toEqual(1);
    expect(result[2].id).toEqual(2);
    expect(result[3].id).toEqual(4);

    spy.mockRestore();
  });

  test('getTabs returns a list of tabs with a limit', async () => {
    const spy = jest
      .spyOn(chrome.tabs, 'query')
      .mockImplementation(((data: any, callback: any) =>
        callback([
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
        ])) as any);

    const result = await getTabs({ limit: 3 });

    expect(result.length).toEqual(3);
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(2);
    expect(result[2].id).toEqual(3);

    spy.mockRestore();
  });

  test('getCurrentTab returns a tab', async () => {
    const spy = jest
      .spyOn(chrome.tabs, 'getCurrent')
      .mockImplementation(((callback: any) => callback({ id: 1 })) as any);

    const result = await getCurrentTab();

    expect(result).toBeTruthy();
    expect(result.id).toEqual(1);

    spy.mockRestore();
  });

  test('openUrl opens in new tab', async () => {
    const spy = jest.spyOn(chrome.tabs, 'create');

    openUrl('https', OpenSiteOption.NewTab);

    expect(chrome.tabs.create).toBeCalledTimes(1);
    expect(chrome.tabs.create).toBeCalledWith({ url: 'https', active: true });

    spy.mockRestore();
  });

  test('openUrl opens in new background tab', async () => {
    const spy = jest.spyOn(chrome.tabs, 'create');

    openUrl('https', OpenSiteOption.NewBackgroundTab);

    expect(chrome.tabs.create).toBeCalledTimes(1);
    expect(chrome.tabs.create).toBeCalledWith({ url: 'https', active: false });

    spy.mockRestore();
  });

  test('openUrl opens in current tab', async () => {
    const spy = jest.spyOn(chrome.tabs, 'update');

    openUrl('https');

    expect(chrome.tabs.update).toBeCalledTimes(1);
    expect(chrome.tabs.update).toBeCalledWith({ url: 'https' });

    spy.mockRestore();
  });

  test('switchToTab switches to tab then closes current tab', async () => {
    const spy = jest.spyOn(chrome.windows, 'update');
    const spy2 = jest.spyOn(chrome.tabs, 'update');
    const spy3 = jest.spyOn(window, 'close');

    switchToTab(1, 2);

    expect(chrome.windows.update).toBeCalledTimes(1);
    expect(chrome.windows.update).toBeCalledWith(1, { focused: true });
    expect(chrome.tabs.update).toBeCalledTimes(1);
    expect(chrome.tabs.update).toBeCalledWith(2, { active: true });
    expect(window.close).toBeCalledTimes(1);

    spy.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
  });

  // Windows

  test('getCurrentWindow returns a window', async () => {
    const spy = jest
      .spyOn(chrome.windows, 'getCurrent')
      .mockImplementation(((data: any, callback: any) =>
        callback({ id: 1 })) as any);

    const result = await getCurrentWindow();

    expect(result).toBeTruthy();
    expect(result.id).toEqual(1);

    spy.mockRestore();
  });

  test('getAllWindows returns windows', async () => {
    const spy = jest
      .spyOn(chrome.windows, 'getAll')
      .mockImplementation(((data: any, callback: any) =>
        callback([{ id: 1 }, { id: 2 }])) as any);

    const result = await getAllWindows();

    expect(result.length).toEqual(2);
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(2);

    spy.mockRestore();
  });

  test('getWindows returns all windows', async () => {
    const windows = [
      { id: 1, tabs: [{ id: 1 }, { id: 2 }] },
      { id: 2, tabs: [{ id: 1 }, { id: 2 }] },
      { id: 3, tabs: [{ id: 1 }, { id: 2 }] },
    ];
    const spy = jest
      .spyOn(chrome.windows, 'getAll')
      .mockImplementation(((data: any, callback: any) =>
        callback(windows)) as any);

    const spy2 = jest
      .spyOn(chrome.windows, 'getCurrent')
      .mockImplementation(((data: any, callback: any) =>
        callback({ id: 2 })) as any);

    const result = await getWindows(false);

    expect(result.length).toEqual(3);
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(2);
    expect(result[2].id).toEqual(3);

    spy.mockRestore();
    spy2.mockRestore();
  });

  test('getWindows returns windows except current', async () => {
    const windows = [
      { id: 1, tabs: [{ id: 1 }, { id: 2 }] },
      { id: 2, tabs: [{ id: 1 }, { id: 2 }] },
      { id: 3, tabs: [{ id: 1 }, { id: 2 }] },
    ];
    const spy = jest
      .spyOn(chrome.windows, 'getAll')
      .mockImplementation(((data: any, callback: any) =>
        callback(windows)) as any);

    const spy2 = jest
      .spyOn(chrome.windows, 'getCurrent')
      .mockImplementation(((data: any, callback: any) =>
        callback({ id: 2 })) as any);

    const result = await getWindows();

    expect(result.length).toEqual(2);
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(3);

    spy.mockRestore();
    spy2.mockRestore();
  });

  // Bookmarks

  test('getBookmarks returns bookmarks', async () => {
    const spy = jest
      .spyOn(chrome.bookmarks, 'getSubTree')
      .mockImplementation(((id: any, callback: any) =>
        callback([{ children: [{ id: 1 }] }])) as any);

    const result = await getBookmarks('1');

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(1);

    spy.mockRestore();
  });

  test('getBookmarks returns an empty array', async () => {
    const spy = jest
      .spyOn(chrome.bookmarks, 'getSubTree')
      .mockImplementation(((id: any, callback: any) => callback([{}])) as any);

    const result = await getBookmarks('1');

    expect(result).toEqual([]);

    spy.mockRestore();
  });

  test('getAllBookmarks returns bookmarks', async () => {
    const spy = jest
      .spyOn(chrome.bookmarks, 'getTree')
      .mockImplementation(((callback: any) =>
        callback([{ children: [{ id: 1 }] }])) as any);

    const result = await getAllBookmarks();

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(1);

    spy.mockRestore();
  });

  test('getAllBookmarks returns an empty array', async () => {
    const spy = jest
      .spyOn(chrome.bookmarks, 'getTree')
      .mockImplementation(((callback: any) => callback([{}])) as any);

    const result = await getAllBookmarks();

    expect(result).toEqual([]);

    spy.mockRestore();
  });

  test('getRecentBookmarks returns bookmarks', async () => {
    const spy = jest
      .spyOn(chrome.bookmarks, 'getRecent')
      .mockImplementation(((id: any, callback: any) =>
        callback([{ id: 1 }])) as any);

    const result = await getRecentBookmarks();

    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(1);

    spy.mockRestore();
  });

  // Top Sites

  test('getTopSites returns sites', async () => {
    const spy = jest
      .spyOn(chrome.topSites, 'get')
      .mockImplementation((callback: any) => callback([{ title: 'test' }]));
    const result = await getTopSites();

    expect(result.length).toEqual(1);
    expect(result[0].title).toEqual('test');

    spy.mockRestore();
  });

  // Sessions

  test('getRecentlyClosed returns only tabs', async () => {
    const spy = jest
      .spyOn(chrome.sessions, 'getRecentlyClosed')
      .mockImplementation(((data: any, callback: any) =>
        callback!([{ tab: { id: 1 } }, { window: {} }])) as any);
    const result = await getRecentlyClosed();

    expect(result.length).toEqual(1);
    expect(result[0].tab?.id).toEqual(1);

    spy.mockRestore();
  });

  test('getDevices returns devices', async () => {
    const spy = jest
      .spyOn(chrome.sessions, 'getDevices')
      .mockImplementation(((data: any, callback: any) =>
        callback!([{ deviceName: 1 }, { deviceName: 2 }])) as any);
    const result = await getDevices();

    expect(result.length).toEqual(2);
    expect(result[0].deviceName).toEqual(1);
    expect(result[1].deviceName).toEqual(2);

    spy.mockRestore();
  });
});
