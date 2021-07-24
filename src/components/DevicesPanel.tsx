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
import { SettingsRow } from '../ui-components/panel/SettingsRow';
import { Checkbox } from '../ui-components/input/Checkbox';
import { ControlKind } from '../enums/controlKind';

export type DevicesPanelOptions = PanelOptions & {
  showTabAccessedTime: boolean;
  showUrl: boolean;
};

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

  function handleOptionChanged(key: string, val: any) {
    const newOpts: DevicesPanelOptions = {
      ...options,
      [key]: val,
    };
    props.onOptionsChanged(newOpts);
  }

  return (
    <Panel
      panelId={props.panelId}
      panelIndex={props.panelIndex}
      options={options}
      enableColumns={true}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
      extraSettings={
        <>
          <SettingsRow
            label="Show URL"
            helpText="Display the URL for each tab."
          >
            <Checkbox
              kind={ControlKind.Panel}
              checked={options.showUrl}
              onChange={(checked) => handleOptionChanged('showUrl', checked)}
            />
          </SettingsRow>
          <SettingsRow
            label="Show when tab last accessed"
            helpText="Display when each tab was last accessed, in relative time."
          >
            <Checkbox
              kind={ControlKind.Panel}
              checked={options.showTabAccessedTime}
              onChange={(checked) =>
                handleOptionChanged('showTabAccessedTime', checked)
              }
            />
          </SettingsRow>
        </>
      }
    >
      <PanelContent columns={options.columns} display={options.display}>
        {devices.map((device) => {
          return device.sessions.map((session) => (
            <Card key={session.window?.sessionId} display={options.display}>
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
                  showUrl={options.showUrl}
                  showLine3={options.showTabAccessedTime}
                  onClick={openUrl}
                />
              ))}
            </Card>
          ));
        })}
      </PanelContent>
    </Panel>
  );
}
