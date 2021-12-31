import React, { useContext, useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { MdAdd, MdDashboard, MdSettings } from 'react-icons/md';
import { useHistory, useLocation } from 'react-router-dom';
import { PagesContext } from '../contexts/PagesContext';
import { ControlType } from '../enums/controlType';
import { ComponentBaseProps } from '../models/ComponentBaseProps';
import { Page } from '../models/Page';
import { IconButton } from '../ui-components/button';
import { DynamicText } from '../ui-components/DynamicText';
import { moveArrayItem } from '../utilities/moveArrayItem';
import { AppSettingsDialog } from './AppSettingsDialog';
import { PageSettingsDialog } from './PageSettingsDialog';
import styles from './Sidebar.module.css';

export type SidebarProps = ComponentBaseProps;

export function Sidebar(props: SidebarProps) {
  const [showAppSettings, setShowAppSettings] = useState(false);
  const [showPageSettings, setShowPageSettings] = useState(false);

  const { pages, setPages, savePage, deletePage } = useContext(PagesContext);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const handleShortcutKey = (ev: KeyboardEvent) => {
      const keys = [
        'Digit1',
        'Digit2',
        'Digit3',
        'Digit4',
        'Digit5',
        'Digit6',
        'Digit7',
        'Digit8',
        'Digit9',
      ];
      if (!ev.altKey || !keys.includes(ev.code)) return;

      const foundPage = pages[parseInt(ev.code.charAt(5), 10) - 1];
      if (!foundPage) return;

      handlePageClick(foundPage.id);
    };
    window.addEventListener('keypress', handleShortcutKey);

    return () => window.removeEventListener('keypress', handleShortcutKey);
  });

  function handlePageClick(pageId: string) {
    history.replace('/dashboard');
    const newPages = pages.map((page) =>
      page.id === pageId
        ? { ...page, isActive: true }
        : { ...page, isActive: false }
    );
    setPages(newPages);
  }

  function handlePageNameChange(page: Page, newName: string) {
    page.name = newName;
    savePage(page);
  }

  function handleDragEnd(ev: DropResult) {
    const oldIndex = ev.source.index;
    const newIndex = ev.destination?.index;

    if (newIndex === undefined || newIndex === oldIndex) return;

    setPages(moveArrayItem(pages, oldIndex, newIndex));
  }

  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      <div className={styles.bar}>
        <IconButton
          size={32}
          type={ControlType.Secondary}
          icon={<MdAdd />}
          title="Add Page"
          onClick={() =>
            savePage({
              id: `page_${new Date().valueOf()}`,
              name: 'New Page',
              isActive: true,
              panels: [],
              grid: {
                rowSizes: [],
                colSizes: [],
                layout: [],
              },
            })
          }
        />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="pages" direction="horizontal">
            {(provided) => (
              <div
                className={styles.pages}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {pages.map((page, i) => (
                  <Draggable key={page.id} draggableId={page.id} index={i}>
                    {(provided) => (
                      <div
                        key={page.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DynamicText
                          key={page.id}
                          text={page.name}
                          type="title"
                          color={page.isActive ? 'accent' : 'primary'}
                          editable
                          deletable
                          onEdit={(text) => handlePageNameChange(page, text)}
                          onDelete={() => deletePage(page.id)}
                          onClick={() => handlePageClick(page.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className={styles.spacer} />
        {location.pathname.includes('dashboard') ? (
          <>
            <IconButton
              size={40}
              type={ControlType.Primary}
              icon={<MdDashboard />}
              title="Page Settings"
              onClick={() => setShowPageSettings(true)}
            />
          </>
        ) : null}
        <IconButton
          size={40}
          type={ControlType.Primary}
          icon={<MdSettings />}
          title="App Settings"
          onClick={() => setShowAppSettings(true)}
        />
      </div>
      {showAppSettings && (
        <AppSettingsDialog onClose={() => setShowAppSettings(false)} />
      )}
      {showPageSettings && (
        <PageSettingsDialog onClose={() => setShowPageSettings(false)} />
      )}
    </div>
  );
}
