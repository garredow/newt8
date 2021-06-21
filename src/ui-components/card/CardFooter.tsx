import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './CardFooter.module.css';

type CardFooterProps = ComponentBase;

export function CardFooter(props: CardFooterProps) {
  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      {props.children}
    </div>
  );
}
