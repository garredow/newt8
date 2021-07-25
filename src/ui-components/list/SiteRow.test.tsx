import { render } from '@testing-library/react';
import React from 'react';
import { SiteRow } from './SiteRow';

describe('SiteRow', () => {
  test('renders three lines of text', () => {
    const props = {
      primaryText: 'title',
      secondaryText: 'url',
      accentText: 'line3',
    };

    const { getByText } = render(<SiteRow {...props} />);

    expect(getByText(props.primaryText)).toBeVisible();
    expect(getByText(props.secondaryText)).toBeVisible();
    expect(getByText(props.accentText)).toBeVisible();
  });

  test('should not render lines 2 or 3 if no text', () => {
    const props = {
      primaryText: 'title',
    };

    const { getByText, queryByTestId } = render(<SiteRow {...props} />);

    expect(getByText(props.primaryText)).toBeVisible();
    expect(queryByTestId('secondary-text')).toBeNull();
    expect(queryByTestId('accent-text')).toBeNull();
  });
});
