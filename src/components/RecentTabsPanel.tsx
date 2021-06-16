import React, { useState, useEffect } from 'react';
import { ChromeTab } from '../models/ChromeTab';
import { getRecentTabs } from '../services/tabsService';
import { Card } from '../ui-components/card';
import {
  Panel,
  PanelButton,
  PanelContent,
  PanelHeader,
} from '../ui-components/panel';
import styles from './RecentTabsPanel.module.css';
import { SiteRow } from '../ui-components/card/SiteRow';
import { formatDistance } from 'date-fns';
import { switchToTab } from '../services/chromeService';
import { IconButton } from '../ui-components/button';
import { MdSettings } from 'react-icons/md';
import { ButtonType } from '../enums/buttonType';
import { PanelSettings } from '../ui-components/panel/PanelSettings';
import { SettingsRow } from '../ui-components/panel/SettingsRow';

type RecentTabsPanelOptions = {
  columns: number;
  width: 1 | 2 | 3 | 4 | 5;
};

type RecentTabsPanelProps = {
  options: RecentTabsPanelOptions;
  onOptionsChanged: (options: RecentTabsPanelOptions) => void;
  onDeletePanel: () => void;
};

export function RecentTabsPanel(props: RecentTabsPanelProps) {
  const [tabs, setTabs] = useState<ChromeTab[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    getRecentTabs(true).then((tabs) => {
      setTabs(tabs);
    });
  }, []);

  function setOptionValue(key: string, val: any) {
    const newOpts = { ...props.options, [key]: val };
    props.onOptionsChanged(newOpts);
  }

  return (
    <div
      className={styles.root}
      style={{ gridColumn: `span ${props.options.width}` }}
    >
      <Panel>
        <PanelHeader
          text="Recent Tabs"
          actions={
            <>
              <IconButton onClick={() => setShowSettings(!showSettings)}>
                <MdSettings />
              </IconButton>
            </>
          }
        />
        {showSettings ? (
          <PanelSettings>
            <SettingsRow label="Columns">
              <select
                defaultValue={props.options.columns}
                onChange={(ev) =>
                  setOptionValue('columns', parseInt(ev.target.value, 10))
                }
              >
                <option value={0}>Auto</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            </SettingsRow>
            <SettingsRow label="Width">
              <select
                defaultValue={props.options.width}
                onChange={(ev) => setOptionValue('width', ev.target.value)}
              >
                <option value={1}>Smallest</option>
                <option value={2}>Small</option>
                <option value={3}>Medium</option>
                <option value={4}>Large</option>
                <option value={5}>Largest</option>
              </select>
            </SettingsRow>
            <PanelButton
              text="Delete"
              type={ButtonType.Danger}
              onClick={props.onDeletePanel}
            ></PanelButton>
          </PanelSettings>
        ) : null}
        <PanelContent columns={props.options.columns}>
          <Card>
            {tabs.map((tab) => (
              <SiteRow
                key={tab.id}
                title={tab.title}
                iconUrl={tab.favIconUrl}
                url={tab.url}
                line3={formatDistance(new Date(tab.accessedAt), new Date(), {
                  addSuffix: true,
                  includeSeconds: true,
                })}
                onClick={() => switchToTab(tab.windowId, tab.id)}
              />
            ))}
          </Card>
        </PanelContent>
      </Panel>
    </div>
  );
}
