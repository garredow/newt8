import React from 'react';
import { render } from '@testing-library/react';
import { PanelContent } from '.';

describe('PanelContent', () => {
  test('renders children', () => {
    const props = {};

    const { getByText } = render(
      <PanelContent {...props}>
        <div>child text</div>
      </PanelContent>
    );

    expect(getByText('child text')).toBeVisible();
  });

  test('applies column style', () => {
    const props = {
      columns: 3,
    };

    const { container } = render(<PanelContent {...props} />);

    expect(container.firstChild).toHaveStyle({
      gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
    });
  });
});
