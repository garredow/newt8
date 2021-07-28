import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CardContent, CardContentProps } from './CardContent';

describe('CardContent', () => {
  test('renders children', () => {
    const props: CardContentProps = {};
    const { getByText } = render(
      <CardContent {...props}>
        <div>child</div>
      </CardContent>
    );

    expect(getByText('child')).toBeVisible();
  });

  test('renders as full width', () => {
    const props: CardContentProps = {
      fullWidth: true,
      'data-testid': 'testid',
    };
    const { getByTestId } = render(<CardContent {...props} />);

    expect(getByTestId(props['data-testid']!)).toHaveClass('fullWidth');
  });
});
