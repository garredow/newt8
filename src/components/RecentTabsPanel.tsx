import React, { useState, useEffect } from 'react';
import { Card } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/list/SiteRow';
import { formatDistance } from 'date-fns';
import { getTabs, SortOrder, switchToTab } from '../services/browser';
import { ComponentBaseProps } from '../models/ComponentBaseProps';
import { Tab } from '../models/Browser';
import { PanelSettings } from '../contexts/PanelContext';
import { PanelBaseProps } from '../models/PanelBaseProps';

type RecentTabsPanelOptions = PanelSettings;

type RecentTabsPanelProps = ComponentBaseProps &
  PanelBaseProps<RecentTabsPanelOptions>;

export function RecentTabsPanel(props: RecentTabsPanelProps) {
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    getTabs({ sortOrder: SortOrder.MostRecent }).then((tabs) => {
      setTabs(tabs);
    });
  }, []);

  return (
    <Panel
      panel={props.panel}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
    >
      <PanelContent>
        <Card>
          {tabs.map((tab) => (
            <SiteRow
              key={tab.id}
              primaryText={tab.title}
              url={tab.url}
              secondaryText={tab.url}
              accentText={formatDistance(new Date(tab.accessedAt), new Date(), {
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
