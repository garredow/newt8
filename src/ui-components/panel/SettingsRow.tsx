import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './SettingsRow.module.css';

type SettingsRowProps = ComponentBase & {
  label: string;
  helpText?: string;
};

export function SettingsRow(props: SettingsRowProps) {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <div className={styles.label}>{props.label}</div>
        {props.children}
      </div>
      {props.helpText ? (
        <div className={styles.helptext}>{props.helpText}</div>
      ) : null}
    </div>
  );
}
