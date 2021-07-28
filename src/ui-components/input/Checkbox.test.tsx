import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Checkbox, CheckboxProps } from './Checkbox';

describe('Checkbox', () => {
  test('handle click', () => {
    const props: CheckboxProps = {
      'data-testid': 'checkbox',
      onChange: jest.fn(),
    };

    const { getByTestId } = render(<Checkbox {...props} />);

    fireEvent.click(getByTestId(props['data-testid']!));

    expect(props.onChange).toBeCalledTimes(1);
  });
});
