import { formatDistance } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { PanelSettings } from '../../contexts/PanelContext';
import { ControlType } from '../../enums/controlType';
import { PanelKind } from '../../enums/panelKind';
import { Window } from '../../models/Browser';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { getWindows, switchToTab } from '../../services/browser';
import { getPanelConfig } from '../../services/panels';
import { Button } from '../../ui-components/button';
import { Card } from '../../ui-components/card';
import { Checkbox } from '../../ui-components/input';
import { SettingsRow, SiteRow } from '../../ui-components/list';
import { Panel, PanelContent } from '../../ui-components/panel';
import styles from './WindowsPanel.module.css';

export type WindowsPanelOptions = PanelSettings & {
  showCardTitles: boolean;
  windowId: number;
  showTabAccessedTime: boolean;
  showUrl: boolean;
};

type WindowsPanelProps = ComponentBaseProps &
  PanelBaseProps<WindowsPanelOptions>;

export function WindowsPanel(props: WindowsPanelProps) {
  const [windows, setWindows] = useState<Window[] | undefined>();
  const [showWindowPicker, setShowWindowPicker] = useState(false);

  const options: WindowsPanelOptions = useMemo(
    () =>
      Object.assign(
        getPanelConfig(PanelKind.Windows).defaultOptions,
        props.panel.options
      ),
    [props.panel.options]
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

  function handleOptionChanged(key: string, val: any) {
    const newOpts: WindowsPanelOptions = {
      ...options,
      [key]: val,
    };
    props.onOptionsChanged(newOpts);
  }

  function renderWindows() {
    if (!windows) return null;

    const result = windows
      .filter(
        (window) => options.windowId === window.id || options.windowId === 0
      )
      .map((window) => (
        <Card
          key={window.id}
          title={`Window ${window.id}`}
          cardId={`window_${window.id}`}
          enableSettings
        >
          {window.tabs.map((tab) => (
            <SiteRow
              key={tab.id}
              primaryText={tab.title}
              url={tab.url}
              secondaryText={tab.url}
              accentText={formatDistance(new Date(tab.accessedAt), new Date(), {
                addSuffix: true,
                includeSeconds: true,
              })}
              onClick={() => switchToTab(tab.windowId, tab.id)}
            />
          ))}
        </Card>
      ));

    if (result.length === 0) {
      setShowWindowPicker(true);
      return null;
    }

    return result;
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
            label="Show when tab last accessed"
            helpText="Display when each tab was last accessed, in relative time."
          >
            <Checkbox
              checked={options.showTabAccessedTime}
              onChange={(checked) =>
                handleOptionChanged('showTabAccessedTime', checked)
              }
            />
          </SettingsRow>
          <SettingsRow
            label="Show URL"
            helpText="Display the URL for each tab."
          >
            <Checkbox
              checked={options.showUrl}
              onChange={(checked) => handleOptionChanged('showUrl', checked)}
            />
          </SettingsRow>
        </>
      }
      extraButtons={
        <Button
          text="Choose New Window"
          fullWidth
          onClick={() => setShowWindowPicker(true)}
        />
      }
    >
      {showWindowPicker ? (
        <PanelContent columns={1}>
          <Card title="Choose a window">
            <div className={styles.windowPickerContainer}>
              <div>
                <Button
                  text="All Windows"
                  type={ControlType.Primary}
                  fullWidth
                  onClick={() => handleChooseWindow(0)}
                />
                <p>Each window will be its own card.</p>
              </div>
              {windows?.map((window) => (
                <div key={window.id}>
                  <Button
                    text={`Window ${window.id}`}
                    type={ControlType.Secondary}
                    fullWidth
                    onClick={() => handleChooseWindow(window.id!)}
                  />
                  {window.tabs.slice(0, 5).map((tab) => (
                    <SiteRow
                      key={tab.id}
                      primaryText={tab.title}
                      url={tab.url}
                    />
                  ))}
                </div>
              ))}
            </div>
          </Card>
        </PanelContent>
      ) : (
        <PanelContent>{renderWindows()}</PanelContent>
      )}
    </Panel>
  );
}