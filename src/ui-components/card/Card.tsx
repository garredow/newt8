import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './Card.module.css';

export type CardProps = ComponentBase;

export function Card({ children, ...props }: CardProps) {
  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      {children}
    </div>
  );
}
