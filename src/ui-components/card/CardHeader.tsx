import React from 'react';
import styles from './CardHeader.module.css';

type CardHeaderProps = {
  text?: string;
  actions?: any;
  children?: any;
};

export function CardHeader(props: CardHeaderProps) {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <div className={styles.title}>{props.text}</div>
        <div className={styles.actions}>{props.actions}</div>
      </div>
      {props.children}
    </div>
  );
}
