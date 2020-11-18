import { ChromeTab } from './ChromeTab';

type WithWindowMetadata = {
  expanded: boolean;
};

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type ChromeWindow = Overwrite<
  chrome.windows.Window,
  { tabs: ChromeTab[] }
> &
  WithWindowMetadata;
