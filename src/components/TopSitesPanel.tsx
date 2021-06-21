import React, { useState, useEffect } from 'react';
import { Card } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/card/SiteRow';
import { getTopSites, openUrl } from '../services/chromeService';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig, PanelOptions } from '../services/panels';
import { PanelType } from '../enums/panelType';

type TopSitesPanelOptions = PanelOptions;

type TopSitesPanelProps = ComponentBase & {
  options: TopSitesPanelOptions;
  onOptionsChanged: (options: TopSitesPanelOptions) => void;
  onDeletePanel: () => void;
};

export function TopSitesPanel(props: TopSitesPanelProps) {
  const [sites, setSites] = useState<chrome.topSites.MostVisitedURL[]>([]);

  const options: TopSitesPanelOptions = Object.assign(
    getPanelConfig(PanelType.TopSites).defaultOptions,
    props.options
  );

  useEffect(() => {
    getTopSites().then((res) => {
      setSites(res);
    });
  }, []);

  return (
    <Panel
      options={options}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
    >
      <PanelContent columns={options.columns}>
        <Card>
          {sites.map((site) => (
            <SiteRow
              key={site.url}
              title={site.title}
              iconUrl={`chrome://favicon/size/32@1x/${site.url}`}
              url={site.url}
              onClick={() => openUrl(site.url as string)}
            />
          ))}
        </Card>
      </PanelContent>
    </Panel>
  );
}