import React, { useEffect, useState } from 'react';
import { ButtonKind } from '../enums/buttonKind';
import { ButtonType } from '../enums/buttonType';
import { PanelType } from '../enums/panelType';
import { Window } from '../models/Browser';
import { ComponentBase } from '../models/ComponentBase';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import { getWindows, switchToTab } from '../services/browser';
import { getPanelConfig, PanelOptions } from '../services/panels';
import { Button } from '../ui-components/button/Button';
import { Card, CardHeader } from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent } from '../ui-components/panel';
import styles from './WindowsPanel.module.css';

type WindowsPanelOptions = PanelOptions & {
  showCardTitles: boolean;
  windowId: number;
};

type WindowsPanelProps = ComponentBase &
  DraggablePanelProps & {
    options: WindowsPanelOptions;
    onOptionsChanged: (options: WindowsPanelOptions) => void;
    onDeletePanel: () => void;
  };

export function WindowsPanel(props: WindowsPanelProps) {
  const [windows, setWindows] = useState<Window[]>([]);
  const [showWindowPicker, setShowWindowPicker] = useState(false);

  const options: WindowsPanelOptions = Object.assign(
    getPanelConfig(PanelType.Windows).defaultOptions,
    props.options
  );

  useEffect(() => {
    getWindows().then((res) => setWindows(res));
  }, []);

  useEffect(() => {
    if (options.windowId === undefined) {
      setShowWindowPicker(true);
    }
  }, [options.windowId]);

  function handleChooseWindow(windowId: number) {
    const newOpts: WindowsPanelOptions = {
      ...options,
      windowId,
    };
    props.onOptionsChanged(newOpts);
    setShowWindowPicker(false);
  }

  return (
    <Panel
      panelId={props.panelId}
      panelIndex={props.panelIndex}
      options={options}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
      extraSettings={
        <Button
          text="Choose New Window"
          kind={ButtonKind.Panel}
          fullWidth
          onClick={() => setShowWindowPicker(true)}
        />
      }
    >
      {showWindowPicker ? (
        <PanelContent columns={1}>
          <Card>
            <CardHeader text="Choose a window" />
            <div className={styles.windowPickerContainer}>
              <div>
                <Button
                  text="All Windows"
                  kind={ButtonKind.Card}
                  type={ButtonType.Primary}
                  fullWidth
                  onClick={() => handleChooseWindow(0)}
                />
                <p>Each window will be its own card.</p>
              </div>
              {windows.map((window) => (
                <div key={window.id}>
                  <Button
                    text={`Window ${window.id}`}
                    kind={ButtonKind.Card}
                    type={ButtonType.Secondary}
                    fullWidth
                    onClick={() => handleChooseWindow(window.id!)}
                  />
                  {window.tabs.slice(0, 5).map((tab) => (
                    <SiteRow
                      key={tab.id}
                      title={tab.title}
                      iconUrl={`chrome://favicon/size/32@1x/${tab.url}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </Card>
        </PanelContent>
      ) : (
        <PanelContent columns={options.columns}>
          {windows
            .filter(
              (window) =>
                options.windowId === window.id || options.windowId === 0
            )
            .map((window) => (
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
      )}
    </Panel>
  );
}
