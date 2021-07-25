import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './CardHeader.module.css';

type CardHeaderProps = ComponentBase & {
  text?: string;
  actions?: any;
};

export function CardHeader(props: CardHeaderProps) {
  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      <div className={styles.title}>{props.text}</div>
      <div className={styles.actions}>{props.actions}</div>
    </div>
  );
}
