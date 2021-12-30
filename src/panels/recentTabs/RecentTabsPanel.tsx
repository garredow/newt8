import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { PanelSettings } from '../../contexts/PanelContext';
import { Tab } from '../../models/Browser';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { getTabs, SortOrder, switchToTab } from '../../services/browser';
import { Card } from '../../ui-components/card';
import { SiteRow } from '../../ui-components/list';
import { Panel, PanelContent } from '../../ui-components/panel';

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
