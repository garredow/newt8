import { getItem, setItem } from './storage';

describe('storage', () => {
  test('returns data', async () => {
    const spy = jest.spyOn(chrome.storage.local, 'get');
    const data = { test: true };
    spy.mockImplementation((key: any, callback: any) =>
      callback({ [key]: data })
    );

    const result = await getItem('test');
    expect(result).toEqual(data);

    spy.mockRestore();
  });

  test('sets data', async () => {
    const spy = jest.spyOn(chrome.storage.local, 'set');
    const key = 'test';
    const data = { test: true };
    spy.mockImplementation((key: any, callback: any) => callback());

    await setItem(key, data);
    expect(spy).toBeCalledTimes(1);

    expect(spy.mock.calls[0][0]).toEqual({ [key]: data });

    spy.mockRestore();
  });
});
