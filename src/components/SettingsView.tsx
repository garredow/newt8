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
        <SettingsRow
          label="Confirm before delete"
          helpText="When turned on, you'll be asked to confirm any action that would result in
           something being deleted. Ex: A panel or page."
        >
          <input
            type="checkbox"
            checked={settings.confirmBeforeDelete}
            onChange={(ev) =>
              setSettingValue('confirmBeforeDelete', ev.target.checked)
            }
          />
        </SettingsRow>
        <SettingsRow
          label="Show actions on hover"
          helpText="When turned on, action buttons (add page, edit page, panel settings, etc) will 
          be hidden by default. They will only show when you hover the mouse over them."
        >
          <input
            type="checkbox"
            checked={settings.showActionsOnHover}
            onChange={(ev) =>
              setSettingValue('showActionsOnHover', ev.target.checked)
            }
          />
        </SettingsRow>
      </div>
    </div>
  );
}
