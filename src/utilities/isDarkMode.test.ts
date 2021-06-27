import { isDarkMode } from './isDarkMode';

let windowSpy: any;

describe('isDarkMode', () => {
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  test('returns true', () => {
    windowSpy.mockImplementation(() => ({
      matchMedia: () => ({ matches: true }),
    }));

    const result = isDarkMode();

    expect(result).toEqual(true);
  });

  test('returns false', () => {
    windowSpy.mockImplementation(() => ({
      matchMedia: () => ({ matches: false }),
    }));

    const result = isDarkMode();

    expect(result).toEqual(false);
  });
});
