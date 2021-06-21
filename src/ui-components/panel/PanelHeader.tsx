import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './PanelHeader.module.css';

type PanelHeaderProps = ComponentBase & {
  text: string;
  editable?: boolean;
  onTitleChanged: (title: string) => void;
};

export function PanelHeader(props: PanelHeaderProps) {
  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      <h1
        className={styles.title}
        contentEditable={props.editable}
        suppressContentEditableWarning
        onKeyDown={(ev) => {
          if (ev.key !== 'Enter') {
            return;
          }

          ev.preventDefault();
          props.onTitleChanged((ev.target as HTMLHeadingElement).innerText);
        }}
      >
        {props.text}
      </h1>
      {props.children}
    </div>
  );
}
