import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import styles from './CardFooter.module.css';

type CardFooterProps = ComponentBaseProps;

export function CardFooter(props: CardFooterProps) {
  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      {props.children}
    </div>
  );
}
