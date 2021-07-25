import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/list/SiteRow';
import { formatDistance } from 'date-fns';
import { getRecentlyClosed, openUrl } from '../services/browser';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig } from '../services/panels';
import { PanelKind } from '../enums/panelKind';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import { PanelSettings } from '../ui-components/panel/PanelContext';

type RecentlyClosedPanelOptions = PanelSettings;

type RecentlyClosedPanelProps = ComponentBase &
  DraggablePanelProps & {
    options: RecentlyClosedPanelOptions;
    onOptionsChanged: (options: RecentlyClosedPanelOptions) => void;
    onDeletePanel: () => void;
  };

export function RecentlyClosedPanel(props: RecentlyClosedPanelProps) {
  const [sessions, setSessions] = useState<chrome.sessions.Session[]>([]);

  const options: RecentlyClosedPanelOptions = useMemo(
    () =>
      Object.assign(
        getPanelConfig(PanelKind.RecentlyClosed).defaultOptions,
        props.options
      ),
    [props.options]
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
      <PanelContent>
        <Card>
          {sessions.map((session) => (
            <SiteRow
              key={session.tab!.sessionId}
              primaryText={session.tab!.title}
              url={session.tab!.url}
              secondaryText={session.tab!.url}
              accentText={formatDistance(
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
