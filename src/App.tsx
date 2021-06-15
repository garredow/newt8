import React, { useEffect, useState } from 'react';
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom';
import { DashboardView } from './components/Dashboard';
import { defaultSettings, SettingsContext } from './SettingsContext';
import { Settings } from './models/Settings';
import { getItem, setItem } from './services/chromeService';
import { STORAGE_KEY } from './utilities/storage';
import styles from './App.module.css';
import { SettingsView } from './components/SettingsView';

function App() {
  const [settings, setSettingsInternal] = useState<Settings>(defaultSettings);

  useEffect(() => {
    getItem<Settings>(STORAGE_KEY.SETTINGS).then((res) =>
      setSettingsInternal(res || defaultSettings)
    );
  }, []);

  async function setSettings(val: Settings) {
    setSettingsInternal(val);
    await setItem<Settings>(STORAGE_KEY.SETTINGS, val);
  }

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <div className={styles.root}>
        {/* <div className={styles.sidebar}></div> */}
        <MemoryRouter initialEntries={['/dashboard']}>
          <Switch>
            <Route path="/dashboard">
              <DashboardView />
            </Route>
            <Route path="/settings">
              <SettingsView />
            </Route>
            <Route path="/about">About</Route>
          </Switch>
        </MemoryRouter>
      </div>
    </SettingsContext.Provider>
  );
}

export default App;
