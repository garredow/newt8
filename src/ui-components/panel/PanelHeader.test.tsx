import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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

  test('sets title as editable', () => {
    const props = {
      text: 'text',
      editable: true,
      onTitleChanged: jest.fn(),
    };

    const { getByText } = render(
      <PanelHeader {...props}>
        <div>child text</div>
      </PanelHeader>
    );

    expect(getByText(props.text)).toHaveAttribute('contentEditable', 'true');
  });

  test('edits a title', () => {
    const props = {
      text: 'text',
      editable: true,
      onTitleChanged: jest.fn(),
    };

    const { getByText } = render(
      <PanelHeader {...props}>
        <div>child text</div>
      </PanelHeader>
    );

    const heading = getByText(props.text);
    heading.focus();
    fireEvent.keyDown(heading, { key: 'Enter' });

    expect(props.onTitleChanged.mock.calls.length).toEqual(1);
  });

  test('only submits new title on enter', () => {
    const props = {
      text: 'text',
      editable: true,
      onTitleChanged: jest.fn(),
    };

    const { getByText } = render(
      <PanelHeader {...props}>
        <div>child text</div>
      </PanelHeader>
    );

    const heading = getByText(props.text);
    heading.focus();
    fireEvent.keyDown(heading, { key: 't' });
    fireEvent.keyDown(heading, { key: 'e' });
    fireEvent.keyDown(heading, { key: 's' });
    fireEvent.keyDown(heading, { key: 't' });
    fireEvent.keyDown(heading, { key: 'Enter' });

    expect(props.onTitleChanged.mock.calls.length).toEqual(1);
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
