import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from '../ui-components/card';
import {
  Panel,
  PanelButton,
  PanelContent,
  PanelHeader,
} from '../ui-components/panel';
import styles from './DevicesPanel.module.css';
import { SiteRow } from '../ui-components/card/SiteRow';
import { formatDistance } from 'date-fns';
import { IconButton } from '../ui-components/button';
import { MdSettings } from 'react-icons/md';
import { ButtonType } from '../enums/buttonType';
import { PanelSettings } from '../ui-components/panel/PanelSettings';
import { SettingsRow } from '../ui-components/panel/SettingsRow';
import { getDevices } from '../services/sessionsService';
import { openUrl } from '../services/chromeService';

type DevicesPanelOptions = {
  columns: number;
  width: 1 | 2 | 3 | 4 | 5;
};

type DevicesPanelProps = {
  options: DevicesPanelOptions;
  onOptionsChanged: (options: DevicesPanelOptions) => void;
  onDeletePanel: () => void;
};

export function DevicesPanel(props: DevicesPanelProps) {
  const [devices, setDevices] = useState<chrome.sessions.Device[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    getDevices().then((sessions) => setDevices(sessions));
  }, []);

  function setOptionValue(key: string, val: any) {
    const newOpts = { ...props.options, [key]: val };
    props.onOptionsChanged(newOpts);
  }

  return (
    <div
      className={styles.root}
      style={{ gridColumn: `span ${props.options.width}` }}
    >
      <Panel>
        <PanelHeader
          text="Other Devices"
          actions={
            <>
              <IconButton onClick={() => setShowSettings(!showSettings)}>
                <MdSettings />
              </IconButton>
            </>
          }
        />
        {showSettings ? (
          <PanelSettings>
            <SettingsRow label="Columns">
              <select
                defaultValue={props.options.columns}
                onChange={(ev) =>
                  setOptionValue('columns', parseInt(ev.target.value, 10))
                }
              >
                <option value={0}>Auto</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            </SettingsRow>
            <SettingsRow label="Width">
              <select
                defaultValue={props.options.width}
                onChange={(ev) => setOptionValue('width', ev.target.value)}
              >
                <option value={1}>Smallest</option>
                <option value={2}>Small</option>
                <option value={3}>Medium</option>
                <option value={4}>Large</option>
                <option value={5}>Largest</option>
              </select>
            </SettingsRow>
            <PanelButton
              text="Delete"
              type={ButtonType.Danger}
              onClick={props.onDeletePanel}
            ></PanelButton>
          </PanelSettings>
        ) : null}
        <PanelContent columns={props.options.columns}>
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
    </div>
  );
}
