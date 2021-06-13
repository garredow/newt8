import React, { useState, useEffect } from 'react';
import { ChromeTab } from '../models/ChromeTab';
import { getRecentTabs } from '../services/tabsService';
import { Card } from '../ui-components/card';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import styles from './RecentTabsPanel.module.css';
import { SiteRow } from '../ui-components/card/SiteRow';
import { formatDistance } from 'date-fns';
import { switchToTab } from '../services/chromeService';

export function RecentTabs() {
  const [tabs, setTabs] = useState<ChromeTab[]>([]);

  useEffect(() => {
    getRecentTabs(true).then((tabs) => {
      setTabs(tabs);
    });
  }, []);

  return (
    <div className={styles.root}>
      <Panel>
        <PanelHeader text="Recent Tabs" />
        <PanelContent>
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
