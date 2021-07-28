import { joinClasses } from './classes';

describe('classses', () => {
  const cases = [
    { classes: ['class1', 'class2'], result: 'class1 class2' },
    { classes: ['class1', '', 'class3'], result: 'class1 class3' },
    { classes: ['class1', 'class2', undefined], result: 'class1 class2' },
  ];
  test('joinClasses should return classes as a string', () => {});

  test.each(cases)(
    'joinClasses should return classes as a string',
    (testCase) => {
      const result = joinClasses(...testCase.classes);
      expect(result).toEqual(testCase.result);
    }
  );
});
