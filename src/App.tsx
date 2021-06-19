import React, { useEffect, useState } from 'react';
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom';
import { DashboardView } from './components/Dashboard';
import { defaultSettings, SettingsContext } from './SettingsContext';
import { Settings } from './models/Settings';
import { getItem, setItem } from './services/chromeService';
import { STORAGE_KEY } from './utilities/storage';
import styles from './App.module.css';
import { SettingsView } from './components/SettingsView';
import { IconButton } from './ui-components/button';
import { MdBrush, MdDashboard } from 'react-icons/md';
import { ButtonType } from './enums/buttonType';
import { ThemerView } from './components/ThemerView';
import { Theme, ThemeValues } from './models/Theme';

function App() {
  const [settings, setSettingsInternal] = useState<Settings>(defaultSettings);
  const [themeStyles, setThemeStyles] = useState<any>({});

  useEffect(() => {
    getItem<Settings>(STORAGE_KEY.SETTINGS).then((res = defaultSettings) => {
      const theme =
        res.themes.find((a) => a.id === res.activeTheme) || res.themes[0];
      applyTheme(theme);
      setSettingsInternal(res || defaultSettings);
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
    await setItem<Settings>(STORAGE_KEY.SETTINGS, val);
  }

  return (
    <MemoryRouter initialEntries={['/dashboard']}>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <div className={styles.root} style={themeStyles}>
          <div className={styles.sidebar}>
            <Link to="/themer">
              <IconButton
                size={40}
                type={ButtonType.Primary}
                onClick={() => {}}
              >
                <MdBrush />
              </IconButton>
            </Link>
            <Link to="/dashboard">
              <IconButton
                size={40}
                type={ButtonType.Primary}
                onClick={() => {}}
              >
                <MdDashboard />
              </IconButton>
            </Link>
          </div>
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
          </Switch>
        </div>
      </SettingsContext.Provider>
    </MemoryRouter>
  );
}

export default App;
