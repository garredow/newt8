import { render } from '@testing-library/react';
import React from 'react';
import { CardHeader } from '.';

describe('CardHeader', () => {
  test('renders actions', () => {
    const { getByText } = render(
      <CardHeader actions={<div>action item</div>} />
    );

    expect(getByText('action item')).toBeVisible();
  });
  test('renders children', () => {
    const { getByText } = render(
      <CardHeader>
        <div>child text</div>
      </CardHeader>
    );

    expect(getByText('child text')).toBeVisible();
  });
});
