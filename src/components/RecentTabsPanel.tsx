import React, { useState, useEffect } from 'react';
import { ChromeTab } from '../models/ChromeTab';
import { getRecentTabs } from '../services/tabsService';
import { Card } from '../ui-components/card';
import { Panel, PanelContent, PanelOptions } from '../ui-components/panel';
import { SiteRow } from '../ui-components/card/SiteRow';
import { formatDistance } from 'date-fns';
import { switchToTab } from '../services/chromeService';

type RecentTabsPanelOptions = PanelOptions;

type RecentTabsPanelProps = {
  options: RecentTabsPanelOptions;
  onOptionsChanged: (options: RecentTabsPanelOptions) => void;
  onDeletePanel: () => void;
};

export function RecentTabsPanel(props: RecentTabsPanelProps) {
  const [tabs, setTabs] = useState<ChromeTab[]>([]);

  const options: RecentTabsPanelOptions = Object.assign(
    {
      columns: 1,
      width: 3,
      title: 'Recent Tabs',
    },
    props.options
  );

  useEffect(() => {
    getRecentTabs(true).then((tabs) => {
      setTabs(tabs);
    });
  }, []);

  return (
    <Panel
      options={options}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
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
