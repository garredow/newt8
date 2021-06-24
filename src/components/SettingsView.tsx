import React from 'react';
import { useContext } from 'react';
import { ComponentBase } from '../models/ComponentBase';
import { SettingsContext } from '../SettingsContext';
import { SettingsRow } from '../ui-components/panel/SettingsRow';
import styles from './SettingsView.module.css';

export type SettingsViewProps = ComponentBase;

export function SettingsView(props: SettingsViewProps) {
  const { settings, setSettings } = useContext(SettingsContext);

  function setSettingValue(key: string, val: any) {
    setSettings({ ...settings, [key]: val });
  }

  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      <div className={styles.content}>
        <h1>Settings</h1>
        <SettingsRow
          label="Show help text"
          helpText="When turned on, each setting throughout Newt will have a short description
           displayed beneath it. If off, you can still view this text by clicking on the label."
        >
          <input
            type="checkbox"
            checked={settings.showSettingHelpText}
            onChange={(ev) =>
              setSettingValue('showSettingHelpText', ev.target.checked)
            }
          />
        </SettingsRow>
      </div>
    </div>
  );
}
