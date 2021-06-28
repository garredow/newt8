import { promisify } from './promisify';

describe('promisify', () => {
  test('calls callback', async () => {
    function tester(callback: any) {
      callback(true);
    }
    const result = await promisify(tester);

    expect(result).toEqual(true);
  });
});
