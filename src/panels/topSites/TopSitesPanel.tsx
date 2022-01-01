import React, { useEffect, useState } from 'react';
import { PanelSettings } from '../../contexts/PanelContext';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { getTopSites, openUrl } from '../../services/browser';
import { Card, CardContent } from '../../ui-components/card';
import { SiteRow } from '../../ui-components/list';
import { Panel, PanelContent } from '../../ui-components/panel';

type TopSitesPanelOptions = PanelSettings;

export type TopSitesPanelProps = ComponentBaseProps &
  PanelBaseProps<TopSitesPanelOptions>;

export function TopSitesPanel(props: TopSitesPanelProps) {
  const [sites, setSites] = useState<chrome.topSites.MostVisitedURL[]>([]);

  useEffect(() => {
    getTopSites().then((res) => {
      setSites(res);
    });
  }, []);

  return (
    <Panel
      panel={props.panel}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
      settings={[
        {
          id: 'sites',
          title: 'Sites',
          items: [
            {
              type: 'checkbox',
              key: 'showSecondaryText',
              label: 'Show Url',
              helpText: 'Display the URL for each site.',
              testId: 'check-show-url',
            },
          ],
        },
      ]}
    >
      <PanelContent>
        <Card cardId="sites" defaultTitle="Sites">
          <CardContent>
            {sites.map((site) => (
              <SiteRow
                key={site.url}
                primaryText={site.title}
                url={site.url}
                secondaryText={site.url}
                onClick={openUrl}
              />
            ))}
          </CardContent>
        </Card>
      </PanelContent>
    </Panel>
  );
}
