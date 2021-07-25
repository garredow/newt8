import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/list/SiteRow';
import { formatDistance } from 'date-fns';
import { getDevices, openUrl } from '../services/browser';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig } from '../services/panels';
import { PanelKind } from '../enums/panelKind';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import { SettingsRow } from '../ui-components/list/SettingsRow';
import { Checkbox } from '../ui-components/input/Checkbox';
import { ControlLocation } from '../enums/controlLocation';
import { PanelSettings } from '../ui-components/panel/PanelContext';

export type DevicesPanelOptions = PanelSettings & {
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

  const options: DevicesPanelOptions = useMemo(
    () =>
      Object.assign(
        getPanelConfig(PanelKind.Devices).defaultOptions,
        props.options
      ),
    [props.options]
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
      enableOrientation={true}
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
              location={ControlLocation.Panel}
              checked={options.showUrl}
              onChange={(checked) => handleOptionChanged('showUrl', checked)}
            />
          </SettingsRow>
          <SettingsRow
            label="Show when tab last accessed"
            helpText="Display when each tab was last accessed, in relative time."
          >
            <Checkbox
              location={ControlLocation.Panel}
              checked={options.showTabAccessedTime}
              onChange={(checked) =>
                handleOptionChanged('showTabAccessedTime', checked)
              }
            />
          </SettingsRow>
        </>
      }
    >
      <PanelContent>
        {devices.map((device) => {
          return device.sessions.map((session) => (
            <Card key={session.window?.sessionId}>
              <CardHeader text={device.deviceName} />
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
            </Card>
          ));
        })}
      </PanelContent>
    </Panel>
  );
}
