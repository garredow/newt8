import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/card/SiteRow';
import { formatDistance } from 'date-fns';
import { getDevices, openUrl } from '../services/browser';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig, PanelOptions } from '../services/panels';
import { PanelType } from '../enums/panelType';
import { DraggablePanelProps } from '../models/DraggablePanelProps';

type DevicesPanelOptions = PanelOptions;

type DevicesPanelProps = ComponentBase &
  DraggablePanelProps & {
    options: DevicesPanelOptions;
    onOptionsChanged: (options: DevicesPanelOptions) => void;
    onDeletePanel: () => void;
  };

export function DevicesPanel(props: DevicesPanelProps) {
  const [devices, setDevices] = useState<chrome.sessions.Device[]>([]);

  const options: DevicesPanelOptions = Object.assign(
    getPanelConfig(PanelType.Devices).defaultOptions,
    props.options
  );

  useEffect(() => {
    getDevices().then((sessions) => setDevices(sessions));
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
        {devices.map((device) => {
          return device.sessions.map((session) => (
            <Card key={session.window?.sessionId}>
              <CardHeader text={device.deviceName} />
              {session?.window?.tabs?.map((tab) => (
                <SiteRow
                  key={tab.sessionId}
                  title={tab.title}
                  iconUrl={`chrome://favicon/size/32@1x/${tab.url}`}
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
