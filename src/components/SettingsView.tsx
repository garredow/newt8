import React from 'react';
import { useContext } from 'react';
import { SettingsContext } from '../SettingsContext';
import { SettingsRow } from '../ui-components/panel/SettingsRow';
import styles from './SettingsView.module.css';

export function SettingsView() {
  const { settings, setSettings } = useContext(SettingsContext);

  function setSettingValue(key: string, val: any) {
    setSettings({ ...settings, [key]: val });
  }

  return (
    <div className={styles.root}>
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
