import React, { useState, useEffect } from 'react';
import { ChromeTab } from '../models/ChromeTab';
import { TabRow } from './TabRow';
import { getRecentTabs } from '../services/tabsService';
import './RecentTabsPanel.css';
import { Card } from '../ui-components/card';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';

export function RecentTabs() {
  const [tabs, setTabs] = useState<ChromeTab[]>([]);

  useEffect(() => {
    getRecentTabs(true).then((tabs) => {
      setTabs(tabs);
    });
  }, []);

  return (
    <Panel className="RecentTabsPanel">
      <PanelHeader text="Recent Tabs" />
      <PanelContent>
        <Card className="RecentTabsPanel__card">
          {tabs.map((tab) => (
            <TabRow tab={tab} key={tab.id} />
          ))}
        </Card>
      </PanelContent>
    </Panel>
  );
}
