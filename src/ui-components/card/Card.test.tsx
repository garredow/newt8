import { render } from '@testing-library/react';
import React from 'react';
import { Card } from '.';

describe('Card', () => {
  test('render children', () => {
    const { getByText } = render(
      <Card>
        <div>child text</div>
      </Card>
    );

    expect(getByText('child text')).toBeVisible();
  });
});
