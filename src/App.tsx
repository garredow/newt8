import React, { useEffect, useState } from 'react';
import { MemoryRouter, Switch, Route, Redirect } from 'react-router-dom';
import { DashboardView } from './components/Dashboard';
import { defaultSettings, SettingsContext } from './SettingsContext';
import { Settings } from './models/Settings';
import { getItem, setItem, StorageKey } from './utilities/storage';
import styles from './App.module.css';
import { SettingsView } from './components/SettingsView';
import { ThemerView } from './components/ThemerView';
import { Theme, ThemeValues } from './models/Theme';
import { Sidebar } from './components/Sidebar';
import { Page } from './services/panels';
import { defaultPages, PagesContext } from './PagesContext';

function App() {
  const [settings, setSettingsInternal] = useState<Settings>(defaultSettings);
  const [pages, setPagesInternal] = useState<Page[]>([]);
  const [themeStyles, setThemeStyles] = useState<any>({});
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    getItem<Settings>(StorageKey.Settings).then((res = defaultSettings) => {
      const isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      changeTheme({ ...defaultSettings, ...res }, isDarkMode);
      setSettingsInternal({ ...defaultSettings, ...res });
    });

    getItem<Page[]>(StorageKey.Pages).then((res = defaultPages) => {
      setPagesInternal(res || defaultPages);
    });
  }, []);

  useEffect(() => {
    function handleColorScheme(ev: MediaQueryListEvent) {
      setDarkMode(ev.matches);
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleColorScheme);

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleColorScheme);
  }, []);

  useEffect(() => changeTheme(settings, darkMode), [darkMode, settings]);

  function changeTheme(sett: Settings, dark?: boolean) {
    let theme;

    if (sett.dynamicThemes) {
      theme = sett.themes.find(
        (a) => a.id === (dark ? sett.darkTheme : sett.lightTheme)
      );
    } else {
      theme = sett.themes.find((a) => a.id === sett.activeTheme);
    }

    applyTheme(theme || sett.themes[0]);
  }

  function applyTheme(theme: Theme) {
    const styles: any = {};
    for (const id in theme.values) {
      styles[`--${theme.values[id as keyof ThemeValues].variable}`] =
        theme.values[id as keyof ThemeValues].value;
    }
    setThemeStyles(styles);
  }

  async function setSettings(val: Settings) {
    setSettingsInternal(val);
    await setItem<Settings>(StorageKey.Settings, val);
  }

  async function setPages(val: Page[]) {
    setPagesInternal(val);
    await setItem<Page[]>(StorageKey.Pages, val);
  }

  async function savePage(page: Page) {
    let newPages = [...pages];
    const index = newPages.findIndex((a) => a.id === page.id);
    if (index === -1) {
      newPages.push(page);
    } else {
      newPages[index] = page;
    }

    // New page gets to be active
    if (index === -1) {
      newPages = newPages.map((a, i) =>
        i === newPages.length - 1
          ? { ...a, isActive: true }
          : { ...a, isActive: false }
      );
    }
    setPages(newPages);
  }

  async function deletePage(pageId: string) {
    if (pages.length === 1) {
      console.warn('Cannot delete. There must always be one page.');
      return;
    }
    const newPages = pages
      .filter((a) => a.id !== pageId)
      .map((a, i) =>
        i === 0 ? { ...a, isActive: true } : { ...a, isActive: false }
      );

    setPages(newPages);
  }

  return (
    <MemoryRouter initialEntries={['/dashboard']}>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <PagesContext.Provider
          value={{ pages, setPages, savePage, deletePage }}
        >
          <div className={styles.root} style={themeStyles}>
            <Switch>
              <Route path="/dashboard">
                <DashboardView />
              </Route>
              <Route path="/settings">
                <SettingsView />
              </Route>
              <Route path="/themer">
                <ThemerView />
              </Route>
              <Route path="/about">About</Route>
              <Route path="*">
                <Redirect to="/dashboard" />
              </Route>
            </Switch>
            <Sidebar />
          </div>
        </PagesContext.Provider>
      </SettingsContext.Provider>
    </MemoryRouter>
  );
}

export default App;
