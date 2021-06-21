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
      <h1>Settings</h1>
      <SettingsRow
        label="Theme"
        helpText="Choose which theme you'd like applied."
      >
        <select
          value={settings.activeTheme}
          onChange={(ev) => setSettingValue('activeTheme', ev.target.value)}
        >
          {settings.themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </SettingsRow>
    </div>
  );
}
