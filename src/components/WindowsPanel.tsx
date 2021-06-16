import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { MdSettings } from 'react-icons/md';
import { ButtonType } from '../enums/buttonType';
import { ChromeWindow } from '../models/ChromeWindow';
import { switchToTab } from '../services/chromeService';
import { getWindows } from '../services/windowsService';
import { IconButton } from '../ui-components/button';
import {
  Card,
  CardButton,
  CardFooter,
  CardHeader,
} from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import { PanelSettings } from '../ui-components/panel/PanelSettings';
import { SettingsRow } from '../ui-components/panel/SettingsRow';
import styles from './WindowsPanel.module.css';

type WindowCardProps = {
  window: ChromeWindow;
};
function WindowCard({ window }: WindowCardProps) {
  const [expanded, setExpanded] = useState(true);

  const title = window.focused ? 'This Window' : `Window ${window.id}`;
  const tabs = expanded ? window.tabs : window.tabs.slice(0, 3);

  return (
    <Card>
      <CardHeader text={title} />
      {tabs.map((tab) => (
        <SiteRow
          key={tab.id}
          title={tab.title}
          iconUrl={tab.favIconUrl}
          url={tab.url}
          line3={formatDistance(new Date(tab.accessedAt), new Date(), {
            addSuffix: true,
            includeSeconds: true,
          })}
          onClick={() => switchToTab(tab.windowId, tab.id)}
        />
      ))}
      <CardFooter>
        <CardButton
          text={expanded ? 'See less' : 'See more'}
          onClick={() => setExpanded(!expanded)}
        />
      </CardFooter>
    </Card>
  );
}

type WindowsPanelOptions = {
  columns: number;
  width: 1 | 2 | 3 | 4 | 5;
};

type WindowsPanelProps = {
  options: WindowsPanelOptions;
  onOptionsChanged: (options: WindowsPanelOptions) => void;
  onDeletePanel: () => void;
};

export function WindowsPanel(props: WindowsPanelProps) {
  const [windows, setWindows] = useState<ChromeWindow[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    getWindows().then((res) => setWindows(res));
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
          text="Windows"
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
            <CardButton
              text="Delete"
              type={ButtonType.Danger}
              onClick={props.onDeletePanel}
            ></CardButton>
          </PanelSettings>
        ) : null}
        <PanelContent columns={props.options.columns}>
          {windows.map((window) => (
            <WindowCard window={window} key={window.id} />
          ))}
        </PanelContent>
      </Panel>
    </div>
  );
}
