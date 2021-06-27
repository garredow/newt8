import { moveArrayItem } from './moveArrayItem';

describe('moveArrayItem', () => {
  const cases = [
    {
      before: [1, 2, 3, 4, 5],
      from: 0,
      to: 1,
      after: [2, 1, 3, 4, 5],
    },
    {
      before: [1, 2, 3, 4, 5],
      from: 2,
      to: 2,
      after: [1, 2, 3, 4, 5],
    },
    {
      before: [1, 2, 3, 4, 5],
      from: 4,
      to: 2,
      after: [1, 2, 5, 3, 4],
    },
    {
      before: [1, 2, 3, 4, 5],
      from: -99,
      to: 99,
      after: [2, 3, 4, 5, 1],
    },
    {
      before: [1, 2, 3, 4, 5],
      from: 99,
      to: -99,
      after: [5, 1, 2, 3, 4],
    },
  ];

  test.each(cases)(
    'reorders array correctly',
    ({ before, from, to, after }) => {
      const result = moveArrayItem(before, from, to);
      expect(result).toEqual(after);
    }
  );
});
