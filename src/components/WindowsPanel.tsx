import React, { useEffect, useState } from 'react';
import { PanelType } from '../enums/panelType';
import { ChromeWindow } from '../models/ChromeWindow';
import { ComponentBase } from '../models/ComponentBase';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import { switchToTab } from '../services/chromeService';
import { getPanelConfig, PanelOptions } from '../services/panels';
import { getWindows } from '../services/windowsService';
import { Card, CardHeader } from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent } from '../ui-components/panel';
import styles from './WindowsPanel.module.css';

type WindowsPanelOptions = PanelOptions;

type WindowsPanelProps = ComponentBase &
  DraggablePanelProps & {
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
    <Panel
      panelId={props.panelId}
      panelIndex={props.panelIndex}
      options={options}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
    >
      <PanelContent columns={options.columns}>
        {windows.map((window) => (
          <Card key={window.id}>
            <CardHeader text={`Window ${window.id}`} />
            {window.tabs.map((tab) => (
              <SiteRow
                key={tab.id}
                title={tab.title}
                iconUrl={`chrome://favicon/size/32@1x/${tab.url}`}
                url={tab.url}
                onClick={() => switchToTab(tab.windowId, tab.id)}
              />
            ))}
          </Card>
        ))}
      </PanelContent>
    </Panel>
  );
}
