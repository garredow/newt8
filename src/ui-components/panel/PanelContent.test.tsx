import React from 'react';
import { render } from '@testing-library/react';
import { PanelContent } from '.';

describe('PanelContent', () => {
  test('renders children', () => {
    const props = { columns: 0 };

    const { getByText } = render(
      <PanelContent {...props}>
        <div>child text</div>
      </PanelContent>
    );

    expect(getByText('child text')).toBeVisible();
  });

  test('uses context columns', () => {
    const props = {};

    const { container } = render(
      <PanelContent {...props}>
        <div>child text</div>
      </PanelContent>
    );

    expect(container.firstChild).toHaveStyle({
      gridTemplateColumns: `repeat(1, 1fr)`,
    });
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
