import { render } from '@testing-library/react';
import React from 'react';
import { SiteRow } from './SiteRow';

describe('SiteRow', () => {
  test('renders favicon when http url', () => {
    const props = {
      iconUrl: 'http://',
    };

    const { getByTestId } = render(<SiteRow {...props} />);

    expect(getByTestId('favicon')).toBeVisible();
  });

  test('renders favicon when chrome://favicon url', () => {
    const props = {
      iconUrl: 'chrome://favicon/x',
    };

    const { getByTestId } = render(<SiteRow {...props} />);

    expect(getByTestId('favicon')).toBeVisible();
  });

  test('not render favicon when invalid url', () => {
    const props = {
      iconUrl: 'chrome://extension/x',
    };

    const { queryByTestId } = render(<SiteRow {...props} />);

    expect(queryByTestId('favicon')).toBeNull();
  });

  test('renders three lines of text', () => {
    const props = {
      title: 'title',
      url: 'url',
      line3: 'line3',
    };

    const { getByText } = render(<SiteRow {...props} />);

    expect(getByText(props.title)).toBeVisible();
    expect(getByText(props.url)).toBeVisible();
    expect(getByText(props.line3)).toBeVisible();
  });

  test('should not render lines 2 or 3 if no text', () => {
    const props = {
      title: 'title',
    };

    const { queryByTestId } = render(<SiteRow {...props} />);

    expect(queryByTestId('line2')).toBeNull();
    expect(queryByTestId('line3')).toBeNull();
  });
});
