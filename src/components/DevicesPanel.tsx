import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from '../ui-components/card';
import { Panel, PanelContent, PanelOptions } from '../ui-components/panel';
import styles from './DevicesPanel.module.css';
import { SiteRow } from '../ui-components/card/SiteRow';
import { formatDistance } from 'date-fns';
import { getDevices } from '../services/sessionsService';
import { openUrl } from '../services/chromeService';

type DevicesPanelOptions = PanelOptions;

type DevicesPanelProps = {
  options: DevicesPanelOptions;
  onOptionsChanged: (options: DevicesPanelOptions) => void;
  onDeletePanel: () => void;
};

export function DevicesPanel(props: DevicesPanelProps) {
  const [devices, setDevices] = useState<chrome.sessions.Device[]>([]);

  const options: DevicesPanelOptions = Object.assign(
    {
      columns: 1,
      width: 3,
      title: 'Other Devices',
    },
    props.options
  );

  useEffect(() => {
    getDevices().then((sessions) => setDevices(sessions));
  }, []);

  return (
    <Panel
      options={options}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
    >
      <PanelContent columns={options.columns}>
        {devices.map((device) => {
          return device.sessions.map((session) => (
            <Card key={session.window?.sessionId}>
              <CardHeader text={device.deviceName} />
              {session?.window?.tabs?.map((tab) => (
                <SiteRow
                  key={tab.sessionId}
                  title={tab.title}
                  iconUrl={tab.favIconUrl}
                  url={tab.url}
                  line3={formatDistance(
                    new Date(session.lastModified * 1000),
                    new Date(),
                    {
                      addSuffix: true,
                      includeSeconds: true,
                    }
                  )}
                  onClick={() => openUrl(tab.url!)}
                />
              ))}
            </Card>
          ));
        })}
      </PanelContent>
    </Panel>
  );
}
