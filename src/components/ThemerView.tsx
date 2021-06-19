import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import { ButtonKind } from '../enums/buttonKind';
import { ButtonType } from '../enums/buttonType';
import { Theme } from '../models/Theme';
import { SettingsContext } from '../SettingsContext';
import { IconButton } from '../ui-components/button';
import { Button } from '../ui-components/button/Button';
import { Card, CardHeader } from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent } from '../ui-components/panel';
import { SettingsRow } from '../ui-components/panel/SettingsRow';
import styles from './ThemerView.module.css';

export type ThemerViewProps = {};

export function ThemerView(props: ThemerViewProps) {
  const [workingTheme, setWorkingTheme] = useState<Theme>(null as any);
  const [showConfig, setShowconfig] = useState(false);
  const [themePreviewStyles, setThemePreviewStyles] = useState<any>({});
  const { settings, setSettings } = useContext(SettingsContext);

  useEffect(() => {
    const currentTheme =
      settings.themes.find((a) => a.id === settings.activeTheme) ||
      settings.themes[0];
    setWorkingTheme(currentTheme);
  }, [settings.activeTheme]);

  useEffect(() => {
    if (!workingTheme) return;

    const styles: any = {};
    workingTheme.base.forEach((a) => (styles[`--${a.id}`] = a.value));
    workingTheme.panel.forEach((a) => (styles[`--${a.id}`] = a.value));
    workingTheme.card.forEach((a) => (styles[`--${a.id}`] = a.value));
    setThemePreviewStyles(styles);
  }, [workingTheme]);

  function setSettingValue(key: string, val: any) {
    setSettings({ ...settings, [key]: val });
  }

  function createNewTheme() {
    const currentTheme =
      settings.themes.find((a) => a.id === settings.activeTheme) ||
      settings.themes[0];

    const newTheme: Theme = {
      id: `custom_${new Date().toISOString()}`,
      name: 'My Custom Theme',
      base: [...currentTheme.base],
      panel: [...currentTheme.panel],
      card: [...currentTheme.card],
    };

    setWorkingTheme(newTheme);
    setShowconfig(true);
  }

  function editTheme() {
    setShowconfig(true);
  }

  function deleteTheme() {
    const newThemes = settings.themes.filter((a) => a.id !== workingTheme.id);

    setSettings({
      ...settings,
      activeTheme: settings.themes[0].id,
      themes: newThemes,
    });
  }

  function updateWorkingThemeColor(section: string, id: string, val: string) {
    const newTheme: any = JSON.parse(JSON.stringify(workingTheme));
    const index = newTheme[section].findIndex((a: any) => a.id === id);
    newTheme[section][index].value = val;

    setWorkingTheme(newTheme);
  }

  function updateWorkingThemeName(name: string) {
    const newTheme: Theme = {
      id: workingTheme.id,
      name: name,
      base: [...workingTheme.base],
      panel: [...workingTheme.panel],
      card: [...workingTheme.card],
    };

    setWorkingTheme(newTheme);
  }

  function cancelConfigureTheme() {
    const theme =
      settings.themes.find((a) => a.id === settings.activeTheme) ||
      settings.themes[0];

    setWorkingTheme(theme);
    setShowconfig(false);
  }

  function saveWorkingTheme() {
    const index = settings.themes.findIndex((a) => a.id === workingTheme.id);

    const newThemes = [...settings.themes];
    if (index >= 0) {
      newThemes[index] = workingTheme;
    } else {
      newThemes.push(workingTheme);
    }

    setShowconfig(false);
    setSettings({
      ...settings,
      activeTheme: workingTheme.id,
      themes: newThemes,
    });
  }

  return (
    <div className={styles.root}>
      {showConfig ? (
        <div className={styles.configContainer}>
          <div className={styles.configureHeader}>
            <h1>Configure</h1>
            <IconButton
              type={ButtonType.Primary}
              onClick={cancelConfigureTheme}
            >
              <MdClose />
            </IconButton>
            <IconButton type={ButtonType.Primary} onClick={saveWorkingTheme}>
              <MdCheck />
            </IconButton>
          </div>
          <div className={styles.configure}>
            <h2>Name</h2>
            <input
              className={styles.themeName}
              defaultValue={workingTheme.name}
              onInput={(ev) => updateWorkingThemeName((ev.target as any).value)}
            />
            {/* <h2>Basic</h2>
            <p>
              Colors defined here will apply to multiple items under the
              Advanced section.
            </p>
            {workingTheme.base.slice(0, 6).map((opt) => (
              <ColorChooser
                key={opt.id}
                name={opt.name}
                variable={opt.id}
                value={opt.value}
                onChange={(color) =>
                  updateWorkingThemeColor('base', opt.id, color)
                }
              />
            ))} */}
            <h2>Advanced</h2>
            <p>
              If you need fine grain control, this is for you. You can customize
              the colors for the general app, panels, cards, and anything else.
              These are the values that will get saved as your theme.
            </p>
            <h3>Base</h3>
            <div className={styles.colorList}>
              {workingTheme.base.map((opt) => (
                <ColorChooser
                  key={opt.id}
                  name={opt.name}
                  variable={opt.id}
                  value={opt.value}
                  onChange={(color) =>
                    updateWorkingThemeColor('base', opt.id, color)
                  }
                />
              ))}
            </div>
            <h3>Panels</h3>
            <div className={styles.colorList}>
              {workingTheme.panel.map((opt) => (
                <ColorChooser
                  key={opt.id}
                  name={opt.name}
                  variable={opt.id}
                  value={opt.value}
                  onChange={(color) =>
                    updateWorkingThemeColor('panel', opt.id, color)
                  }
                />
              ))}
            </div>
            <h3>Cards</h3>
            <div className={styles.colorList}>
              {workingTheme.card.map((opt) => (
                <ColorChooser
                  key={opt.id}
                  name={opt.name}
                  variable={opt.id}
                  value={opt.value}
                  onChange={(color) =>
                    updateWorkingThemeColor('card', opt.id, color)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.settingsContainer}>
          <h1>Choose a Theme</h1>
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
          <Button text="New Theme" onClick={createNewTheme} />
          <Button
            text="Customize Theme"
            onClick={editTheme}
            disabled={!settings.activeTheme.startsWith('custom')}
          />
          <Button
            text="Delete Theme"
            type={ButtonType.Danger}
            onClick={deleteTheme}
            disabled={!settings.activeTheme.startsWith('custom')}
          />
        </div>
      )}
      <div className={styles.previewContainer}>
        <h1>Preview</h1>
        <div className={styles.preview} style={themePreviewStyles}>
          <div className={styles.panels}>
            <div className={styles.basePreview}>
              <p>
                Here's some primary text so you can get an idea how it looks.
              </p>
              <p className={styles.secondaryText}>
                Here's some secondary text so you can get an idea how it looks.
              </p>
              <p className={styles.accent}>
                Here's some text so you can get an idea how the accent color
                looks.
              </p>
              <Button
                type={ButtonType.Primary}
                kind={ButtonKind.Default}
                text="Primary Button"
                onClick={() => {}}
              />
              <Button
                type={ButtonType.Secondary}
                kind={ButtonKind.Default}
                text="Secondary Button"
                onClick={() => {}}
              />
              <Button
                type={ButtonType.Warning}
                kind={ButtonKind.Default}
                text="Warning Button"
                onClick={() => {}}
              />
              <Button
                type={ButtonType.Danger}
                kind={ButtonKind.Default}
                text="Danger Button"
                onClick={() => {}}
              />
            </div>
            <Panel
              options={{
                columns: 1,
                width: 3,
                title: 'Recent Tabs',
              }}
              onOptionsChanged={() => {}}
              onDeletePanel={() => {}}
            >
              <PanelContent columns={1}>
                Here's some primary panel text so you can get an idea how it
                looks.
                <div className={styles.panelSecondaryText}>
                  Here's some secondary panel text so you can get an idea how it
                  looks.
                </div>
                <div className={styles.panelAccent}>
                  Here's some text so you can get an idea how the panel accent
                  color looks.
                </div>
                <Button
                  type={ButtonType.Primary}
                  kind={ButtonKind.Panel}
                  text="Primary Panel Button"
                  onClick={() => {}}
                />
                <Button
                  type={ButtonType.Secondary}
                  kind={ButtonKind.Panel}
                  text="Secondary Panel Button"
                  onClick={() => {}}
                />
                <Button
                  type={ButtonType.Warning}
                  kind={ButtonKind.Panel}
                  text="Warning Panel Button"
                  onClick={() => {}}
                />
                <Button
                  type={ButtonType.Danger}
                  kind={ButtonKind.Panel}
                  text="Danger Panel Button"
                  onClick={() => {}}
                />
                <Card>
                  <CardHeader text="Example Card" />
                  <SiteRow
                    title="Example Website 1"
                    iconUrl={`chrome://favicon/size/32@1x/https://developer.mozilla.org/en-US/`}
                    url={`https://developer.mozilla.org/en-US/`}
                    line3="10 minutes ago"
                  />
                  <SiteRow
                    title="Example Website 2"
                    iconUrl={`chrome://favicon/size/32@1x/https://developer.mozilla.org/en-US/`}
                    url={`https://developer.mozilla.org/en-US/`}
                    line3="10 minutes ago"
                  />
                  <SiteRow
                    title="Example Website 3"
                    iconUrl={`chrome://favicon/size/32@1x/https://developer.mozilla.org/en-US/`}
                    url={`https://developer.mozilla.org/en-US/`}
                    line3="10 minutes ago"
                  />
                  <Button
                    type={ButtonType.Primary}
                    kind={ButtonKind.Card}
                    text="Primary Card Button"
                    onClick={() => {}}
                  />
                  <Button
                    type={ButtonType.Secondary}
                    kind={ButtonKind.Card}
                    text="Secondary Card Button"
                    onClick={() => {}}
                  />
                  <Button
                    type={ButtonType.Warning}
                    kind={ButtonKind.Card}
                    text="Warning Card Button"
                    onClick={() => {}}
                  />
                  <Button
                    type={ButtonType.Danger}
                    kind={ButtonKind.Card}
                    text="Danger Card Button"
                    onClick={() => {}}
                  />
                </Card>
              </PanelContent>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

type ColorChooserProps = {
  name: string;
  variable: string;
  value: string;
  onChange: (newVal: string) => void;
};

function ColorChooser(props: ColorChooserProps) {
  function handleColorChange(ev: any) {
    props.onChange(ev.target.value);
  }
  return (
    <div className={styles.colorChooser}>
      <div className={styles.colorName}>{props.name}</div>
      <input
        className={styles.colorInput}
        value={props.value}
        onChange={handleColorChange}
        readOnly={false}
      />
      <input
        type="color"
        className={styles.colorPreview}
        value={props.value}
        onInput={handleColorChange}
      ></input>
    </div>
  );
}
