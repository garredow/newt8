import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import { mixin } from '../../utilities/mixin';
import styles from './CardContent.module.css';

type CardContentProps = ComponentBase & {
  fullWidth?: boolean;
};

export function CardContent({ fullWidth = false, ...props }: CardContentProps) {
  const classes = [styles.root];
  if (fullWidth) {
    classes.push(styles.fullWidth);
  }
  return (
    <div className={mixin(...classes)} data-testid={props['data-testid']}>
      {props.children}
    </div>
  );
}
