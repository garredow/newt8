import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ControlType } from '../../enums/controlType';
import { Button } from './Button';

describe('Button', () => {
  test('renders text', () => {
    const props = { text: 'button text' };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toBeVisible();
  });

  test('handles click', () => {
    const props = { text: 'button text', onClick: jest.fn() };
    const { getByText } = render(<Button {...props} />);

    fireEvent.click(getByText(props.text));

    expect(props.onClick).toBeCalledTimes(1);
  });

  test('defaults to secondary button', () => {
    const props = { text: 'button text' };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('secondary');
    expect(getByText(props.text)).not.toHaveClass('panel');
    expect(getByText(props.text)).not.toHaveClass('card');
  });

  test('is primary button', () => {
    const props = { text: 'button text', type: ControlType.Primary };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('primary');
  });

  test('is secondary button', () => {
    const props = { text: 'button text', type: ControlType.Secondary };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('secondary');
  });

  test('is warning button', () => {
    const props = { text: 'button text', type: ControlType.Warning };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('warning');
  });

  test('is danger button', () => {
    const props = { text: 'button text', type: ControlType.Danger };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('danger');
  });

  test('is full width', () => {
    const props = { text: 'button text', fullWidth: true };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('fullWidth');
  });

  test('requires one click when clickToConfirm is false', async () => {
    const props = {
      text: 'button text',
      clickToConfirm: false,
      onClick: jest.fn(),
    };
    const { getByText } = render(<Button {...props} />);

    fireEvent.click(getByText(props.text));

    expect(props.onClick).toBeCalledTimes(1);
  });

  test('requires two clicks when clickToConfirm is true', async () => {
    const props = {
      text: 'button text',
      confirmText: 'confirm text',
      clickToConfirm: true,
      onClick: jest.fn(),
    };
    const { getByText } = render(<Button {...props} />);

    fireEvent.click(getByText(props.text));
    fireEvent.click(getByText(props.confirmText));

    expect(props.onClick).toBeCalledTimes(1);
  });

  test('resets confirm text after two seconds', async () => {
    const props = {
      text: 'button text',
      confirmText: 'confirm text',
      clickToConfirm: true,
      onClick: jest.fn(),
    };
    const { getByText, findByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toBeVisible();
    fireEvent.click(getByText(props.text));
    expect(getByText(props.confirmText)).toBeVisible();
    const text = await findByText(props.text, {}, { timeout: 2500 });
    expect(text).toBeVisible();
  });
});
