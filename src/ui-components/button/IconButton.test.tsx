import { render } from '@testing-library/react';
import React from 'react';
import { MdMenu } from 'react-icons/md';
import { ButtonKind } from '../../enums/buttonKind';
import { ButtonType } from '../../enums/buttonType';
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
      type: ButtonType.Primary,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('primary');
  });

  test('is secondary button', () => {
    const props = {
      type: ButtonType.Secondary,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('secondary');
  });

  test('is warning button', () => {
    const props = {
      type: ButtonType.Warning,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('warning');
  });

  test('is danger button', () => {
    const props = {
      type: ButtonType.Danger,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('danger');
  });

  test('is panel button', () => {
    const props = {
      kind: ButtonKind.Panel,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('panel');
  });

  test('is panel primary button', () => {
    const props = {
      kind: ButtonKind.Panel,
      type: ButtonType.Primary,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('panel');
    expect(getByTestId('icon')).toHaveClass('primary');
  });

  test('is card button', () => {
    const props = {
      kind: ButtonKind.Card,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('card');
  });

  test('is card primary button', () => {
    const props = {
      kind: ButtonKind.Card,
      type: ButtonType.Primary,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('card');
    expect(getByTestId('icon')).toHaveClass('primary');
  });

  test('is sidebar button', () => {
    const props = {
      kind: ButtonKind.SideBar,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('sidebar');
  });

  test('is sidebar primary button', () => {
    const props = {
      kind: ButtonKind.SideBar,
      type: ButtonType.Primary,
      icon: <MdMenu data-testid="icon" />,
      title: 'test',
    };
    const { getByTestId } = render(<IconButton {...props} />);

    expect(getByTestId('icon')).toHaveClass('sidebar');
    expect(getByTestId('icon')).toHaveClass('primary');
  });
});
