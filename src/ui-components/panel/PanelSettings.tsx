import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './PanelSettings.module.css';

type PanelSettingsProps = ComponentBase & {};

export function PanelSettings(props: PanelSettingsProps) {
  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      {props.children}
    </div>
  );
}
