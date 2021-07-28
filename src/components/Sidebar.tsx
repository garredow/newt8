import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { IconButton } from '../ui-components/button';
import {
  MdAdd,
  MdClose,
  MdCompareArrows,
  MdDashboard,
  MdEdit,
  MdSettings,
} from 'react-icons/md';
import { ControlType } from '../enums/controlType';
import styles from './Sidebar.module.css';
import { PagesContext } from '../contexts/PagesContext';
import { useEffect } from 'react';
import { ComponentBaseProps } from '../models/ComponentBaseProps';
import { useState } from 'react';
import { moveArrayItem } from '../utilities/moveArrayItem';
import { ControlLocation } from '../enums/controlLocation';
import { ConfirmDialog } from '../ui-components/dialog/ConfirmDialog';
import { ifClass, joinClasses } from '../utilities/classes';
import { DisplayDensity } from '../enums/displayDensity';
import { useAppSettings } from '../contexts/AppSettingsProvider';
import { AppSettingsDialog } from './AppSettingsDialog';
import { PageSettingsDialog } from './PageSettingsDialog';
import { Page } from '../models/Page';

export type SidebarProps = ComponentBaseProps;

export function Sidebar(props: SidebarProps) {
  const [editMode, setEditMode] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string>();
  const [showAppSettings, setShowAppSettings] = useState(false);
  const [showPageSettings, setShowPageSettings] = useState(false);

  const { settings } = useAppSettings();
  const { pages, setPages, savePage, deletePage } = useContext(PagesContext);

  const location = useLocation();

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

  function handleRequestDelete(pageId: string) {
    if (settings.confirmBeforeDelete) {
      setPageToDelete(pageId);
      setShowConfirm(true);
      return;
    }

    deletePage(pageId);
  }

  function handleDeletePage() {
    setShowConfirm(false);
    deletePage(pageToDelete!);
  }

  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      <div className={styles.pagesContainer}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="pages" direction="horizontal">
            {(provided) => (
              <div
                className={styles.pages}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {pages.map((page, i) => {
                  return editMode ? (
                    <div key={page.id}>
                      <Draggable draggableId={page.id} index={i}>
                        {(provided) => (
                          <div
                            className={joinClasses(
                              styles.pageEdit,
                              ifClass(page.isActive, styles.highlight)
                            )}
                            key={page.id}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <IconButton
                              size={32}
                              location={ControlLocation.SideBar}
                              type={ControlType.Secondary}
                              className={styles.btnMove}
                              icon={<MdCompareArrows />}
                              title="Drag to reorder"
                              onClick={() => {}}
                              {...provided.dragHandleProps}
                            />
                            <div
                              suppressContentEditableWarning
                              contentEditable={true}
                              className={styles.pageEditTitle}
                              onKeyDown={(ev) => {
                                if (ev.key !== 'Enter') {
                                  return;
                                }

                                ev.preventDefault();
                                handlePageNameChange(
                                  page,
                                  (ev.target as HTMLHeadingElement).innerText
                                );
                              }}
                            >
                              {page.name}
                            </div>

                            <IconButton
                              size={32}
                              location={ControlLocation.SideBar}
                              type={ControlType.Danger}
                              icon={<MdClose />}
                              title="Delete"
                              onClick={() => handleRequestDelete(page.id)}
                            />
                          </div>
                        )}
                      </Draggable>
                    </div>
                  ) : (
                    <Link
                      to={`/dashboard`}
                      key={page.id}
                      className={joinClasses(
                        styles.page,
                        ifClass(
                          settings.displayDensity === DisplayDensity.Spacious,
                          styles.spacious
                        ),
                        ifClass(page.isActive, styles.highlight)
                      )}
                      onClick={() => handlePageClick(page.id)}
                    >
                      {page.name}
                    </Link>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div
          className={joinClasses(
            styles.pageActions,
            settings.showActionsOnHover ? styles.hidden : styles.notHidden
          )}
        >
          <IconButton
            size={32}
            location={ControlLocation.SideBar}
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
          <IconButton
            size={32}
            location={ControlLocation.SideBar}
            type={ControlType.Secondary}
            icon={<MdEdit />}
            title="Edit Pages"
            onClick={() => setEditMode(!editMode)}
          />
        </div>
      </div>
      <div>
        {location.pathname.includes('dashboard') ? (
          <>
            <IconButton
              size={40}
              location={ControlLocation.SideBar}
              type={ControlType.Primary}
              icon={<MdDashboard />}
              title="Page Settings"
              onClick={() => setShowPageSettings(true)}
            />
          </>
        ) : null}
        <IconButton
          size={40}
          location={ControlLocation.SideBar}
          type={ControlType.Primary}
          icon={<MdSettings />}
          title="App Settings"
          onClick={() => setShowAppSettings(true)}
        />
      </div>
      {showConfirm && (
        <ConfirmDialog
          title="Confirm"
          message="Are you sure you want to delete this?"
          danger
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDeletePage}
        />
      )}
      {showAppSettings && (
        <AppSettingsDialog onClose={() => setShowAppSettings(false)} />
      )}
      {showPageSettings && (
        <PageSettingsDialog onClose={() => setShowPageSettings(false)} />
      )}
    </div>
  );
}
