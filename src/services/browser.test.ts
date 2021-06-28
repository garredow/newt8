import { getDevices, getRecentlyClosed } from './browser';

describe('browser', () => {
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
