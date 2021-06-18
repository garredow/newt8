import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { ButtonKind } from '../enums/buttonKind';
import { ChromeWindow } from '../models/ChromeWindow';
import { switchToTab } from '../services/chromeService';
import { getWindows } from '../services/windowsService';
import { Button } from '../ui-components/button/Button';
import { Card, CardFooter, CardHeader } from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent, PanelOptions } from '../ui-components/panel';
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
        <Button
          text={expanded ? 'See less' : 'See more'}
          kind={ButtonKind.Card}
          onClick={() => setExpanded(!expanded)}
        />
      </CardFooter>
    </Card>
  );
}

type WindowsPanelOptions = PanelOptions;

type WindowsPanelProps = {
  options: WindowsPanelOptions;
  onOptionsChanged: (options: WindowsPanelOptions) => void;
  onDeletePanel: () => void;
};

export function WindowsPanel(props: WindowsPanelProps) {
  const [windows, setWindows] = useState<ChromeWindow[]>([]);

  const options: WindowsPanelOptions = Object.assign(
    {
      columns: 1,
      width: 3,
      title: 'Windows',
    },
    props.options
  );

  useEffect(() => {
    getWindows().then((res) => setWindows(res));
  }, []);

  return (
    <div
      className={styles.root}
      style={{ gridColumn: `span ${options.width}` }}
    >
      <Panel
        options={options}
        onOptionsChanged={props.onOptionsChanged as any}
        onDeletePanel={props.onDeletePanel}
      >
        <PanelContent columns={options.columns}>
          {windows.map((window) => (
            <WindowCard window={window} key={window.id} />
          ))}
        </PanelContent>
      </Panel>
    </div>
  );
}
