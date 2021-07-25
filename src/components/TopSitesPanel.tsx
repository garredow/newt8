import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/list/SiteRow';
import { getTopSites, openUrl } from '../services/browser';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig } from '../services/panels';
import { PanelKind } from '../enums/panelKind';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import { PanelSettings } from '../ui-components/panel/PanelContext';

type TopSitesPanelOptions = PanelSettings;

type TopSitesPanelProps = ComponentBase &
  DraggablePanelProps & {
    options: TopSitesPanelOptions;
    onOptionsChanged: (options: TopSitesPanelOptions) => void;
    onDeletePanel: () => void;
  };

export function TopSitesPanel(props: TopSitesPanelProps) {
  const [sites, setSites] = useState<chrome.topSites.MostVisitedURL[]>([]);

  const options: TopSitesPanelOptions = useMemo(
    () =>
      Object.assign(
        getPanelConfig(PanelKind.TopSites).defaultOptions,
        props.options
      ),
    [props.options]
  );

  useEffect(() => {
    getTopSites().then((res) => {
      setSites(res);
    });
  }, []);

  return (
    <Panel
      panelId={props.panelId}
      panelIndex={props.panelIndex}
      options={options}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
    >
      <PanelContent>
        <Card>
          {sites.map((site) => (
            <SiteRow
              key={site.url}
              primaryText={site.title}
              url={site.url}
              secondaryText={site.url}
              onClick={openUrl}
            />
          ))}
        </Card>
      </PanelContent>
    </Panel>
  );
}
