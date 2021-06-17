import React from 'react';
import { render } from '@testing-library/react';
import { SettingsRow } from './SettingsRow';

describe('SettingsRow', () => {
  test('renders label and help text', () => {
    const props = {
      label: 'label',
      helpText: 'help text',
    };

    const { getByText } = render(<SettingsRow {...props} />);

    expect(getByText(props.label)).toBeVisible();
    expect(getByText(props.helpText)).toBeVisible();
  });

  test('renders children', () => {
    const props = {
      label: 'label',
      helpText: 'help text',
    };

    const { getByText } = render(
      <SettingsRow {...props}>
        <div>child text</div>
      </SettingsRow>
    );

    expect(getByText('child text')).toBeVisible();
  });
});
