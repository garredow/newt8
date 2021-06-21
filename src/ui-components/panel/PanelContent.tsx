import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './PanelContent.module.css';

type PanelContentProps = ComponentBase & {
  columns?: number;
};

export function PanelContent(props: PanelContentProps) {
  const style = props.columns
    ? { gridTemplateColumns: `repeat(${props.columns}, 1fr)` }
    : {};
  return (
    <div
      className={styles.root}
      style={style}
      data-testid={props['data-testid']}
    >
      {props.children}
    </div>
  );
}
