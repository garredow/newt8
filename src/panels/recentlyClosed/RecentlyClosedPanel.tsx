import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { PanelSettings } from '../../contexts/PanelContext';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { getRecentlyClosed, openUrl } from '../../services/browser';
import { Card, CardContent } from '../../ui-components/card';
import { SiteRow } from '../../ui-components/list';
import { Panel, PanelContent } from '../../ui-components/panel';

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
      settings={[
        {
          id: 'sites',
          title: 'Sites',
          items: [
            {
              type: 'checkbox',
              key: 'showSecondaryText',
              label: 'Show Url',
              helpText: 'Display the URL for each tab.',
              testId: 'check-show-url',
            },
            {
              type: 'checkbox',
              key: 'showAccentText',
              label: 'Show Date',
              helpText: 'Display when the tab was closed.',
              testId: 'check-show-accessed',
            },
          ],
        },
      ]}
    >
      <PanelContent>
        <Card>
          <CardContent>
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
          </CardContent>
        </Card>
      </PanelContent>
    </Panel>
  );
}
