import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonType } from '../enums/buttonType';
import { ComponentBase } from '../models/ComponentBase';
import { Theme } from '../models/Theme';
import { SettingsContext } from '../SettingsContext';
import { Button } from '../ui-components/button/Button';
import { ConfirmDialog } from '../ui-components/ConfirmDialog';
import { SettingsRow } from '../ui-components/panel/SettingsRow';
import { isDarkMode } from '../utilities/isDarkMode';
import styles from './SettingsView.module.css';

export type SettingsViewProps = ComponentBase;

export function SettingsView(props: SettingsViewProps) {
  const [showConfirmDeleteTheme, setShowConfirmDeleteTheme] = useState(false);
  const { settings, setSettings } = useContext(SettingsContext);
  const history = useHistory();

  function setSettingValue(key: string, val: any) {
    setSettings({ ...settings, [key]: val });
  }

  function getCurrentTheme() {
    const theme = settings.dynamicThemes
      ? isDarkMode()
        ? settings.themes.find((a) => a.id === settings.darkTheme)
        : settings.themes.find((a) => a.id === settings.lightTheme)
      : settings.themes.find((a) => a.id === settings.activeTheme);

    return theme || settings.themes[0];
  }

  function createNewTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme: Theme = {
      id: `custom_${new Date().toISOString()}`,
      name: `${currentTheme.name} - Copy`,
      values: { ...getCurrentTheme().values },
    };

    history.push('/theme', { theme: newTheme });
  }

  function editTheme() {
    history.push('/theme', { theme: getCurrentTheme() });
  }

  function requestDeleteTheme() {
    if (settings.confirmBeforeDelete) {
      setShowConfirmDeleteTheme(true);
      return;
    }

    deleteTheme();
  }

  function deleteTheme() {
    const currentTheme = getCurrentTheme();
    const newThemes = settings.themes.filter((a) => a.id !== currentTheme.id);

    setSettings({
      ...settings,
      activeTheme: settings.themes[0].id,
      themes: newThemes,
    });
  }

  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      <div className={styles.content}>
        <h1>Settings</h1>
        <section>
          <h2>General</h2>
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
        </section>
        <section>
          <h2>Theme</h2>
          <SettingsRow
            label="Dynamic themes"
            helpText="When you turn on dark mode for your device, Newt's theme will change to match it."
          >
            <input
              type="checkbox"
              checked={settings.dynamicThemes}
              onChange={(ev) =>
                setSettingValue('dynamicThemes', ev.target.checked)
              }
            />
          </SettingsRow>
          {settings.dynamicThemes ? (
            <>
              <SettingsRow
                label="Light Theme"
                helpText="This theme will be applied when dark mode is turned off."
              >
                <select
                  value={settings.lightTheme}
                  onChange={(ev) =>
                    setSettingValue('lightTheme', ev.target.value)
                  }
                >
                  {settings.themes.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name}
                    </option>
                  ))}
                </select>
              </SettingsRow>
              <SettingsRow
                label="Dark Theme"
                helpText="This theme will be applied when dark mode is on."
              >
                <select
                  value={settings.darkTheme}
                  onChange={(ev) =>
                    setSettingValue('darkTheme', ev.target.value)
                  }
                >
                  {settings.themes.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name}
                    </option>
                  ))}
                </select>
              </SettingsRow>
            </>
          ) : (
            <SettingsRow
              label="Theme"
              helpText="Choose which theme you'd like applied."
            >
              <select
                value={settings.activeTheme}
                onChange={(ev) =>
                  setSettingValue('activeTheme', ev.target.value)
                }
              >
                {settings.themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </SettingsRow>
          )}
          <div className={styles.themeActions}>
            <Button text="New Theme" onClick={createNewTheme} />
            <Button
              text="Customize Theme"
              onClick={editTheme}
              disabled={!getCurrentTheme().id.startsWith('custom')}
            />
            <Button
              text="Delete Theme"
              type={ButtonType.Danger}
              onClick={requestDeleteTheme}
              disabled={!getCurrentTheme().id.startsWith('custom')}
            />
          </div>
        </section>
      </div>
      {showConfirmDeleteTheme && (
        <ConfirmDialog
          title="Confirm"
          message="Are you sure you want to delete this theme?"
          danger
          onCancel={() => setShowConfirmDeleteTheme(false)}
          onConfirm={() => {
            deleteTheme();
            setShowConfirmDeleteTheme(false);
          }}
        />
      )}
    </div>
  );
}
