import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { joinClasses } from '../../utilities/classes';
import styles from './PanelHeader.module.css';

type PanelHeaderProps = ComponentBaseProps & {
  text: string;
};

export function PanelHeader(props: PanelHeaderProps) {
  return (
    <div
      className={joinClasses(styles.root, props.className)}
      data-testid={props['data-testid']}
    >
      <h1 className={styles.title}>{props.text}</h1>
      <div className={styles.flex} />
      {props.children}
    </div>
  );
}
