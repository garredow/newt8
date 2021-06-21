import { render, screen } from '@testing-library/react';
import React from 'react';
import { MdMenu } from 'react-icons/md';
import { ButtonKind } from '../../enums/buttonKind';
import { ButtonType } from '../../enums/buttonType';
import { Button } from './Button';
import { IconButton } from './IconButton';

describe('CardHeader', () => {
  test('defaults to secondary button', () => {
    const props = {};
    const { getByTestId } = render(
      <IconButton {...props}>
        <MdMenu data-testid="icon" />
      </IconButton>
    );

    expect(getByTestId('icon')).toHaveClass('secondary');
    expect(getByTestId('icon')).not.toHaveClass('panel');
    expect(getByTestId('icon')).not.toHaveClass('card');
  });

  test('is primary button', () => {
    const props = { type: ButtonType.Primary };
    const { getByTestId } = render(
      <IconButton {...props}>
        <MdMenu data-testid="icon" />
      </IconButton>
    );

    expect(getByTestId('icon')).toHaveClass('primary');
  });

  test('is secondary button', () => {
    const props = { type: ButtonType.Secondary };
    const { getByTestId } = render(
      <IconButton {...props}>
        <MdMenu data-testid="icon" />
      </IconButton>
    );

    expect(getByTestId('icon')).toHaveClass('secondary');
  });

  test('is warning button', () => {
    const props = { type: ButtonType.Warning };
    const { getByTestId } = render(
      <IconButton {...props}>
        <MdMenu data-testid="icon" />
      </IconButton>
    );

    expect(getByTestId('icon')).toHaveClass('warning');
  });

  test('is danger button', () => {
    const props = { type: ButtonType.Danger };
    const { getByTestId } = render(
      <IconButton {...props}>
        <MdMenu data-testid="icon" />
      </IconButton>
    );

    expect(getByTestId('icon')).toHaveClass('danger');
  });

  test('is panel button', () => {
    const props = { kind: ButtonKind.Panel };
    const { getByTestId } = render(
      <IconButton {...props}>
        <MdMenu data-testid="icon" />
      </IconButton>
    );

    expect(getByTestId('icon')).toHaveClass('panel');
  });

  test('is panel primary button', () => {
    const props = {
      kind: ButtonKind.Panel,
      type: ButtonType.Primary,
    };
    const { getByTestId } = render(
      <IconButton {...props}>
        <MdMenu data-testid="icon" />
      </IconButton>
    );

    expect(getByTestId('icon')).toHaveClass('panel');
  });

  test('is card button', () => {
    const props = { kind: ButtonKind.Card };
    const { getByTestId } = render(
      <IconButton {...props}>
        <MdMenu data-testid="icon" />
      </IconButton>
    );

    expect(getByTestId('icon')).toHaveClass('card');
  });

  test('is card primary button', () => {
    const props = {
      kind: ButtonKind.Card,
      type: ButtonType.Primary,
    };
    const { getByTestId } = render(
      <IconButton {...props}>
        <MdMenu data-testid="icon" />
      </IconButton>
    );

    expect(getByTestId('icon')).toHaveClass('card');
  });
});
