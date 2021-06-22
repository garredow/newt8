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

  useEffect(() => {
    getItem<Settings>(StorageKey.Settings).then((res = defaultSettings) => {
      const theme =
        res.themes.find((a) => a.id === res.activeTheme) || res.themes[0];
      applyTheme(theme);
      setSettingsInternal(res || defaultSettings);
    });

    getItem<Page[]>(StorageKey.Pages).then((res = defaultPages) => {
      setPagesInternal(res || defaultPages);
    });
  }, []);

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
    const theme =
      val.themes.find((a) => a.id === val.activeTheme) || val.themes[0];
    applyTheme(theme);
    await setItem<Settings>(StorageKey.Settings, val);
  }

  async function setPages(val: Page[]) {
    setPagesInternal(val);
    await setItem<Page[]>(StorageKey.Pages, val);
  }

  async function savePage(page: Page) {
    const newPages = [...pages];
    const index = newPages.findIndex((a) => a.id === page.id);
    if (index === -1) {
      newPages.push(page);
    } else {
      newPages[index] = page;
    }
    setPages(newPages);
  }

  return (
    <MemoryRouter initialEntries={['/dashboard']}>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <PagesContext.Provider value={{ pages, setPages, savePage }}>
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
