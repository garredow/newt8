import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { ifClass, joinClasses } from '../../utilities/classes';
import styles from './CardContent.module.css';

export type CardContentProps = ComponentBaseProps & {
  fullWidth?: boolean;
  padding?: boolean;
};

export function CardContent({
  fullWidth = false,
  padding = false,
  ...props
}: CardContentProps) {
  return (
    <div
      className={joinClasses(
        styles.root,
        ifClass(fullWidth, styles.fullWidth),
        ifClass(padding, styles.padding)
      )}
      data-testid={props['data-testid']}
    >
      {props.children}
    </div>
  );
}
