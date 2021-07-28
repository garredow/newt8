import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { OpenSiteOption } from '../../services/browser';
import { SiteRow, SiteRowProps } from './SiteRow';

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

  test('should open site in same tab', () => {
    const props: SiteRowProps = {
      primaryText: 'title',
      url: 'url',
      onClick: jest.fn(),
    };

    const { getByText } = render(<SiteRow {...props} />);

    fireEvent.click(getByText(props.primaryText!));

    expect(props.onClick).toBeCalledWith(OpenSiteOption.SameTab);
  });

  test('should open site in new tab', () => {
    const props: SiteRowProps = {
      primaryText: 'title',
      url: 'url',
      onClick: jest.fn(),
    };

    const { getByText } = render(<SiteRow {...props} />);

    fireEvent(
      getByText(props.primaryText!),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        metaKey: true,
        shiftKey: false,
      })
    );

    expect(props.onClick).toBeCalledWith(OpenSiteOption.NewTab);
  });

  test('should open site in new background tab', () => {
    const props: SiteRowProps = {
      primaryText: 'title',
      url: 'url',
      onClick: jest.fn(),
    };

    const { getByText } = render(<SiteRow {...props} />);

    fireEvent(
      getByText(props.primaryText!),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        metaKey: true,
        shiftKey: true,
      })
    );

    expect(props.onClick).toBeCalledWith(OpenSiteOption.NewBackgroundTab);
  });
});
