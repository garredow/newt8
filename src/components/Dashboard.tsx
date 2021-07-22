import React, { useState } from 'react';
import { BookmarksPanel } from './BookmarksPanel';
import { RecentTabsPanel } from './RecentTabsPanel';
import { WindowsPanel, WindowsPanelOptions } from './WindowsPanel';
import styles from './Dashboard.module.css';
import { useEffect } from 'react';
import { PanelType } from '../enums/panelType';
import { IconButton } from '../ui-components/button';
import { MdAdd, MdDashboard } from 'react-icons/md';
import { NewPanel } from './NewPanel';
import { RecentlyClosedPanel } from './RecentlyClosedPanel';
import { DevicesPanel, DevicesPanelOptions } from './DevicesPanel';
import { ButtonType } from '../enums/buttonType';
import { Button } from '../ui-components/button/Button';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig, Page, PanelOptions } from '../services/panels';
import { Panel } from '../models/Panel';
import { NewBookmarksPanel } from './NewBookmarksPanel';
import { TopSitesPanel } from './TopSitesPanel';
import { useContext } from 'react';
import { PagesContext } from '../PagesContext';
import { EmptyPanel } from './EmptyPanel';
import { mixin } from '../utilities/mixin';
import { SettingsContext } from '../SettingsContext';
import { ConfigureGridDialog } from './ConfigureGridDialog';
import { GridLayout } from '../models/GridLayout';
import { cloneDeep } from 'lodash';

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
  const [showGridConfig, setShowGridConfig] = useState(false);
  const { pages, savePage } = useContext(PagesContext);
  const { settings } = useContext(SettingsContext);

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
    console.log('new page', newPage);
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
    newPage.panels = newPage.panels.filter((a) => a.id !== panelId);

    newPage.grid.layout = page.grid.layout.map((row, ri) => {
      return row.map((col, ci) => {
        return col === panelId ? '.' : col;
      });
    });

    savePage(newPage);
  }

  function handleOptionsChanged(panelId: string, options: PanelOptions) {
    const panel = page.panels.find((a) => a.id === panelId);
    if (!panel) return;

    panel.options = options;
    updatePanel(panelId, panel);
  }

  function handlePanelTypeChange(panelId: string, newPanelKind: PanelType) {
    updatePanel(panelId, {
      id: panelId,
      kind: newPanelKind,
      options: getPanelConfig(newPanelKind).defaultOptions as PanelOptions,
    });
  }

  function handleSaveGrid(grid: GridLayout) {
    savePage({
      ...page,
      grid,
    });
  }

  function renderPanel(panel: Panel, index: number) {
    switch (panel.kind) {
      case PanelType.New:
        return (
          <NewPanel
            key={panel.id}
            panelId={panel.id}
            panelIndex={index}
            options={panel.options}
            onPanelTypeChanged={(panelType) =>
              handlePanelTypeChange(panel.id, panelType)
            }
            onDeletePanel={() => deletePanel(panel.id)}
          />
        );
      case PanelType.Empty:
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
      case PanelType.Bookmarks:
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
      case PanelType.RecentTabs:
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
      case PanelType.Windows:
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
      case PanelType.RecentlyClosed:
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
      case PanelType.Devices:
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
      case PanelType.NewBookmarks:
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
      case PanelType.TopSites:
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
              type={ButtonType.Primary}
              onClick={() =>
                addPanel({
                  id: `panel_${new Date().valueOf()}`,
                  kind: PanelType.New,
                  options: getPanelConfig(PanelType.New)
                    .defaultOptions as PanelOptions,
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
        className={mixin(
          styles.sidebar,
          settings.showActionsOnHover ? styles.hidden : styles.notHidden
        )}
      >
        <IconButton
          icon={<MdAdd />}
          title="Add a new panel"
          onClick={() => {
            // Only allow one new panel at a time
            if (page.panels.some((a) => a.kind === PanelType.New)) return;

            addPanel({
              id: `panel_${new Date().valueOf()}`,
              kind: PanelType.New,
              options: getPanelConfig(PanelType.New)
                .defaultOptions as PanelOptions,
            });
          }}
        />
        <IconButton
          icon={<MdDashboard />}
          title="Configure dashboard grid"
          onClick={() => setShowGridConfig(true)}
        />
      </div>
      {showGridConfig && (
        <ConfigureGridDialog
          gridLayout={page.grid}
          panels={page.panels}
          onCancel={(newGridLayout) => {}}
          onSave={(newGridLayout, closeDialog) => {
            handleSaveGrid(newGridLayout);
            if (closeDialog) {
              setShowGridConfig(false);
            }
          }}
        />
      )}
    </div>
  );
}
