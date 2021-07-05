import React, { useState, useEffect } from 'react';
import { Card } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/card/SiteRow';
import { formatDistance } from 'date-fns';
import { getRecentlyClosed, openUrl } from '../services/browser';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig, PanelOptions } from '../services/panels';
import { PanelType } from '../enums/panelType';
import { DraggablePanelProps } from '../models/DraggablePanelProps';

type RecentlyClosedPanelOptions = PanelOptions;

type RecentlyClosedPanelProps = ComponentBase &
  DraggablePanelProps & {
    options: RecentlyClosedPanelOptions;
    onOptionsChanged: (options: RecentlyClosedPanelOptions) => void;
    onDeletePanel: () => void;
  };

export function RecentlyClosedPanel(props: RecentlyClosedPanelProps) {
  const [sessions, setSessions] = useState<chrome.sessions.Session[]>([]);

  const options: RecentlyClosedPanelOptions = Object.assign(
    getPanelConfig(PanelType.RecentlyClosed).defaultOptions,
    props.options
  );

  useEffect(() => {
    getRecentlyClosed().then((sessions) => setSessions(sessions));
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
          {sessions.map((session) => (
            <SiteRow
              key={session.tab!.sessionId}
              title={session.tab!.title}
              iconUrl={`chrome://favicon/size/32@1x/${session.tab!.url}`}
              url={session.tab!.url}
              line3={formatDistance(
                new Date(session.lastModified * 1000),
                new Date(),
                {
                  addSuffix: true,
                  includeSeconds: true,
                }
              )}
              onClick={openUrl}
            />
          ))}
        </Card>
      </PanelContent>
    </Panel>
  );
}
