import React from 'react';
import { render } from '@testing-library/react';
import { PanelHeader } from '.';

describe('PanelHeader', () => {
  test('renders title', () => {
    const props = {
      text: 'text',
      editable: false,
      onTitleChanged: jest.fn(),
    };

    const { getByText } = render(
      <PanelHeader {...props}>
        <div>child text</div>
      </PanelHeader>
    );

    expect(getByText(props.text)).toBeVisible();
  });

  test('renders children', () => {
    const props = {
      text: 'text',
      editable: false,
      onTitleChanged: jest.fn(),
    };

    const { getByText } = render(
      <PanelHeader {...props}>
        <div>child text</div>
      </PanelHeader>
    );

    expect(getByText('child text')).toBeVisible();
  });
});
