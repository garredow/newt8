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
  MdColorLens,
  MdCompareArrows,
  MdEdit,
} from 'react-icons/md';
import { ButtonType } from '../enums/buttonType';
import styles from './Sidebar.module.css';
import { PagesContext } from '../PagesContext';
import { useEffect } from 'react';
import { ComponentBase } from '../models/ComponentBase';
import { useState } from 'react';
import { Page } from '../services/panels';
import { moveArrayItem } from '../utilities/moveArrayItem';

export type SidebarProps = ComponentBase;

export function Sidebar(props: SidebarProps) {
  const [editMode, setEditMode] = useState(false);

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

  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="pages" direction="horizontal">
          {(provided) => (
            <div
              className={styles.pages}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {pages.map((page, i) => {
                const classes = [styles.page];
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
                            type={ButtonType.Secondary}
                            className={styles.draggable}
                            onClick={() => {}}
                            {...provided.dragHandleProps}
                          >
                            <MdCompareArrows />
                          </IconButton>
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
                            type={ButtonType.Danger}
                            onClick={() => deletePage(page.id)}
                          >
                            <MdClose />
                          </IconButton>
                        </div>
                      )}
                    </Draggable>
                  </div>
                ) : (
                  <Link
                    to={`/${page.id}/dashboard`}
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
      <div>
        <IconButton
          size={40}
          type={ButtonType.Primary}
          onClick={() => setEditMode(!editMode)}
        >
          <MdEdit />
        </IconButton>
        <IconButton
          size={40}
          type={ButtonType.Primary}
          onClick={() =>
            savePage({
              id: `page_${new Date().valueOf()}`,
              name: 'New Page',
              isActive: true,
              panels: [],
            })
          }
        >
          <MdAdd />
        </IconButton>
        <Link to="/themer">
          <IconButton size={40} type={ButtonType.Primary} onClick={() => {}}>
            <MdColorLens />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}
