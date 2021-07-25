import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import { ifClass, joinClasses } from '../../utilities/classes';
import styles from './CardContent.module.css';

type CardContentProps = ComponentBase & {
  fullWidth?: boolean;
};

export function CardContent({ fullWidth = false, ...props }: CardContentProps) {
  return (
    <div
      className={joinClasses(styles.root, ifClass(fullWidth, styles.fullWidth))}
      data-testid={props['data-testid']}
    >
      {props.children}
    </div>
  );
}
