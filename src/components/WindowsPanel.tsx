import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { ButtonKind } from '../enums/buttonKind';
import { PanelType } from '../enums/panelType';
import { ChromeWindow } from '../models/ChromeWindow';
import { ComponentBase } from '../models/ComponentBase';
import { switchToTab } from '../services/chromeService';
import { getPanelConfig, PanelOptions } from '../services/panels';
import { getWindows } from '../services/windowsService';
import { Button } from '../ui-components/button/Button';
import { Card, CardFooter, CardHeader } from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent } from '../ui-components/panel';
import styles from './WindowsPanel.module.css';

type WindowCardProps = ComponentBase & {
  window: ChromeWindow;
};
function WindowCard({ window, ...props }: WindowCardProps) {
  const [expanded, setExpanded] = useState(true);

  const title = window.focused ? 'This Window' : `Window ${window.id}`;
  const tabs = expanded ? window.tabs : window.tabs.slice(0, 3);

  return (
    <Card data-testid={props['data-testid']}>
      <CardHeader text={title} />
      {tabs.map((tab) => (
        <SiteRow
          key={tab.id}
          title={tab.title}
          iconUrl={`chrome://favicon/size/32@1x/${tab.url}`}
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

type WindowsPanelProps = ComponentBase & {
  options: WindowsPanelOptions;
  onOptionsChanged: (options: WindowsPanelOptions) => void;
  onDeletePanel: () => void;
};

export function WindowsPanel(props: WindowsPanelProps) {
  const [windows, setWindows] = useState<ChromeWindow[]>([]);

  const options: WindowsPanelOptions = Object.assign(
    getPanelConfig(PanelType.Windows).defaultOptions,
    props.options
  );

  useEffect(() => {
    getWindows().then((res) => setWindows(res));
  }, []);

  return (
    <div
      className={styles.root}
      style={{ gridColumn: `span ${options.width}` }}
      data-testid={props['data-testid']}
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
