import { Theme } from './Theme';

export type Settings = {
  themes: Theme[];
  activeTheme: string;
  dynamicThemes: boolean;
  lightTheme: string;
  darkTheme: string;
  showSettingHelpText: boolean;
  confirmBeforeDelete: boolean;
  showActionsOnHover: boolean;
};
