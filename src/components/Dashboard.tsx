import React, { useState } from 'react';
import { BookmarksPanel } from './BookmarksPanel';
import { RecentTabsPanel } from './RecentTabsPanel';
import { WindowsPanel, WindowsPanelOptions } from './WindowsPanel';
import styles from './Dashboard.module.css';
import { useEffect } from 'react';
import { PanelKind } from '../enums/panelKind';
import { IconButton } from '../ui-components/button';
import { MdAdd } from 'react-icons/md';
import { NewPanel } from './NewPanel';
import { RecentlyClosedPanel } from './RecentlyClosedPanel';
import { DevicesPanel, DevicesPanelOptions } from './DevicesPanel';
import { ControlType } from '../enums/controlType';
import { Button } from '../ui-components/button/Button';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig, Page } from '../services/panels';
import { Panel } from '../models/Panel';
import { NewBookmarksPanel } from './NewBookmarksPanel';
import { TopSitesPanel } from './TopSitesPanel';
import { useContext } from 'react';
import { PagesContext } from '../contexts/PagesContext';
import { EmptyPanel } from './EmptyPanel';
import { joinClasses } from '../utilities/classes';
import { AppSettingsContext } from '../contexts/AppSettingsContext';
import { cloneDeep, zip } from 'lodash';
import { PanelSettings } from '../contexts/PanelContext';

enum LoadingStatus {
  Init,
  Loading,
  Idle,
}

export type DashboardViewProps = ComponentBase;

export function DashboardView(props: DashboardViewProps) {
  const [page, setPage] = useState<Page>({
    id: 'default',
    name: 'Default',
    isActive: true,
    panels: [],
    grid: {
      rowSizes: [],
      colSizes: [],
      layout: [],
    },
  });
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.Init);
  const { pages, savePage } = useContext(PagesContext);
  const { settings } = useContext(AppSettingsContext);

  useEffect(() => {
    setStatus(LoadingStatus.Loading);

    const page = pages.find((a) => a.isActive === true);
    if (!page) return;

    setPage(page);
    setStatus(LoadingStatus.Idle);
  }, [pages]);

  function addPanel(panel: Panel) {
    const index = page.panels.findIndex((a) => a.id === panel.id);
    if (index >= 0) {
      return;
    }

    const newPage = cloneDeep(page);
    newPage.panels.push(panel);

    // Handle first panel
    if (newPage.grid.rowSizes.length === 0) {
      newPage.grid.rowSizes = ['1fr'];
    }
    newPage.grid.colSizes.push('1fr');
    newPage.grid.layout =
      newPage.grid.layout.length === 0
        ? [[panel.id]]
        : newPage.grid.layout.map((row) => [...row, panel.id]);
    savePage(newPage);
  }

  function updatePanel(panelId: string, panel: Panel) {
    const index = page.panels.findIndex((a) => a.id === panelId);
    if (index === -1) {
      return;
    }

    const newPanels = [...page.panels];
    newPanels[index] = panel;
    savePage({
      ...page,
      panels: newPanels,
    } as Page);
  }

  function deletePanel(panelId: string) {
    const newPage = cloneDeep(page);
    const newPanels = newPage.panels.filter((a) => a.id !== panelId);
    newPage.panels = newPanels;

    if (newPanels.length === 0) {
      newPage.grid.layout = [];
      newPage.grid.rowSizes = [];
      newPage.grid.colSizes = [];

      return savePage(newPage);
    }

    let wholeRowIndex = page.grid.layout.findIndex(
      (row, i) =>
        row.filter((a) => a === panelId || a === '.').length === row.length
    );
    if (wholeRowIndex >= 0) {
      newPage.grid.layout.splice(wholeRowIndex, 1);
      newPage.grid.rowSizes.splice(wholeRowIndex, 1);
    }

    let wholeColumnIndex = zip(...page.grid.layout).findIndex(
      (row, i) =>
        row.filter((a) => a === panelId || a === '.').length === row.length
    );
    if (wholeColumnIndex >= 0) {
      newPage.grid.layout.forEach((row) => row.splice(wholeColumnIndex, 1));
      newPage.grid.colSizes.splice(wholeColumnIndex, 1);
    }

    newPage.grid.layout = newPage.grid.layout.map((row, ri) => {
      return row.map((col, ci) => {
        return col === panelId ? '.' : col;
      });
    });

    savePage(newPage);
  }

  function handleOptionsChanged(panelId: string, options: PanelSettings) {
    const panel = page.panels.find((a) => a.id === panelId);
    if (!panel) return;

    panel.options = options;
    updatePanel(panelId, panel);
  }

  function handlePanelKindChange(panelId: string, newPanelKind: PanelKind) {
    updatePanel(panelId, {
      id: panelId,
      kind: newPanelKind,
      options: getPanelConfig(newPanelKind).defaultOptions as PanelSettings,
    });
  }

  function renderPanel(panel: Panel, index: number) {
    switch (panel.kind) {
      case PanelKind.New:
        return (
          <NewPanel
            key={panel.id}
            panelId={panel.id}
            panelIndex={index}
            options={panel.options}
            onPanelKindChanged={(panelKind) =>
              handlePanelKindChange(panel.id, panelKind)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelKind.Empty:
        return (
          <EmptyPanel
            key={panel.id}
            panelId={panel.id}
            panelIndex={index}
            options={panel.options}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelKind.Bookmarks:
        return (
          <BookmarksPanel
            key={panel.id}
            panelId={panel.id}
            panelIndex={index}
            options={panel.options as any}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelKind.RecentTabs:
        return (
          <RecentTabsPanel
            key={panel.id}
            panelId={panel.id}
            panelIndex={index}
            options={panel.options}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelKind.Windows:
        return (
          <WindowsPanel
            key={panel.id}
            panelId={panel.id}
            panelIndex={index}
            options={panel.options as WindowsPanelOptions}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelKind.RecentlyClosed:
        return (
          <RecentlyClosedPanel
            key={panel.id}
            panelId={panel.id}
            panelIndex={index}
            options={panel.options}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelKind.Devices:
        return (
          <DevicesPanel
            key={panel.id}
            panelId={panel.id}
            panelIndex={index}
            options={panel.options as DevicesPanelOptions}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelKind.NewBookmarks:
        return (
          <NewBookmarksPanel
            key={panel.id}
            panelId={panel.id}
            panelIndex={index}
            options={panel.options}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelKind.TopSites:
        return (
          <TopSitesPanel
            key={panel.id}
            panelId={panel.id}
            panelIndex={index}
            options={panel.options}
            onOptionsChanged={(options) =>
              handleOptionsChanged(panel.id, options)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
    }
  }

  if (!page) return null;

  // We need to manually handle grid gap if using percentages
  const panelsStyle = {
    gridTemplateColumns: page.grid.colSizes
      .map((a) =>
        a === '1fr'
          ? a
          : `calc(${a} - ${
              ((page.grid.layout[0].length - 1) * 10) /
              page.grid.layout[0].length
            }px)`
      )
      .join(' '),
    gridTemplateRows: page.grid.rowSizes
      .map((a) =>
        a === '1fr'
          ? a
          : `calc(${a} - ${
              ((page.grid.layout.length - 1) * 10) / page.grid.layout.length
            }px)`
      )
      .join(' '),
    gridTemplateAreas: page.grid.layout.reduce((acc, val) => {
      acc += `'${val.join(' ')}'`;
      return acc;
    }, ''),
  };

  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      {page.panels.length === 0 && status === LoadingStatus.Idle ? (
        <div className={styles.empty}>
          <div className={styles.message}>
            Looks like there aren't any panels here yet. Want to add one?
            <Button
              text="New Panel"
              type={ControlType.Primary}
              onClick={() =>
                addPanel({
                  id: `panel_${new Date().valueOf()}`,
                  kind: PanelKind.New,
                  options: getPanelConfig(PanelKind.New)
                    .defaultOptions as PanelSettings,
                })
              }
            />
          </div>
        </div>
      ) : (
        <div className={styles.panels} style={panelsStyle}>
          {page.panels.map((panel, i) => renderPanel(panel, i))}
        </div>
      )}
      <div
        className={joinClasses(
          styles.sidebar,
          settings.showActionsOnHover ? styles.hidden : styles.notHidden
        )}
      >
        <IconButton
          icon={<MdAdd />}
          type={ControlType.Primary}
          title="Add a new panel"
          onClick={() => {
            // Only allow one new panel at a time
            if (page.panels.some((a) => a.kind === PanelKind.New)) return;

            addPanel({
              id: `panel_${new Date().valueOf()}`,
              kind: PanelKind.New,
              options: getPanelConfig(PanelKind.New)
                .defaultOptions as PanelSettings,
            });
          }}
        />
      </div>
    </div>
  );
}
