import { Theme } from './Theme';

export type Settings = {
  themes: Theme[];
  activeTheme: string;
  showSettingHelpText: boolean;
};
