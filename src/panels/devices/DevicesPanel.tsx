import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { PanelSettings } from '../../contexts/PanelContext';
import { ControlLocation } from '../../enums/controlLocation';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { getDevices, openUrl } from '../../services/browser';
import { Card } from '../../ui-components/card';
import { Checkbox } from '../../ui-components/input/Checkbox';
import { SettingsRow } from '../../ui-components/list/SettingsRow';
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

  function handleOptionChanged(key: string, val: any) {
    const newOpts: DevicesPanelOptions = {
      ...props.panel.options,
      [key]: val,
    };
    props.onOptionsChanged(newOpts);
  }

  return (
    <Panel
      panel={props.panel}
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
              checked={props.panel.options.showUrl}
              onChange={(checked) => handleOptionChanged('showUrl', checked)}
            />
          </SettingsRow>
          <SettingsRow
            label="Show when tab last accessed"
            helpText="Display when each tab was last accessed, in relative time."
          >
            <Checkbox
              location={ControlLocation.Panel}
              checked={props.panel.options.showTabAccessedTime}
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
            <Card
              key={session.window?.sessionId}
              title={device.deviceName}
              cardId={`device_${device.deviceName}_window_${session.window?.id}`}
              enableSettings
            >
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
