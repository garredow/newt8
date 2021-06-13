import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './PanelContent.module.css';

type PanelContentProps = ComponentBase;

export function PanelContent(props: PanelContentProps) {
  return <div className={styles.root}>{props.children}</div>;
}
