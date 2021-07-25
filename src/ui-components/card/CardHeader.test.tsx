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
  test('renders title', () => {
    const text = 'some text';
    const { getByText } = render(<CardHeader text={text} />);

    expect(getByText(text)).toBeVisible();
  });
});
