import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
  MdEdit,
  MdSettings,
} from 'react-icons/md';
import { ButtonType } from '../enums/buttonType';
import styles from './Sidebar.module.css';
import { PagesContext } from '../PagesContext';
import { useEffect } from 'react';
import { ComponentBase } from '../models/ComponentBase';
import { useState } from 'react';
import { Page } from '../services/panels';
import { moveArrayItem } from '../utilities/moveArrayItem';
import { ControlKind } from '../enums/controlKind';
import { ConfirmDialog } from '../ui-components/ConfirmDialog';
import { SettingsContext } from '../SettingsContext';
import { mixin } from '../utilities/mixin';
import { DisplayDensity } from '../enums/displayDensity';

export type SidebarProps = ComponentBase;

export function Sidebar(props: SidebarProps) {
  const [editMode, setEditMode] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string>();
  const [pageClasses, setPageClasses] = useState([styles.page]);

  const { settings } = useContext(SettingsContext);
  const { pages, setPages, savePage, deletePage } = useContext(PagesContext);

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

  useEffect(() => {
    const newClasses = [styles.page];
    if (settings.displayDensity === DisplayDensity.Spacious) {
      newClasses.push(styles.spacious);
    }

    setPageClasses(newClasses);
  }, [settings.displayDensity]);

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
                  const classes = [...pageClasses];
                  const editClasses = [styles.pageEdit];
                  if (page.isActive) {
                    classes.push(styles.highlight);
                    editClasses.push(styles.highlight);
                  }
                  return editMode ? (
                    <div key={page.id}>
                      <Draggable draggableId={page.id} index={i}>
                        {(provided) => (
                          <div
                            className={editClasses.join(' ')}
                            key={page.id}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <IconButton
                              size={32}
                              kind={ControlKind.SideBar}
                              type={ButtonType.Secondary}
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
                              kind={ControlKind.SideBar}
                              type={ButtonType.Danger}
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
                      className={classes.join(' ')}
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
          className={mixin(
            styles.pageActions,
            settings.showActionsOnHover ? styles.hidden : styles.notHidden
          )}
        >
          <IconButton
            size={32}
            kind={ControlKind.SideBar}
            type={ButtonType.Secondary}
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
            kind={ControlKind.SideBar}
            type={ButtonType.Secondary}
            icon={<MdEdit />}
            title="Edit Pages"
            onClick={() => setEditMode(!editMode)}
          />
        </div>
      </div>
      <div>
        <Link to="/settings">
          <IconButton
            size={40}
            kind={ControlKind.SideBar}
            type={ButtonType.Primary}
            icon={<MdSettings />}
            title="Themes"
            onClick={() => {}}
          />
        </Link>
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
    </div>
  );
}
