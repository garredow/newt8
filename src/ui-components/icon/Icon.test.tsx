import { render } from '@testing-library/react';
import React from 'react';
import { MdMenu } from 'react-icons/md';
import { Icon } from '.';

describe('Icon', () => {
  test('renders text', () => {
    const props = { icon: <MdMenu data-testid="icon" /> };
    const { getByTestId } = render(<Icon {...props} />);

    expect(getByTestId('icon')).toBeVisible();
  });
});
