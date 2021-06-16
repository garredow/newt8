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

  function updatePanel(panel: Panel) {
    const index = panels.findIndex((a) => a.id === panel.id);
    if (index === -1) {
      return;
    }

    const newPanels = [...panels];
    newPanels[index] = panel;
    setItem(STORAGE_KEY.PANELS, newPanels);
    setPanels(newPanels);
  }

  function handleOptionsChanged(panelId: PanelType, options: {}) {
    const panel = panels.find((a) => a.id === panelId);
    if (!panel) return;

    panel.options = options;
    updatePanel(panel);
  }

  function renderPanel(panel: Panel) {
    switch (panel.id) {
      case PanelType.Bookmarks:
        return (
          <BookmarksPanel
            key={panel.id}
            options={panel.options}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
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
          />
        );
    }
  }

  useEffect(() => {
    getNewtFolderId();

    getItem<Panel[]>(STORAGE_KEY.PANELS).then((storedPanels: Panel[] = []) => {
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
      {panels.map((panel) => renderPanel(panel))}
    </div>
  );
}
