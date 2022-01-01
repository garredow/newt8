import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { PanelSettings } from '../../contexts/PanelContext';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { getDevices, openUrl } from '../../services/browser';
import { Card, CardContent } from '../../ui-components/card';
import { SiteRow } from '../../ui-components/list/SiteRow';
import { Panel, PanelContent } from '../../ui-components/panel';

export type DevicesPanelOptions = PanelSettings & {
  showTabAccessedTime: boolean;
  showUrl: boolean;
};

type DevicesPanelProps = ComponentBaseProps &
  PanelBaseProps<DevicesPanelOptions>;

export function DevicesPanel(props: DevicesPanelProps) {
  const [devices, setDevices] = useState<chrome.sessions.Device[]>([]);

  useEffect(() => {
    getDevices().then((sessions) => setDevices(sessions));
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
              key: 'showUrl',
              label: 'Show Url',
              helpText: 'Display the URL for each tab.',
              testId: 'check-show-url',
            },
            {
              type: 'checkbox',
              key: 'showTabAccessedTime',
              label: 'Show when tab last accessed',
              helpText:
                'Display when each tab was last accessed, in relative time.',
              testId: 'check-show-accessed',
            },
          ],
        },
      ]}
    >
      <PanelContent>
        {devices.map((device) => {
          return device.sessions.map((session) => (
            <Card
              key={session.window?.sessionId}
              title={device.deviceName}
              cardId={`device_${device.deviceName}_window_${session.window?.id}`}
            >
              <CardContent>
                {session?.window?.tabs?.map((tab) => (
                  <SiteRow
                    key={tab.sessionId}
                    primaryText={tab.title}
                    url={tab.url}
                    secondaryText={tab.url}
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
          ));
        })}
      </PanelContent>
    </Panel>
  );
}
