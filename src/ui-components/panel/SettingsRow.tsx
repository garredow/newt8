import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import { SettingsContext } from '../../SettingsContext';
import styles from './SettingsRow.module.css';

type SettingsRowProps = ComponentBase & {
  label: string;
  helpText?: string;
};

export function SettingsRow(props: SettingsRowProps) {
  const [showHelpText, setShowHelpText] = useState(false);
  const { settings } = useContext(SettingsContext);

  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      <div className={styles.row}>
        <div
          className={styles.label}
          onClick={() => setShowHelpText(!showHelpText)}
        >
          {props.label}
        </div>
        {props.children}
      </div>
      {(showHelpText || settings.showSettingHelpText) && props.helpText ? (
        <div className={styles.helptext}>{props.helpText}</div>
      ) : null}
    </div>
  );
}
