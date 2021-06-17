import React from 'react';
import { render } from '@testing-library/react';
import { PanelSettings } from './PanelSettings';

describe('PanelSettings', () => {
  test('renders children', () => {
    const { getByText } = render(
      <PanelSettings>
        <div>child text</div>
      </PanelSettings>
    );

    expect(getByText('child text')).toBeVisible();
  });
});
