import React, { useState, useEffect } from 'react';
import { Card } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/list/SiteRow';
import { formatDistance } from 'date-fns';
import { getRecentlyClosed, openUrl } from '../services/browser';
import { ComponentBaseProps } from '../models/ComponentBaseProps';
import { PanelSettings } from '../contexts/PanelContext';
import { PanelBaseProps } from '../models/PanelBaseProps';

type RecentlyClosedPanelOptions = PanelSettings;

type RecentlyClosedPanelProps = ComponentBaseProps &
  PanelBaseProps<RecentlyClosedPanelOptions>;

export function RecentlyClosedPanel(props: RecentlyClosedPanelProps) {
  const [sessions, setSessions] = useState<chrome.sessions.Session[]>([]);

  useEffect(() => {
    getRecentlyClosed().then((sessions) => setSessions(sessions));
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
