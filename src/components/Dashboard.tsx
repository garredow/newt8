import React, { useState } from 'react';
import { getNewtFolderId } from '../services/chromeService';
import { BookmarksPanel } from './BookmarksPanel';
import { RecentTabsPanel } from './RecentTabsPanel';
import { WindowsPanel } from './WindowsPanel';
import styles from './Dashboard.module.css';
import { Panel } from '../models/Panel';
import { useEffect } from 'react';
import { getItem, setItem, STORAGE_KEY } from '../utilities/storage';
import { PanelType } from '../enums/panelType';
import { IconButton } from '../ui-components/button';
import { MdAdd } from 'react-icons/md';
import { NewPanel } from './NewPanel';
import { RecentlyClosedPanel } from './RecentlyClosedPanel';
import { DevicesPanel } from './DevicesPanel';
import { PanelOptions } from '../ui-components/panel';
import { ButtonType } from '../enums/buttonType';
import { Button } from '../ui-components/button/Button';

enum LoadingStatus {
  Init,
  Loading,
  Idle,
}
export function DashboardView() {
  const [panels, setPanels] = useState<Panel[]>([]);
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.Init);

  useEffect(() => {
    getNewtFolderId();

    setStatus(LoadingStatus.Loading);
    getItem<Panel[]>(STORAGE_KEY.PANELS).then((storedPanels: Panel[] = []) => {
      setPanels(storedPanels);
      setStatus(LoadingStatus.Idle);
    });
  }, []);

  function addPanel(panel: Panel) {
    const index = panels.findIndex((a) => a.id === panel.id);
    if (index >= 0) {
      return;
    }

    const newPanels = [...panels, panel];
    setItem(STORAGE_KEY.PANELS, newPanels);
    setPanels(newPanels);
  }

  function updatePanel(panelId: PanelType, panel: Panel) {
    const index = panels.findIndex((a) => a.id === panelId);
    if (index === -1) {
      return;
    }

    const newPanels = [...panels];
    newPanels[index] = panel;
    setItem(STORAGE_KEY.PANELS, newPanels);
    setPanels(newPanels);
  }

  function deletePanel(panelId: PanelType) {
    const newPanels = panels.filter((a) => a.id !== panelId);
    setItem(STORAGE_KEY.PANELS, newPanels);
    setPanels(newPanels);
  }

  function handleOptionsChanged(panelId: PanelType, options: PanelOptions) {
    const panel = panels.find((a) => a.id === panelId);
    if (!panel) return;

    panel.options = options;
    updatePanel(panelId, panel);
  }

  function handlePanelTypeChange(panelId: PanelType, newPanelId: PanelType) {
    updatePanel(panelId, {
      id: newPanelId,
      options: {} as PanelOptions,
    });
  }

  function renderPanel(panel: Panel) {
    switch (panel.id) {
      case PanelType.New:
        const currentPanels = panels.map((a) => a.id);
        const availablePanels = [
          PanelType.Bookmarks,
          PanelType.Devices,
          PanelType.RecentlyClosed,
          PanelType.RecentTabs,
          PanelType.Windows,
        ].filter((a) => !currentPanels.includes(a));

        return (
          <NewPanel
            key={panel.id}
            availablePanels={availablePanels}
            options={{} as PanelOptions}
            onPanelTypeChanged={(panelType) =>
              handlePanelTypeChange(panel.id, panelType)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelType.Bookmarks:
        return (
          <BookmarksPanel
            key={panel.id}
            options={panel.options}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelType.RecentTabs:
        return (
          <RecentTabsPanel
            key={panel.id}
            options={panel.options}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelType.Windows:
        return (
          <WindowsPanel
            key={panel.id}
            options={panel.options}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelType.RecentlyClosed:
        return (
          <RecentlyClosedPanel
            key={panel.id}
            options={panel.options}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelType.Devices:
        return (
          <DevicesPanel
            key={panel.id}
            options={panel.options}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
    }
  }

  return (
    <div className={styles.root}>
      {panels.length === 0 && status === LoadingStatus.Idle ? (
        <div className={styles.empty}>
          <div className={styles.message}>
            Looks like there aren't any panels here yet. Want to add one?
            <Button
              text="Bookmarks"
              type={ButtonType.Primary}
              onClick={() =>
                addPanel({
                  id: PanelType.Bookmarks,
                  options: {} as PanelOptions,
                })
              }
            />
            <Button
              text="Something else..."
              type={ButtonType.Secondary}
              onClick={() =>
                addPanel({
                  id: PanelType.New,
                  options: {} as PanelOptions,
                })
              }
            />
          </div>
        </div>
      ) : (
        <div className={styles.panels}>
          {panels.map((panel) => renderPanel(panel))}
        </div>
      )}
      <div className={styles.sidebar}>
        <IconButton
          onClick={() => {
            // Only allow one new panel at a time
            if (panels.some((a) => a.id === PanelType.New)) return;

            addPanel({
              id: PanelType.New,
              options: {} as PanelOptions,
            });
          }}
        >
          <MdAdd />
        </IconButton>
      </div>
    </div>
  );
}
