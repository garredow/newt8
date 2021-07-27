import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { DisplayDensity } from '../../enums/displayDensity';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';
import { ifClass, joinClasses } from '../../utilities/classes';
import styles from './SettingsRow.module.css';

type SettingsRowProps = ComponentBaseProps & {
  label: string;
  helpText?: string;
};

export function SettingsRow(props: SettingsRowProps) {
  const [showHelpText, setShowHelpText] = useState(false);
  const { settings } = useContext(AppSettingsContext);

  return (
    <div
      className={joinClasses(
        styles.root,
        ifClass(
          settings.displayDensity === DisplayDensity.Compact,
          styles.compact
        ),
        ifClass(
          settings.displayDensity === DisplayDensity.Spacious,
          styles.spacious
        )
      )}
      data-testid={props['data-testid']}
    >
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
