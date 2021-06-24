import React, { useState } from 'react';
import { BookmarksPanel } from './BookmarksPanel';
import { RecentTabsPanel } from './RecentTabsPanel';
import { WindowsPanel } from './WindowsPanel';
import styles from './Dashboard.module.css';
import { useEffect } from 'react';
import { PanelType } from '../enums/panelType';
import { IconButton } from '../ui-components/button';
import { MdAdd } from 'react-icons/md';
import { NewPanel } from './NewPanel';
import { RecentlyClosedPanel } from './RecentlyClosedPanel';
import { DevicesPanel } from './DevicesPanel';
import { ButtonType } from '../enums/buttonType';
import { Button } from '../ui-components/button/Button';
import { ComponentBase } from '../models/ComponentBase';
import { Page, PanelOptions } from '../services/panels';
import { Panel } from '../models/Panel';
import { NewBookmarksPanel } from './NewBookmarksPanel';
import { TopSitesPanel } from './TopSitesPanel';
import { useContext } from 'react';
import { PagesContext } from '../PagesContext';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { moveArrayItem } from '../utilities/moveArrayItem';
import { EmptyPanel } from './EmptyPanel';

enum LoadingStatus {
  Init,
  Loading,
  Idle,
}

export type DashboardViewProps = ComponentBase;

export function DashboardView(props: DashboardViewProps) {
  const [panels, setPanels] = useState<Panel[]>([]);
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.Init);
  const { pages, savePage } = useContext(PagesContext);

  useEffect(() => {
    setStatus(LoadingStatus.Loading);

    const page = pages.find((a) => a.isActive === true);
    setPanels(page?.panels || []);

    if (page) {
      setStatus(LoadingStatus.Idle);
    }
  }, [pages]);

  function addPanel(panel: Panel) {
    const index = panels.findIndex((a) => a.id === panel.id);
    if (index >= 0) {
      return;
    }

    const newPanels = [...panels, panel];
    savePage({
      ...pages.find((a) => a.isActive === true),
      panels: newPanels,
    } as Page);
    setPanels(newPanels);
  }

  function updatePanel(panelId: string, panel: Panel) {
    const index = panels.findIndex((a) => a.id === panelId);
    if (index === -1) {
      return;
    }

    const newPanels = [...panels];
    newPanels[index] = panel;
    savePage({
      ...pages.find((a) => a.isActive === true),
      panels: newPanels,
    } as Page);
    setPanels(newPanels);
  }

  function deletePanel(panelId: string) {
    const newPanels = panels.filter((a) => a.id !== panelId);
    savePage({
      ...pages.find((a) => a.isActive === true),
      panels: newPanels,
    } as Page);
    setPanels(newPanels);
  }

  function handleOptionsChanged(panelId: string, options: PanelOptions) {
    const panel = panels.find((a) => a.id === panelId);
    if (!panel) return;

    panel.options = options;
    updatePanel(panelId, panel);
  }

  function handlePanelTypeChange(panelId: string, newPanelKind: PanelType) {
    updatePanel(panelId, {
      id: panelId,
      kind: newPanelKind,
      options: {} as PanelOptions,
    });
  }

  function handleDragEnd(ev: DropResult) {
    const oldIndex = ev.source.index;
    const newIndex = ev.destination?.index;

    if (newIndex === undefined || newIndex === oldIndex) return;

    const newPanels = moveArrayItem(panels, oldIndex, newIndex);

    setPanels(newPanels);
    savePage({
      ...pages.find((a) => a.isActive === true),
      panels: newPanels,
    } as Page);
  }

  function renderPanel(panel: Panel, index: number) {
    switch (panel.kind) {
      case PanelType.New:
        return (
          <NewPanel
            key={panel.id}
            panelId={panel.id}
            panelIndex={index}
            options={{} as PanelOptions}
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
            options={panel.options as PanelOptions}
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
            options={panel.options}
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

  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      {panels.length === 0 && status === LoadingStatus.Idle ? (
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
                  options: {} as PanelOptions,
                })
              }
            />
          </div>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="panels" direction="horizontal">
            {(provided) => (
              <div
                className={styles.panels}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {panels.map((panel, i) => renderPanel(panel, i))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <div className={styles.sidebar}>
        <IconButton
          icon={<MdAdd />}
          title="Add a new panel"
          onClick={() => {
            // Only allow one new panel at a time
            if (panels.some((a) => a.kind === PanelType.New)) return;

            addPanel({
              id: `panel_${new Date().valueOf()}`,
              kind: PanelType.New,
              options: {} as PanelOptions,
            });
          }}
        />
      </div>
    </div>
  );
}
