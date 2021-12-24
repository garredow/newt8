import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { joinClasses } from '../../utilities/classes';
import { DynamicText } from '../DynamicText';
import styles from './PanelHeader.module.css';

type PanelHeaderProps = ComponentBaseProps & {
  title: string;
  onTitleChanged: (title: string) => void;
};

export function PanelHeader(props: PanelHeaderProps) {
  return (
    <div
      className={joinClasses(styles.root, props.className)}
      data-testid={props['data-testid']}
    >
      <DynamicText
        text={props.title}
        type="title"
        editable={true}
        onEdit={props.onTitleChanged}
      />
      <div className={styles.flex} />
      {props.children}
    </div>
  );
}
