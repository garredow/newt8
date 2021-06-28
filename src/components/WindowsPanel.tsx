import React, { useEffect, useState } from 'react';
import { PanelType } from '../enums/panelType';
import { Window } from '../models/Browser';
import { ComponentBase } from '../models/ComponentBase';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import { getWindows, switchToTab } from '../services/browser';
import { getPanelConfig, PanelOptions } from '../services/panels';
import { Card, CardHeader } from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent } from '../ui-components/panel';

type WindowsPanelOptions = PanelOptions;

type WindowsPanelProps = ComponentBase &
  DraggablePanelProps & {
    options: WindowsPanelOptions;
    onOptionsChanged: (options: WindowsPanelOptions) => void;
    onDeletePanel: () => void;
  };

export function WindowsPanel(props: WindowsPanelProps) {
  const [windows, setWindows] = useState<Window[]>([]);

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
