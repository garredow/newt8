import React, { useState, useEffect } from 'react';
import { Card } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/list/SiteRow';
import { formatDistance } from 'date-fns';
import { getTabs, SortOrder, switchToTab } from '../services/browser';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig, PanelOptions } from '../services/panels';
import { PanelKind } from '../enums/panelKind';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import { Tab } from '../models/Browser';

type RecentTabsPanelOptions = PanelOptions;

type RecentTabsPanelProps = ComponentBase &
  DraggablePanelProps & {
    options: RecentTabsPanelOptions;
    onOptionsChanged: (options: RecentTabsPanelOptions) => void;
    onDeletePanel: () => void;
  };

export function RecentTabsPanel(props: RecentTabsPanelProps) {
  const [tabs, setTabs] = useState<Tab[]>([]);

  const options: RecentTabsPanelOptions = Object.assign(
    getPanelConfig(PanelKind.RecentTabs).defaultOptions,
    props.options
  );

  useEffect(() => {
    getTabs({ sortOrder: SortOrder.MostRecent }).then((tabs) => {
      setTabs(tabs);
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
      <PanelContent columns={options.columns} display={options.display}>
        <Card display={options.display}>
          {tabs.map((tab) => (
            <SiteRow
              key={tab.id}
              title={tab.title}
              iconUrl={`chrome://favicon/size/32@1x/${tab.url}`}
              url={tab.url}
              line3={formatDistance(new Date(tab.accessedAt), new Date(), {
                addSuffix: true,
                includeSeconds: true,
              })}
              onClick={() => switchToTab(tab.windowId, tab.id)}
            />
          ))}
        </Card>
      </PanelContent>
    </Panel>
  );
}
