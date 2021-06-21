import { render } from '@testing-library/react';
import React from 'react';
import { CardFooter } from '.';

describe('CardFooter', () => {
  test('render children', () => {
    const { getByText } = render(
      <CardFooter>
        <div>child text</div>
      </CardFooter>
    );

    expect(getByText('child text')).toBeVisible();
  });
});
