import React from 'react';
import { getNewtFolderId } from '../services/chromeService';
import { BookmarksPanel } from './BookmarksPanel';
import { RecentTabs } from './RecentTabsPanel';
import { WindowsPanel } from './WindowsPanel';
import styles from './Dashboard.module.css';

export function DashboardView() {
  getNewtFolderId();
  return (
    <div className={styles.root}>
      <BookmarksPanel />
      <RecentTabs />
      <WindowsPanel />
    </div>
  );
}
