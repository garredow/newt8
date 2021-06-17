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

export function DashboardView() {
  const [panels, setPanels] = useState<Panel[]>([]);

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

  function handleOptionsChanged(panelId: PanelType, options: {}) {
    const panel = panels.find((a) => a.id === panelId);
    if (!panel) return;

    panel.options = options;
    updatePanel(panelId, panel);
  }

  function handlePanelTypeChange(panelId: PanelType, newPanelId: PanelType) {
    updatePanel(panelId, {
      id: newPanelId,
      options: {},
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
            onPanelTypeChanged={(panelType) =>
              handlePanelTypeChange(panel.id, panelType)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelType.Bookmarks:
        const defaultBookmarksOpts = { columns: 0, width: 3 } as any;
        return (
          <BookmarksPanel
            key={panel.id}
            options={{ ...defaultBookmarksOpts, ...panel.options }}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelType.RecentTabs:
        const defaultRecentTabsOpts = { columns: 1, width: 3 } as any;
        return (
          <RecentTabsPanel
            key={panel.id}
            options={{ ...defaultRecentTabsOpts, ...panel.options }}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelType.Windows:
        const defaultWindowsOpts = { columns: 1, width: 3 } as any;
        return (
          <WindowsPanel
            key={panel.id}
            options={{ ...defaultWindowsOpts, ...panel.options }}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelType.RecentlyClosed:
        const defaultRecentlyClosedOpts = { columns: 1, width: 3 } as any;
        return (
          <RecentlyClosedPanel
            key={panel.id}
            options={{ ...defaultRecentlyClosedOpts, ...panel.options }}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelType.Devices:
        const defaultDevicesOpts = { columns: 1, width: 3 } as any;
        return (
          <DevicesPanel
            key={panel.id}
            options={{ ...defaultDevicesOpts, ...panel.options }}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
    }
  }

  useEffect(() => {
    getNewtFolderId();

    getItem<Panel[]>(STORAGE_KEY.PANELS).then((storedPanels: Panel[] = []) => {
      console.log('stored panels', storedPanels);
      if (storedPanels.length === 0) {
        addPanel({
          id: PanelType.Bookmarks,
          options: {},
        });
      }

      setPanels(storedPanels);
    });
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.panels}>
        {panels.map((panel) => renderPanel(panel))}
      </div>
      <div className={styles.sidebar}>
        <IconButton
          onClick={() => {
            // Only allow one new panel at a time
            if (panels.some((a) => a.id === PanelType.New)) return;

            addPanel({
              id: PanelType.New,
              options: {},
            });
          }}
        >
          <MdAdd />
        </IconButton>
      </div>
    </div>
  );
}
