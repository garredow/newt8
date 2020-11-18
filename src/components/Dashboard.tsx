import React from 'react';
import { getNewtFolderId } from '../services/chromeService';
import { BookmarksPanel } from './BookmarksPanel';
// import { ChromeBookmarks } from '../../bookmarks/components/ChromeBookmarks';
import './Dashboard.css';
import { RecentTabs } from './RecentTabsPanel';
import { WindowsPanel } from './WindowsPanel';

export function DashboardView() {
  getNewtFolderId();
  return (
    <div className="Dashboard">
      <BookmarksPanel />
      <RecentTabs />
      <WindowsPanel />
    </div>
  );
}
