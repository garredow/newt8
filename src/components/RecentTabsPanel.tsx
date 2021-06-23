import React, { useState, useEffect } from 'react';
import { ChromeTab } from '../models/ChromeTab';
import { getRecentTabs } from '../services/tabsService';
import { Card } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/card/SiteRow';
import { formatDistance } from 'date-fns';
import { switchToTab } from '../services/chromeService';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig, PanelOptions } from '../services/panels';
import { PanelType } from '../enums/panelType';
import { DraggablePanelProps } from '../models/DraggablePanelProps';

type RecentTabsPanelOptions = PanelOptions;

type RecentTabsPanelProps = ComponentBase &
  DraggablePanelProps & {
    options: RecentTabsPanelOptions;
    onOptionsChanged: (options: RecentTabsPanelOptions) => void;
    onDeletePanel: () => void;
  };

export function RecentTabsPanel(props: RecentTabsPanelProps) {
  const [tabs, setTabs] = useState<ChromeTab[]>([]);

  const options: RecentTabsPanelOptions = Object.assign(
    getPanelConfig(PanelType.RecentTabs).defaultOptions,
    props.options
  );

  useEffect(() => {
    getRecentTabs(true).then((tabs) => {
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
      <PanelContent columns={options.columns}>
        <Card>
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
