import React, { useEffect, useState } from 'react';
import { MemoryRouter, Switch, Route, Redirect } from 'react-router-dom';
import { DashboardView } from './components/Dashboard';
import { defaultSettings, SettingsContext } from './SettingsContext';
import { Settings } from './models/Settings';
import { getItem, setItem, StorageKey } from './utilities/storage';
import styles from './App.module.css';
import { SettingsView } from './components/SettingsView';
import { ThemeView } from './components/ThemeView';
import { Theme, ThemeValues } from './models/Theme';
import { Sidebar } from './components/Sidebar';
import { Page } from './services/panels';
import { defaultPages, PagesContext } from './PagesContext';
import '@reach/dialog/styles.css';

function App() {
  const [settings, setSettingsInternal] = useState<Settings>(defaultSettings);
  const [pages, setPagesInternal] = useState<Page[]>([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // Apply theme directly to body to style elements like modals
    for (const id in theme.values) {
      document.body.style.setProperty(
        `--${theme.values[id as keyof ThemeValues].variable}`,
        theme.values[id as keyof ThemeValues].value
      );
    }
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
          <div className={styles.root}>
            <Switch>
              <Route path="/dashboard">
                <DashboardView />
              </Route>
              <Route path="/settings">
                <SettingsView />
              </Route>
              <Route path="/theme">
                <ThemeView />
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
