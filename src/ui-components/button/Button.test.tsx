import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ControlLocation } from '../../enums/controlLocation';
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

  test('is panel button', () => {
    const props = { text: 'button text', location: ControlLocation.Panel };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('panel');
  });

  test('is panel primary button', () => {
    const props = {
      text: 'button text',
      location: ControlLocation.Panel,
      type: ControlType.Primary,
    };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('panel');
  });

  test('is card button', () => {
    const props = { text: 'button text', location: ControlLocation.Card };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('card');
  });

  test('is card primary button', () => {
    const props = {
      text: 'button text',
      location: ControlLocation.Card,
      type: ControlType.Primary,
    };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('card');
  });

  test('is full width', () => {
    const props = { text: 'button text', fullWidth: true };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('fullWidth');
  });
});
