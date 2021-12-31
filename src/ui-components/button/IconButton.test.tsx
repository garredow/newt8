import { render } from '@testing-library/react';
import React from 'react';
import { MdMenu } from 'react-icons/md';
import { ControlType } from '../../enums/controlType';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  test('renders icon', () => {
    const props = {
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toBeVisible();
  });

  test('defaults to secondary button', () => {
    const props = {
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('secondary');
    expect(getByTestId('icon')).not.toHaveClass('panel');
    expect(getByTestId('icon')).not.toHaveClass('card');
  });

  test('is primary button', () => {
    const props = {
      type: ControlType.Primary,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('primary');
  });

  test('is secondary button', () => {
    const props = {
      type: ControlType.Secondary,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('secondary');
  });

  test('is warning button', () => {
    const props = {
      type: ControlType.Warning,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('warning');
  });

  test('is danger button', () => {
    const props = {
      type: ControlType.Danger,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('danger');
  });
});
