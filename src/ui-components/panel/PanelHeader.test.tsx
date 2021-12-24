import { render } from '@testing-library/react';
import React from 'react';
import { PanelHeader } from '.';

describe('PanelHeader', () => {
  test('renders title', () => {
    const props = {
      title: 'text',
      editable: false,
      onTitleChanged: jest.fn(),
    };

    const { getByText } = render(
      <PanelHeader {...props}>
        <div>child text</div>
      </PanelHeader>
    );

    expect(getByText(props.title)).toBeVisible();
  });

  test('renders children', () => {
    const props = {
      title: 'text',
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
