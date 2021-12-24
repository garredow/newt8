import '@reach/dialog/styles.css';
import React, { useEffect, useState } from 'react';
import { MemoryRouter, Redirect, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import { DashboardView } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { ThemeView } from './components/ThemeView';
import { useAppSettings } from './contexts/AppSettingsProvider';
import { Settings } from './models/Settings';
import { Theme, ThemeValues } from './models/Theme';

function App() {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const { settings } = useAppSettings();

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

  return (
    <MemoryRouter initialEntries={['/dashboard']}>
      <div className={styles.root} data-base>
        <Switch>
          <Route path="/dashboard">
            <DashboardView />
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
    </MemoryRouter>
  );
}

export default App;
