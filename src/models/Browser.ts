// Reassigning built-in Chrome types

import { TabMetadata } from './TabMetadata';

export type Site = chrome.topSites.MostVisitedURL;
export type Tab = chrome.tabs.Tab & TabMetadata;
export type Bookmark = chrome.bookmarks.BookmarkTreeNode;
export type Session = chrome.sessions.Session;
export type Device = chrome.sessions.Device;

type WithWindowMetadata = {
  expanded: boolean;
};

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type Window = Overwrite<chrome.windows.Window, { tabs: Tab[] }> &
  WithWindowMetadata;
