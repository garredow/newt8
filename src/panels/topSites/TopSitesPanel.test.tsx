import { render } from '@testing-library/react';
import React from 'react';
import { Panel } from '../../models/Panel';
import * as browser from '../../services/browser';
import { TopSitesPanel, TopSitesPanelProps } from './TopSitesPanel';

jest.mock('../../services/browser');

describe('TopSitesPanel', () => {
  test('renders sites', async () => {
    const props: TopSitesPanelProps = {
      panel: { options: {} } as Panel,
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    (browser.getTopSites as any).mockResolvedValue([
      { title: 'site title', url: 'url' },
    ]);
    const { findByText } = render(<TopSitesPanel {...props} />);

    const element = await findByText('site title');
    expect(element).toBeVisible();
  });
});
