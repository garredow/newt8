import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ConfirmDialog } from './ConfirmDialog';

describe('PanelContent', () => {
  test('renders defaults', () => {
    const props = {
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
    };

    const { getByText } = render(<ConfirmDialog {...props} />);

    expect(getByText('Confirm')).toBeVisible();
    expect(getByText('Are you sure you want to do this?')).toBeVisible();
  });

  test('renders title and message', () => {
    const props = {
      title: 'title',
      message: 'message',
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
    };

    const { getByText } = render(<ConfirmDialog {...props} />);

    expect(getByText(props.title)).toBeVisible();
    expect(getByText(props.message)).toBeVisible();
  });

  test('renders danger button', () => {
    const props = {
      danger: true,
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
    };

    const { getByText } = render(<ConfirmDialog {...props} />);

    expect(getByText('Yes')).toHaveClass('danger');
  });

  test('handles cancel click', () => {
    const props = {
      title: 'title',
      message: 'message',
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
    };

    const { getByText } = render(<ConfirmDialog {...props} />);
    fireEvent.click(getByText('Cancel'));

    expect(props.onCancel).toBeCalledTimes(1);
    expect(props.onConfirm).toBeCalledTimes(0);
  });

  test('handles confirm click', () => {
    const props = {
      title: 'title',
      message: 'message',
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
    };

    const { getByText } = render(<ConfirmDialog {...props} />);
    fireEvent.click(getByText('Yes'));

    expect(props.onCancel).toBeCalledTimes(0);
    expect(props.onConfirm).toBeCalledTimes(1);
  });
});
