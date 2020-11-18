import React, { useEffect, useState } from 'react';
import { ChromeWindow } from '../models/ChromeWindow';
import { getWindows } from '../services/windowsService';
import {
  Card,
  CardButton,
  CardFooter,
  CardHeader,
} from '../ui-components/card';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import { TabRow } from './TabRow';
import './WindowsPanel.css';

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
        <TabRow tab={tab} key={tab.id} />
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

  useEffect(() => {
    getWindows().then((res) => setWindows(res));
  }, []);

  return (
    <Panel>
      <PanelHeader text="Windows" />
      <PanelContent>
        {windows.map((window) => (
          <WindowCard window={window} key={window.id} />
        ))}
      </PanelContent>
    </Panel>
  );
}
