import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import {
  AppSettingsContext,
  defaultSettings,
} from '../../contexts/AppSettingsContext';
import { SettingsRow } from './SettingsRow';

function renderWithContext(element: any) {
  return render(
    <AppSettingsContext.Provider
      value={{
        settings: {
          ...defaultSettings,
          showSettingHelpText: false,
        },
        setSettings: jest.fn(),
      }}
    >
      {element}
    </AppSettingsContext.Provider>
  );
}
describe('SettingsRow', () => {
  test('renders label and not help text', () => {
    const props = {
      label: 'label',
      helpText: 'help text',
    };

    const { getByText, queryByText } = renderWithContext(
      <SettingsRow {...props} />
    );

    expect(getByText(props.label)).toBeVisible();
    expect(queryByText(props.helpText)).toBeNull();
  });

  test('renders label and help text', () => {
    const props = {
      label: 'label',
      helpText: 'help text',
    };

    const { getByText } = renderWithContext(<SettingsRow {...props} />);

    fireEvent.click(getByText(props.label));

    expect(getByText(props.label)).toBeVisible();
    expect(getByText(props.helpText)).toBeVisible();
  });

  test('renders children', () => {
    const props = {
      label: 'label',
      helpText: 'help text',
    };

    const { getByText } = renderWithContext(
      <SettingsRow {...props}>
        <div>child text</div>
      </SettingsRow>
    );

    expect(getByText('child text')).toBeVisible();
  });
});
