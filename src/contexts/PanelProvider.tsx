import React, { useEffect, useState } from 'react';
import { PanelDisplayType } from '../enums/panelDisplayType';
import { ComponentBaseProps } from '../models/ComponentBaseProps';
import { Panel } from '../models/Panel';
import { useAppSettings } from './AppSettingsProvider';
import {
  defaultPanelSettings,
  PanelContext,
  PanelSettings,
} from './PanelContext';

type PanelProviderProps = ComponentBaseProps & {
  panel: Panel<PanelSettings>;
};

export function PanelProvider({ panel, ...props }: PanelProviderProps) {
  const [settings, setSettings] = useState<PanelSettings>(defaultPanelSettings);

  const { settings: appSettings } = useAppSettings();

  useEffect(() => {
    // Figure out settings here so rest of panel doesn't have to
    const newSettings: PanelSettings = {
      ...panel.options,
      ...appSettings,
      displayStyle:
        panel.options.displayStyle === PanelDisplayType.Default
          ? appSettings.defaultPanelDisplay
          : panel.options.displayStyle,
    };

    setSettings(newSettings);
  }, [appSettings, panel.options]);
  return (
    <PanelContext.Provider
      value={{
        settings,
      }}
    >
      {props.children}
    </PanelContext.Provider>
  );
}

export function usePanel() {
  const context = React.useContext(PanelContext);
  if (context === undefined) {
    throw new Error('usePages must be used within a PanelProvider');
  }
  return context;
}
