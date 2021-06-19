import React, { useState, useEffect } from 'react';
import { Card } from '../ui-components/card';
import { Panel, PanelContent, PanelOptions } from '../ui-components/panel';
import { SiteRow } from '../ui-components/card/SiteRow';
import { formatDistance } from 'date-fns';
import { getRecentlyClosed } from '../services/sessionsService';
import { openUrl } from '../services/chromeService';

type RecentlyClosedPanelOptions = PanelOptions;

type RecentlyClosedPanelProps = {
  options: RecentlyClosedPanelOptions;
  onOptionsChanged: (options: RecentlyClosedPanelOptions) => void;
  onDeletePanel: () => void;
};

export function RecentlyClosedPanel(props: RecentlyClosedPanelProps) {
  const [sessions, setSessions] = useState<chrome.sessions.Session[]>([]);

  const options: RecentlyClosedPanelOptions = Object.assign(
    {
      columns: 1,
      width: 3,
      title: 'Recently Closed Tabs',
    },
    props.options
  );

  useEffect(() => {
    getRecentlyClosed().then((sessions) => setSessions(sessions));
  }, []);

  return (
    <Panel
      options={options}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
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
              onClick={() => openUrl(session.tab!.url as string)}
            />
          ))}
        </Card>
      </PanelContent>
    </Panel>
  );
}
