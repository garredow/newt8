import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Dialog, DialogProps } from './Dialog';

describe('Dialog', () => {
  test('has small class', () => {
    const props: DialogProps = {
      width: 'small',
      onClose: jest.fn(),
      'data-testid': 'checkbox',
    };

    const { getByTestId } = render(<Dialog {...props} />);

    expect(getByTestId(props['data-testid']!)).toHaveClass('small');
  });

  test('has medium class', () => {
    const props: DialogProps = {
      width: 'medium',
      onClose: jest.fn(),
      'data-testid': 'checkbox',
    };

    const { getByTestId } = render(<Dialog {...props} />);

    expect(getByTestId(props['data-testid']!)).toHaveClass('medium');
  });

  test('has large class', () => {
    const props: DialogProps = {
      width: 'large',
      onClose: jest.fn(),
      'data-testid': 'checkbox',
    };

    const { getByTestId } = render(<Dialog {...props} />);

    expect(getByTestId(props['data-testid']!)).toHaveClass('large');
  });

  test('handle close button click', () => {
    const props: DialogProps = {
      onClose: jest.fn(),
    };

    const { getByTestId } = render(<Dialog {...props} />);

    fireEvent.click(getByTestId('btn-close-dialog'));

    expect(props.onClose).toBeCalledTimes(1);
  });
});
