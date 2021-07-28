import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { PanelDisplayType } from '../enums/panelDisplayType';
import { CardSettings } from '../models/CardSettings';
import { ComponentBaseProps } from '../models/ComponentBaseProps';
import { Panel } from '../models/Panel';
import { useAppSettings } from './AppSettingsProvider';
import { usePages } from './PagesProvider';
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
  const { pages, savePage } = usePages();

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

  async function savePanel(newPanel: Panel): Promise<void> {
    let pageIndex = -1;
    let panelIndex = -1;
    pages.forEach((page, pi) => {
      page.panels.forEach((a, i) => {
        if (a.id === panel.id) {
          pageIndex = pi;
          panelIndex = i;
        }
      });
    });

    if (pageIndex === -1 || panelIndex === -1) return Promise.resolve();

    const newPage = cloneDeep(pages[pageIndex]);
    newPage.panels[panelIndex] = newPanel;

    await savePage(newPage);
  }

  async function saveCardSettings(cardId: string, cardSettings: CardSettings) {
    const newPanel = cloneDeep(panel);
    newPanel.cardSettingsMap[cardId] = cardSettings;

    await savePanel(newPanel);
  }

  return (
    <PanelContext.Provider
      value={{
        settings,
        cardSettingsMap: panel.cardSettingsMap,
        savePanel,
        saveCardSettings,
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
