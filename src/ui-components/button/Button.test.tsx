import { render, screen } from '@testing-library/react';
import React from 'react';
import { ButtonKind } from '../../enums/buttonKind';
import { ButtonType } from '../../enums/buttonType';
import { Button } from './Button';

describe('CardHeader', () => {
  test('renders text', () => {
    const props = { text: 'button text' };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toBeVisible();
  });

  test('defaults to secondary button', () => {
    const props = { text: 'button text' };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('secondary');
    expect(getByText(props.text)).not.toHaveClass('panel');
    expect(getByText(props.text)).not.toHaveClass('card');
  });

  test('is primary button', () => {
    const props = { text: 'button text', type: ButtonType.Primary };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('primary');
  });

  test('is secondary button', () => {
    const props = { text: 'button text', type: ButtonType.Secondary };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('secondary');
  });

  test('is warning button', () => {
    const props = { text: 'button text', type: ButtonType.Warning };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('warning');
  });

  test('is danger button', () => {
    const props = { text: 'button text', type: ButtonType.Danger };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('danger');
  });

  test('is panel button', () => {
    const props = { text: 'button text', kind: ButtonKind.Panel };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('panel');
  });

  test('is panel primary button', () => {
    const props = {
      text: 'button text',
      kind: ButtonKind.Panel,
      type: ButtonType.Primary,
    };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('panel');
  });

  test('is card button', () => {
    const props = { text: 'button text', kind: ButtonKind.Card };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('card');
  });

  test('is card primary button', () => {
    const props = {
      text: 'button text',
      kind: ButtonKind.Card,
      type: ButtonType.Primary,
    };
    const { getByText } = render(<Button {...props} />);

    expect(getByText(props.text)).toHaveClass('card');
  });
});
