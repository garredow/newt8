import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './PanelHeader.module.css';

type PanelHeaderProps = ComponentBase & {
  text: string;
  actions?: any;
};

export function PanelHeader(props: PanelHeaderProps) {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <h1 className={styles.title}>{props.text}</h1>
        {props.actions}
      </div>
      {props.children}
    </div>
  );
}
