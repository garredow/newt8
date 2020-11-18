import React from 'react';
import { formatDistance } from 'date-fns';
import { ChromeTab } from '../models/ChromeTab';
import { switchToTab } from '../services/chromeService';
import './TabRow.css';

export type TabRowProps = {
  tab: ChromeTab;
};

export function TabRow({ tab }: TabRowProps) {
  function isValidImageUrl() {
    return tab.favIconUrl && tab.favIconUrl.startsWith('http');
  }

  function open() {
    switchToTab(tab.windowId, tab.id);
  }

  const displayTime = formatDistance(new Date(tab.accessedAt), new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });

  return (
    <div className="TabRow" onClick={open}>
      <div>
        {isValidImageUrl() ? (
          <img src={tab.favIconUrl} alt="" className="TabRow__icon" />
        ) : (
          <div className="TabRow__icon" />
        )}
      </div>
      <div className="TabRow__details-container">
        <div className="TabRow__title">{tab.title}</div>
        <div className="TabRow__line2">
          <div className="TabRow__url">{tab.url}</div>
        </div>
        <div className="TabRow__time">{displayTime}</div>
      </div>
    </div>
  );
}
