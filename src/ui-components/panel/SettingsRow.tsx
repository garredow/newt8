import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { DisplayDensity } from '../../enums/displayDensity';
import { ComponentBase } from '../../models/ComponentBase';
import { SettingsContext } from '../../SettingsContext';
import { mixin } from '../../utilities/mixin';
import styles from './SettingsRow.module.css';

type SettingsRowProps = ComponentBase & {
  label: string;
  helpText?: string;
};

export function SettingsRow(props: SettingsRowProps) {
  const [classes, setClasses] = useState([styles.root]);
  const [showHelpText, setShowHelpText] = useState(false);
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    const newClasses = [styles.root];
    if (settings.displayDensity === DisplayDensity.Compact) {
      newClasses.push(styles.compact);
    }
    if (settings.displayDensity === DisplayDensity.Spacious) {
      newClasses.push(styles.spacious);
    }

    setClasses(newClasses);
  }, [settings.displayDensity]);

  return (
    <div className={mixin(...classes)} data-testid={props['data-testid']}>
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
