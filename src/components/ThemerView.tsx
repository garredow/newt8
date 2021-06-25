import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  MdCheck,
  MdClose,
  MdExpandLess,
  MdExpandMore,
  MdSettings,
} from 'react-icons/md';
import { ButtonKind } from '../enums/buttonKind';
import { ButtonType } from '../enums/buttonType';
import { ComponentBase } from '../models/ComponentBase';
import { Theme, ThemeColor, ThemeValues } from '../models/Theme';
import { SettingsContext } from '../SettingsContext';
import { IconButton } from '../ui-components/button';
import { Button } from '../ui-components/button/Button';
import { Card, CardHeader } from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent } from '../ui-components/panel';
import { SettingsRow } from '../ui-components/panel/SettingsRow';
import { isDarkMode } from '../utilities/isDarkMode';
import styles from './ThemerView.module.css';

export type ThemerViewProps = ComponentBase & {};

type Section = {
  title: string;
  colors: (keyof ThemeValues)[];
};

const basicSections: Section[] = [
  {
    title: 'Base',
    colors: [
      'appBgColor',
      'appAccentColor',
      'panelBgColor',
      'cardBgColor',
      'sidebarBgColor',
    ],
  },
  {
    title: 'Text',
    colors: [
      'primaryTextColor',
      'secondaryTextColor',
      'warningTextColor',
      'errorTextColor',
    ],
  },
  {
    title: 'Buttons',
    colors: [
      'primaryButtonBgColor',
      'primaryButtonTextColor',
      'secondaryButtonBgColor',
      'secondaryButtonTextColor',
      'warningButtonBgColor',
      'warningButtonTextColor',
      'dangerButtonBgColor',
      'dangerButtonTextColor',
    ],
  },
];

const sections: Section[] = [
  {
    title: 'Base',
    colors: [
      'appBgColor',
      'appAccentColor',
      'primaryTextColor',
      'secondaryTextColor',
      'warningTextColor',
      'errorTextColor',
      'primaryButtonBgColor',
      'primaryButtonTextColor',
      'secondaryButtonBgColor',
      'secondaryButtonTextColor',
      'warningButtonBgColor',
      'warningButtonTextColor',
      'dangerButtonBgColor',
      'dangerButtonTextColor',
    ],
  },
  {
    title: 'Panels',
    colors: [
      'panelBgColor',
      'panelAccentColor',
      'panelDividerColor',
      'panelTitleTextColor',
      'panelPrimaryTextColor',
      'panelSecondaryTextColor',
      'panelPrimaryButtonBgColor',
      'panelPrimaryButtonTextColor',
      'panelSecondaryButtonBgColor',
      'panelSecondaryButtonTextColor',
      'panelWarningButtonBgColor',
      'panelWarningButtonTextColor',
      'panelDangerButtonBgColor',
      'panelDangerButtonTextColor',
    ],
  },
  {
    title: 'Cards',
    colors: [
      'cardBgColor',
      'cardAccentColor',
      'cardDividerColor',
      'cardTitleTextColor',
      'cardPrimaryTextColor',
      'cardSecondaryTextColor',
      'cardPrimaryButtonBgColor',
      'cardPrimaryButtonTextColor',
      'cardSecondaryButtonBgColor',
      'cardSecondaryButtonTextColor',
      'cardWarningButtonBgColor',
      'cardWarningButtonTextColor',
      'cardDangerButtonBgColor',
      'cardDangerButtonTextColor',
    ],
  },
  {
    title: 'Sidebar',
    colors: [
      'sidebarBgColor',
      'sidebarAccentColor',
      'sidebarDividerColor',
      'sidebarTitleTextColor',
      'sidebarPrimaryTextColor',
      'sidebarSecondaryTextColor',
      'sidebarPrimaryButtonBgColor',
      'sidebarPrimaryButtonTextColor',
      'sidebarSecondaryButtonBgColor',
      'sidebarSecondaryButtonTextColor',
      'sidebarWarningButtonBgColor',
      'sidebarWarningButtonTextColor',
      'sidebarDangerButtonBgColor',
      'sidebarDangerButtonTextColor',
    ],
  },
];

export function ThemerView(props: ThemerViewProps) {
  const [workingTheme, setWorkingTheme] = useState<Theme>(null as any);
  const [showConfig, setShowconfig] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [themePreviewStyles, setThemePreviewStyles] = useState<any>({});
  const { settings, setSettings } = useContext(SettingsContext);

  useEffect(() => {
    const currentTheme = getCurrentTheme();
    setWorkingTheme(currentTheme);
  }, [
    settings.activeTheme,
    settings.lightTheme,
    settings.darkTheme,
    settings.dynamicThemes,
  ]);

  useEffect(() => {
    if (!workingTheme) return;

    const styles: any = {};
    for (const id in workingTheme.values) {
      styles[`--${workingTheme.values[id as keyof ThemeValues].variable}`] =
        workingTheme.values[id as keyof ThemeValues].value;
    }
    setThemePreviewStyles(styles);
  }, [workingTheme]);

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
    const newTheme: Theme = {
      id: `custom_${new Date().toISOString()}`,
      name: 'My Custom Theme',
      values: { ...getCurrentTheme().values },
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

  function updateWorkingThemeColor(id: string, val: string) {
    const newTheme: Theme = JSON.parse(JSON.stringify(workingTheme));
    newTheme.values[id as keyof ThemeValues].value = val;
    console.log('newtheme', newTheme);

    setWorkingTheme(newTheme);
  }

  function updateBasicWorkingThemeColor(id: keyof ThemeValues, val: string) {
    const newTheme: Theme = JSON.parse(JSON.stringify(workingTheme));

    // TODO: Find a better way?
    switch (id) {
      case 'appBgColor':
        newTheme.values.appBgColor.value = val;
        break;
      case 'appAccentColor':
        newTheme.values.appAccentColor.value = val;
        newTheme.values.panelAccentColor.value = val;
        newTheme.values.cardAccentColor.value = val;
        newTheme.values.sidebarAccentColor.value = val;
        break;
      case 'panelBgColor':
        newTheme.values.panelBgColor.value = val;
        break;
      case 'cardBgColor':
        newTheme.values.cardBgColor.value = val;
        break;
      case 'sidebarBgColor':
        newTheme.values.sidebarBgColor.value = val;
        break;
      case 'primaryTextColor':
        newTheme.values.primaryTextColor.value = val;
        newTheme.values.panelTitleTextColor.value = val;
        newTheme.values.panelPrimaryTextColor.value = val;
        newTheme.values.cardTitleTextColor.value = val;
        newTheme.values.cardPrimaryTextColor.value = val;
        newTheme.values.sidebarPrimaryTextColor.value = val;
        break;
      case 'secondaryTextColor':
        newTheme.values.secondaryTextColor.value = val;
        newTheme.values.panelDividerColor.value = val;
        newTheme.values.panelSecondaryTextColor.value = val;
        newTheme.values.cardDividerColor.value = val;
        newTheme.values.cardSecondaryTextColor.value = val;
        newTheme.values.sidebarSecondaryTextColor.value = val;
        break;
      case 'warningTextColor':
        newTheme.values.warningTextColor.value = val;
        break;
      case 'errorTextColor':
        newTheme.values.errorTextColor.value = val;
        break;
      case 'primaryButtonBgColor':
        newTheme.values.primaryButtonBgColor.value = val;
        newTheme.values.panelPrimaryButtonBgColor.value = val;
        newTheme.values.cardPrimaryButtonBgColor.value = val;
        newTheme.values.sidebarPrimaryButtonBgColor.value = val;
        break;
      case 'primaryButtonTextColor':
        newTheme.values.primaryButtonTextColor.value = val;
        newTheme.values.panelPrimaryButtonTextColor.value = val;
        newTheme.values.cardPrimaryButtonTextColor.value = val;
        newTheme.values.sidebarPrimaryButtonTextColor.value = val;
        break;
      case 'secondaryButtonBgColor':
        newTheme.values.secondaryButtonBgColor.value = val;
        newTheme.values.panelSecondaryButtonBgColor.value = val;
        newTheme.values.cardSecondaryButtonBgColor.value = val;
        newTheme.values.sidebarSecondaryButtonBgColor.value = val;
        break;
      case 'secondaryButtonTextColor':
        newTheme.values.secondaryButtonTextColor.value = val;
        newTheme.values.panelSecondaryButtonTextColor.value = val;
        newTheme.values.cardSecondaryButtonTextColor.value = val;
        newTheme.values.sidebarSecondaryButtonTextColor.value = val;
        break;
      case 'warningButtonBgColor':
        newTheme.values.warningButtonBgColor.value = val;
        newTheme.values.panelWarningButtonBgColor.value = val;
        newTheme.values.cardWarningButtonBgColor.value = val;
        newTheme.values.sidebarWarningButtonBgColor.value = val;
        break;
      case 'warningButtonTextColor':
        newTheme.values.warningButtonTextColor.value = val;
        newTheme.values.panelWarningButtonTextColor.value = val;
        newTheme.values.cardWarningButtonTextColor.value = val;
        newTheme.values.sidebarWarningButtonTextColor.value = val;
        break;
      case 'dangerButtonBgColor':
        newTheme.values.dangerButtonBgColor.value = val;
        newTheme.values.panelDangerButtonBgColor.value = val;
        newTheme.values.cardDangerButtonBgColor.value = val;
        newTheme.values.sidebarDangerButtonBgColor.value = val;
        break;
      case 'dangerButtonTextColor':
        newTheme.values.dangerButtonTextColor.value = val;
        newTheme.values.panelDangerButtonTextColor.value = val;
        newTheme.values.cardDangerButtonTextColor.value = val;
        newTheme.values.sidebarDangerButtonTextColor.value = val;
        break;
    }

    setWorkingTheme(newTheme);
  }

  function updateWorkingThemeName(name: string) {
    const newTheme: Theme = {
      id: workingTheme.id,
      name: name,
      values: { ...workingTheme.values },
    };

    setWorkingTheme(newTheme);
  }

  function cancelConfigureTheme() {
    const theme = getCurrentTheme();

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

    const themeKey = settings.dynamicThemes
      ? isDarkMode()
        ? 'darkTheme'
        : 'lightTheme'
      : 'activeTheme';

    setShowconfig(false);
    setSettings({
      ...settings,
      [themeKey]: workingTheme.id,
      themes: newThemes,
    });
  }

  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      {showConfig ? (
        <div className={styles.configContainer}>
          <div className={styles.configureHeader}>
            <h1>Configure</h1>
            <IconButton
              type={ButtonType.Primary}
              icon={<MdClose />}
              title="Discard changes"
              onClick={cancelConfigureTheme}
            />
            <IconButton
              type={ButtonType.Primary}
              icon={<MdCheck />}
              title="Save theme"
              onClick={saveWorkingTheme}
            />
          </div>
          <div className={styles.configure}>
            <h2>Name</h2>
            <input
              className={styles.themeName}
              defaultValue={workingTheme.name}
              onInput={(ev) => updateWorkingThemeName((ev.target as any).value)}
            />
            <h2>Basic</h2>
            <p>
              You can click on a color block to bring up a color picker, or type
              in your values manually. Each field accepts all color formats
              (hex, rgb, hsl, etc). Colors with transpanency may not display
              100% correctly in the color block. I highly recommend a site like{' '}
              <a
                href="https://coolors.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Coolors
              </a>{' '}
              for palette ideas and experimentation.
            </p>
            <p>Need more control? Head down to the advanced section.</p>
            {basicSections.map((section) => (
              <div key={section.title}>
                <h3>{section.title}</h3>
                <div className={styles.colorList}>
                  {section.colors.map((colorKey) => (
                    <ColorChooser
                      key={colorKey}
                      id={colorKey}
                      color={workingTheme.values[colorKey]}
                      onChange={updateBasicWorkingThemeColor}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className={styles.mainSectionHeader}>
              <h2>Advanced</h2>
              <IconButton
                type={ButtonType.Primary}
                icon={showAdvanced ? <MdExpandLess /> : <MdExpandMore />}
                title="Toggle advanced theme options"
                onClick={() => setShowAdvanced(!showAdvanced)}
              />
            </div>
            {showAdvanced ? (
              <>
                <p>
                  Here you can individually customize the colors for the general
                  app, panels, cards, and anything else. These are the values
                  that will get saved as your theme.
                </p>
                {sections.map((section) => (
                  <div key={section.title}>
                    <h3>{section.title}</h3>
                    <div className={styles.colorList}>
                      {section.colors.map((colorKey) => (
                        <ColorChooser
                          key={colorKey}
                          id={colorKey}
                          color={workingTheme.values[colorKey]}
                          onChange={updateWorkingThemeColor}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : null}
          </div>
        </div>
      ) : (
        <div className={styles.settingsContainer}>
          <h1>Choose a Theme</h1>
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
            <DragDropContext onDragEnd={() => {}}>
              <Droppable droppableId="preview" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ gridColumn: `span 3` }}
                  >
                    <Panel
                      panelId="test"
                      panelIndex={0}
                      options={{
                        columns: 1,
                        width: 3,
                        title: 'Example Panel',
                      }}
                      onOptionsChanged={() => {}}
                      onDeletePanel={() => {}}
                    >
                      <PanelContent columns={1}>
                        Here's some primary panel text so you can get an idea
                        how it looks.
                        <div className={styles.panelSecondaryText}>
                          Here's some secondary panel text so you can get an
                          idea how it looks.
                        </div>
                        <div className={styles.panelAccent}>
                          Here's some text so you can get an idea how the panel
                          accent color looks.
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
                )}
              </Droppable>
            </DragDropContext>
            <div className={styles.sidebar}>
              <div className={styles.sidebarPages}>
                <div className={styles.sidebarAccentText}>ACTIVE PAGE</div>
                <div className={styles.sidebarPrimaryText}>INACTIVE PAGE</div>
              </div>
              <div>
                <IconButton
                  size={48}
                  title="Example"
                  type={ButtonType.Primary}
                  kind={ButtonKind.SideBar}
                  icon={<MdSettings />}
                  onClick={() => {}}
                />
                <IconButton
                  size={48}
                  title="Example"
                  type={ButtonType.Secondary}
                  kind={ButtonKind.SideBar}
                  icon={<MdSettings />}
                  onClick={() => {}}
                />
                <IconButton
                  size={48}
                  title="Example"
                  type={ButtonType.Warning}
                  kind={ButtonKind.SideBar}
                  icon={<MdSettings />}
                  onClick={() => {}}
                />
                <IconButton
                  size={48}
                  title="Example"
                  type={ButtonType.Danger}
                  kind={ButtonKind.SideBar}
                  icon={<MdSettings />}
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ColorChooserProps = {
  id: keyof ThemeValues;
  color: ThemeColor;
  onChange: (id: keyof ThemeValues, newVal: string) => void;
};

function ColorChooser({ id, color, onChange }: ColorChooserProps) {
  function handleColorChange(ev: any) {
    onChange(id, ev.target.value);
  }

  const isHex = new RegExp(/#[0-9a-fA-F]{6}/).test(color.value);

  return (
    <div className={styles.colorChooser}>
      <div className={styles.colorName}>{color.name}</div>
      <input
        className={styles.colorInput}
        value={color.value}
        onChange={handleColorChange}
        readOnly={false}
      />
      <div className={styles.colorPreviewContainer}>
        <input
          type="color"
          className={styles.colorPreviewInput}
          value={isHex ? color.value : '#000000'} // It complains if the value isn't hex
          onInput={handleColorChange}
        ></input>
        <div
          className={styles.colorPreview}
          style={{ backgroundColor: color.value }}
        ></div>
      </div>
    </div>
  );
}
