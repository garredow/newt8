import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  MdCheck,
  MdClose,
  MdCode,
  MdExpandLess,
  MdExpandMore,
  MdSettings,
} from 'react-icons/md';
import { useHistory, useLocation } from 'react-router-dom';
import { ControlKind } from '../enums/controlKind';
import { ButtonType } from '../enums/buttonType';
import { PanelDisplayType } from '../enums/panelDisplayType';
import { ComponentBase } from '../models/ComponentBase';
import { Theme, ThemeValue, ThemeValues } from '../models/Theme';
import { SettingsContext } from '../SettingsContext';
import { IconButton } from '../ui-components/button';
import { Button } from '../ui-components/button/Button';
import { Card, CardHeader } from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent } from '../ui-components/panel';
import { isDarkMode } from '../utilities/isDarkMode';
import styles from './ThemeView.module.css';

export type ThemeViewProps = ComponentBase & {};

type Section = {
  title: string;
  colors: (keyof ThemeValues)[];
  sizes: (keyof ThemeValues)[];
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
    sizes: [],
  },
  {
    title: 'Text',
    colors: [
      'primaryTextColor',
      'secondaryTextColor',
      'warningTextColor',
      'errorTextColor',
    ],
    sizes: [],
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
    sizes: [],
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
    sizes: ['baseTextSize', 'baseTextWeight'],
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
    sizes: ['panelTitleTextSize', 'panelTitleTextWeight'],
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
    sizes: ['cardTitleTextSize', 'cardTitleTextWeight'],
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
    sizes: ['sidebarTitleTextSize'],
  },
];

export function ThemeView(props: ThemeViewProps) {
  const [workingTheme, setWorkingTheme] = useState<Theme>(null as any);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [themeJson, setThemeJson] = useState<string>('');
  const [showJson, setShowJson] = useState(false);
  const [themeImportError, setThemeImportError] = useState(false);
  const [themePreviewStyles, setThemePreviewStyles] = useState<any>({});
  const { settings, setSettings } = useContext(SettingsContext);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setTheme((location.state as any).theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  useEffect(() => {
    if (!workingTheme) return;

    const styles: any = {};
    for (const id in workingTheme.values) {
      styles[`--${workingTheme.values[id as keyof ThemeValues].variable}`] =
        workingTheme.values[id as keyof ThemeValues].value;
    }
    setThemePreviewStyles(styles);
  }, [workingTheme]);

  function setTheme(theme: Theme) {
    setWorkingTheme(theme);
    setThemeJson(JSON.stringify(theme));
  }

  function updateWorkingThemeColor(id: string, val: string) {
    const newTheme: Theme = JSON.parse(JSON.stringify(workingTheme));
    newTheme.values[id as keyof ThemeValues].value = val;

    setTheme(newTheme);
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
      case 'baseTextSize':
        newTheme.values.baseTextSize.value = val;
        break;
    }

    setTheme(newTheme);
  }

  function updateWorkingThemeName(name: string) {
    const newTheme: Theme = {
      id: workingTheme.id,
      name: name,
      values: { ...workingTheme.values },
    };

    setTheme(newTheme);
  }

  function cancelConfigureTheme() {
    history.goBack();
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

    setSettings({
      ...settings,
      [themeKey]: workingTheme.id,
      themes: newThemes,
    });

    history.goBack();
  }

  function exportTheme(json: string) {
    navigator.clipboard.writeText(json).catch(() => {});
  }

  function importTheme(json: string) {
    try {
      setThemeImportError(false);
      const importedTheme: Theme = JSON.parse(json);
      const newTheme: Theme = {
        id: `custom_${new Date().toISOString()}`,
        name: importedTheme.name,
        values: {
          ...settings.themes[0].values,
          ...importedTheme.values,
        },
      };

      setTheme(newTheme);
    } catch (err) {
      console.error('Failed to import theme', err);
      setThemeImportError(true);
    }
  }

  if (!workingTheme) return null;

  return (
    <div className={styles.root} data-testid={props['data-testid']}>
      <div className={styles.configContainer}>
        <div className={styles.configureHeader}>
          <h1>Configure</h1>
          <IconButton
            type={ButtonType.Primary}
            icon={<MdCode />}
            title="Import/export theme"
            onClick={() => {
              setThemeImportError(false);
              setShowJson(!showJson);
            }}
          />
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
          {showJson ? (
            <div className={styles.importExportTheme}>
              <p>
                You can use this text field to import/export a custom theme. To
                import, just drop in your JSON and click apply.
              </p>
              <textarea
                className={styles.themeJson}
                value={themeJson}
                onChange={(ev) => setThemeJson(ev.target.value)}
                rows={5}
              />
              <Button text="Apply" onClick={() => importTheme(themeJson)} />
              <Button
                text="Copy to clipboard"
                onClick={() => exportTheme(themeJson)}
              />
              {themeImportError ? (
                <p className={styles.importError}>Failed to import theme.</p>
              ) : null}
            </div>
          ) : null}
          <h2>Name</h2>
          <input
            className={styles.themeName}
            value={workingTheme.name}
            onInput={(ev) => updateWorkingThemeName((ev.target as any).value)}
          />
          <h2>Basic</h2>
          <p>
            You can click on a color block to bring up a color picker, or type
            in your values manually. Each field accepts all color formats (hex,
            rgb, hsl, etc). Colors with transparency may not display 100%
            correctly in the color block. I highly recommend a site like{' '}
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
              {section.sizes.length > 0 ? (
                <>
                  <h4>Sizes</h4>
                  <div className={styles.themeValueList}>
                    {section.sizes.map((key) => (
                      <ThemeValueChooser
                        key={key}
                        id={key}
                        data={workingTheme.values[key]}
                        onChange={updateBasicWorkingThemeColor}
                      />
                    ))}
                  </div>
                </>
              ) : null}
              <h4>Colors</h4>
              <div className={styles.themeValueList}>
                {section.colors.map((key) => (
                  <ThemeValueChooser
                    key={key}
                    id={key}
                    data={workingTheme.values[key]}
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
                app, panels, cards, and anything else. These are the values that
                will get saved as your theme.
              </p>
              {sections.map((section) => (
                <div key={section.title}>
                  <h3>{section.title}</h3>
                  {section.sizes.length > 0 ? (
                    <>
                      <h4>Sizes</h4>
                      <div className={styles.themeValueList}>
                        {section.sizes.map((key) => (
                          <ThemeValueChooser
                            key={key}
                            id={key}
                            data={workingTheme.values[key]}
                            onChange={updateWorkingThemeColor}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}

                  <h4>Colors</h4>
                  <div className={styles.themeValueList}>
                    {section.colors.map((colorKey) => (
                      <ThemeValueChooser
                        key={colorKey}
                        id={colorKey}
                        data={workingTheme.values[colorKey]}
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
                Here's some accent text so you can get an idea how it looks.
              </p>
              <p className={styles.warningText}>
                Here's some warning text so you can get an idea how it looks.
              </p>
              <p className={styles.errorText}>
                Here's some error text so you can get an idea how it looks.
              </p>
              <Button
                type={ButtonType.Primary}
                kind={ControlKind.Default}
                text="Primary Button"
                onClick={() => {}}
              />
              <Button
                type={ButtonType.Secondary}
                kind={ControlKind.Default}
                text="Secondary Button"
                onClick={() => {}}
              />
              <Button
                type={ButtonType.Warning}
                kind={ControlKind.Default}
                text="Warning Button"
                onClick={() => {}}
              />
              <Button
                type={ButtonType.Danger}
                kind={ControlKind.Default}
                text="Danger Button"
                onClick={() => {}}
              />
            </div>

            <Panel
              panelId="test"
              panelIndex={0}
              options={{
                columns: 1,
                display: PanelDisplayType.Default,
                title: 'Example Panel',
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
                  Here's some accent panel text so you can get an idea how it
                  looks.
                </div>
                <div className={styles.warningText}>
                  Here's some warning panel text so you can get an idea how it
                  looks.
                </div>
                <div className={styles.errorText}>
                  Here's some error panel text so you can get an idea how it
                  looks.
                </div>
                <Button
                  type={ButtonType.Primary}
                  kind={ControlKind.Panel}
                  text="Primary Panel Button"
                  onClick={() => {}}
                />
                <Button
                  type={ButtonType.Secondary}
                  kind={ControlKind.Panel}
                  text="Secondary Panel Button"
                  onClick={() => {}}
                />
                <Button
                  type={ButtonType.Warning}
                  kind={ControlKind.Panel}
                  text="Warning Panel Button"
                  onClick={() => {}}
                />
                <Button
                  type={ButtonType.Danger}
                  kind={ControlKind.Panel}
                  text="Danger Panel Button"
                  onClick={() => {}}
                />
                <Card>
                  <CardHeader text="Example Card" />
                  <div className={styles.cardTextContainer}>
                    <div className={styles.warningText}>
                      Here's some warning panel text so you can get an idea how
                      it looks.
                    </div>
                    <div className={styles.errorText}>
                      Here's some error panel text so you can get an idea how it
                      looks.
                    </div>
                  </div>
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
                    kind={ControlKind.Card}
                    text="Primary Card Button"
                    onClick={() => {}}
                  />
                  <Button
                    type={ButtonType.Secondary}
                    kind={ControlKind.Card}
                    text="Secondary Card Button"
                    onClick={() => {}}
                  />
                  <Button
                    type={ButtonType.Warning}
                    kind={ControlKind.Card}
                    text="Warning Card Button"
                    onClick={() => {}}
                  />
                  <Button
                    type={ButtonType.Danger}
                    kind={ControlKind.Card}
                    text="Danger Card Button"
                    onClick={() => {}}
                  />
                </Card>
              </PanelContent>
            </Panel>
            <div className={styles.sidebar}>
              <div className={styles.sidebarPages}>
                <div className={styles.sidebarActivePage}>ACTIVE PAGE</div>
                <div className={styles.sidebarPage}>INACTIVE PAGE</div>
              </div>
              <div className={styles.sidebarButtons}>
                <IconButton
                  size={32}
                  title="Example"
                  type={ButtonType.Primary}
                  kind={ControlKind.SideBar}
                  icon={<MdSettings />}
                  onClick={() => {}}
                />
                <IconButton
                  size={32}
                  title="Example"
                  type={ButtonType.Secondary}
                  kind={ControlKind.SideBar}
                  icon={<MdSettings />}
                  onClick={() => {}}
                />
                <IconButton
                  size={32}
                  title="Example"
                  type={ButtonType.Warning}
                  kind={ControlKind.SideBar}
                  icon={<MdSettings />}
                  onClick={() => {}}
                />
                <IconButton
                  size={32}
                  title="Example"
                  type={ButtonType.Danger}
                  kind={ControlKind.SideBar}
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

type ThemeValueChooserProps = {
  id: keyof ThemeValues;
  data: ThemeValue;
  onChange: (id: keyof ThemeValues, newVal: string) => void;
};

function ThemeValueChooser({ id, data, onChange }: ThemeValueChooserProps) {
  function handleColorChange(ev: any) {
    onChange(id, ev.target.value);
  }

  return (
    <div className={styles.colorChooser}>
      <div className={styles.colorName}>{data.name}</div>
      <div className={styles.colorRow}>
        {data.options ? (
          <select value={data.value} onChange={handleColorChange}>
            {data.options.map((a) => (
              <option key={a.key} value={a.key}>
                {a.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={styles.colorInput}
            value={data.value}
            onChange={handleColorChange}
            readOnly={false}
            type={data.type === 'number' ? 'number' : undefined}
          />
        )}
        {data.type === 'color' ? (
          <div className={styles.colorPreviewContainer}>
            <input
              type="color"
              className={styles.colorPreviewInput}
              value={
                new RegExp(/#[0-9a-fA-F]{6}/).test(data.value)
                  ? data.value
                  : '#000000'
              } // It complains if the value isn't hex
              onInput={handleColorChange}
            ></input>
            <div
              className={styles.colorPreview}
              style={{ backgroundColor: data.value }}
            ></div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
