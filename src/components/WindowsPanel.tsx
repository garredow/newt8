import { formatDistance } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { MdSettings } from 'react-icons/md';
import { ChromeWindow } from '../models/ChromeWindow';
import { switchToTab } from '../services/chromeService';
import { getWindows } from '../services/windowsService';
import { SettingsContext } from '../SettingsContext';
import { IconButton } from '../ui-components/button';
import {
  Card,
  CardButton,
  CardFooter,
  CardHeader,
} from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
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

type WindowsPanelProps = {};

export function WindowsPanel(props: WindowsPanelProps) {
  const [windows, setWindows] = useState<ChromeWindow[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    getWindows().then((res) => setWindows(res));
  }, []);

  return (
    <div className={styles.root}>
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
        {showSettings ? <PanelContent>Settings</PanelContent> : null}
        <PanelContent>
          {windows.map((window) => (
            <WindowCard window={window} key={window.id} />
          ))}
        </PanelContent>
      </Panel>
    </div>
  );
}
