import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/list/SiteRow';
import { formatDistance } from 'date-fns';
import { getTabs, SortOrder, switchToTab } from '../services/browser';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig } from '../services/panels';
import { PanelKind } from '../enums/panelKind';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import { Tab } from '../models/Browser';
import { PanelSettings } from '../ui-components/panel/PanelContext';

type RecentTabsPanelOptions = PanelSettings;

type RecentTabsPanelProps = ComponentBase &
  DraggablePanelProps & {
    options: RecentTabsPanelOptions;
    onOptionsChanged: (options: RecentTabsPanelOptions) => void;
    onDeletePanel: () => void;
  };

export function RecentTabsPanel(props: RecentTabsPanelProps) {
  const [tabs, setTabs] = useState<Tab[]>([]);

  const options: RecentTabsPanelOptions = useMemo(
    () =>
      Object.assign(
        getPanelConfig(PanelKind.RecentTabs).defaultOptions,
        props.options
      ),
    [props.options]
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
