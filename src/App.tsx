import React, { useEffect, useState } from 'react';
import { DashboardView } from './components/Dashboard';
import { defaultSettings, SettingsContext } from './SettingsContext';
import { Settings } from './models/Settings';
import { getItem, setItem } from './services/chromeService';
import { STORAGE_KEY } from './utilities/storage';
import './App.css';

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
      <div className="App">
        {/* <div className="App__sidebar"></div> */}
        <DashboardView />
      </div>
    </SettingsContext.Provider>
  );
}

export default App;
