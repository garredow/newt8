import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { joinClasses } from '../../utilities/classes';
import styles from './CardFooter.module.css';

type CardFooterProps = ComponentBaseProps;

export function CardFooter(props: CardFooterProps) {
  return (
    <div
      className={joinClasses(styles.root, props.className)}
      data-testid={props['data-testid']}
    >
      {props.children}
    </div>
  );
}
