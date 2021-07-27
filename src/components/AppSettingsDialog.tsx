import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ControlType } from '../enums/controlType';
import { DisplayDensity } from '../enums/displayDensity';
import { PanelDisplayType } from '../enums/panelDisplayType';
import { ComponentBaseProps } from '../models/ComponentBaseProps';
import { Theme } from '../models/Theme';
import { AppSettingsContext } from '../contexts/AppSettingsContext';
import { Button } from '../ui-components/button';
import { Dialog } from '../ui-components/dialog/Dialog';
import { Checkbox } from '../ui-components/input';
import { SettingsRow } from '../ui-components/list';
import { isDarkMode } from '../utilities/isDarkMode';
import styles from './AppSettingsDialog.module.css';

export type AppSettingsDialogProps = ComponentBaseProps & {
  onClose: () => void;
};
export function AppSettingsDialog({
  onClose,
  ...props
}: AppSettingsDialogProps) {
  const { settings, setSettings } = useContext(AppSettingsContext);
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
    onClose();
  }

  function editTheme() {
    history.push('/theme', { theme: getCurrentTheme() });
    onClose();
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
    <Dialog
      title="App Settings"
      width="medium"
      onClose={onClose}
      data-testid={'dialog-app-settings'}
    >
      <section>
        <h3>General</h3>
        <SettingsRow
          label="Show Help Text"
          helpText="When turned on, each setting throughout Newt will have a short description
           displayed beneath it. If off, you can still view this text by clicking on the label."
        >
          <Checkbox
            checked={settings.showSettingHelpText}
            onChange={(checked) =>
              setSettingValue('showSettingHelpText', checked)
            }
          />
        </SettingsRow>
        <SettingsRow
          label="Confirm Before Delete"
          helpText="When turned on, you'll be asked to confirm any action that would result in
           something being deleted, like a panel or page."
        >
          <Checkbox
            checked={settings.confirmBeforeDelete}
            onChange={(checked) =>
              setSettingValue('confirmBeforeDelete', checked)
            }
          />
        </SettingsRow>
      </section>
      <section>
        <h3>Display</h3>
        <SettingsRow
          label="Display Density"
          helpText="Changes the general information density of the app (spacing, padding, etc). You can also just adjust font size in the theme builder."
        >
          <select
            value={settings.displayDensity}
            onChange={(ev) =>
              setSettingValue('displayDensity', ev.target.value)
            }
          >
            <option value={DisplayDensity.Compact}>Compact</option>
            <option value={DisplayDensity.Normal}>Normal</option>
            <option value={DisplayDensity.Spacious}>Spacious</option>
          </select>
        </SettingsRow>
        <SettingsRow
          label="Only Show Actions On Hover"
          helpText="When turned on, action buttons (add page, edit page, panel settings, etc) will 
          be hidden by default. They will only show when you hover the mouse over them."
        >
          <Checkbox
            checked={settings.showActionsOnHover}
            onChange={(checked) =>
              setSettingValue('showActionsOnHover', checked)
            }
          />
        </SettingsRow>
        <SettingsRow
          label="Default Panel Display Style"
          helpText="Whether sites display in cards or lists. You can set this individually by 
              panel via a panel's own settings."
        >
          <select
            value={settings.defaultPanelDisplay}
            onChange={(ev) =>
              setSettingValue('defaultPanelDisplay', ev.target.value)
            }
          >
            <option value={PanelDisplayType.Cards}>Cards</option>
            <option value={PanelDisplayType.Lists}>Lists</option>
          </select>
        </SettingsRow>
        <SettingsRow
          label="Show Card/List Dividers"
          helpText="Show a divider between each card or list in a panel."
        >
          <Checkbox
            checked={settings.showCardDividers}
            onChange={(checked) => setSettingValue('showCardDividers', checked)}
          />
        </SettingsRow>
        <SettingsRow
          label="Show Site Row Dividers"
          helpText="Show a divider between each row in a card or list."
        >
          <Checkbox
            checked={settings.showSiteDividers}
            onChange={(checked) => setSettingValue('showSiteDividers', checked)}
          />
        </SettingsRow>
        <SettingsRow
          label="Show Card Shadows"
          helpText="Show a shadow under each card."
        >
          <Checkbox
            checked={settings.showCardShadow}
            onChange={(checked) => setSettingValue('showCardShadow', checked)}
          />
        </SettingsRow>
      </section>
      <section>
        <h3>Theme</h3>
        <SettingsRow
          label="Dynamic themes"
          helpText="When you turn on dark mode for your device, Newt's theme will change to match it."
        >
          <Checkbox
            checked={settings.dynamicThemes}
            onChange={(checked) => setSettingValue('dynamicThemes', checked)}
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
                onChange={(ev) => setSettingValue('darkTheme', ev.target.value)}
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
              onChange={(ev) => setSettingValue('activeTheme', ev.target.value)}
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
          {getCurrentTheme().id.startsWith('custom') ? (
            <>
              <Button
                text="Customize Theme"
                onClick={editTheme}
                disabled={!getCurrentTheme().id.startsWith('custom')}
              />
              <Button
                text={'Delete Theme'}
                type={ControlType.Danger}
                clickToConfirm={settings.confirmBeforeDelete}
                onClick={deleteTheme}
                disabled={!getCurrentTheme().id.startsWith('custom')}
              />
            </>
          ) : null}
        </div>
      </section>
    </Dialog>
  );
}
