import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '../ui-components/button';
import { MdAdd, MdClose, MdColorLens, MdEdit } from 'react-icons/md';
import { ButtonType } from '../enums/buttonType';
import styles from './Sidebar.module.css';
import { PagesContext } from '../PagesContext';
import { useEffect } from 'react';
import { ComponentBase } from '../models/ComponentBase';

export type SidebarProps = ComponentBase;

export function Sidebar(props: SidebarProps) {
  const { pages, setPages } = useContext(PagesContext);

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
      if (!ev.altKey && !keys.includes(ev.code)) return;

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

  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      <div className={styles.pages}>
        {pages.map((page) => {
          const classes = [styles.page];
          if (page.isActive) {
            classes.push(styles.highlight);
          }
          return (
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
      </div>
      <div>
        <IconButton size={40} type={ButtonType.Primary} onClick={() => {}}>
          <MdEdit />
        </IconButton>
        <IconButton size={40} type={ButtonType.Primary} onClick={() => {}}>
          <MdAdd />
        </IconButton>
        <IconButton size={40} type={ButtonType.Primary} onClick={() => {}}>
          <MdClose />
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
