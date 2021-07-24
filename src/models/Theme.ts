export type ThemeValueOption = {
  key: string;
  name: string;
};

export type ThemeValue = {
  name: string;
  type: 'color' | 'number' | 'string';
  variable: string;
  value: string;
  options?: ThemeValueOption[];
};

export type ThemeValues = {
  appBgColor: ThemeValue;
  appAccentColor: ThemeValue;
  dividerColor: ThemeValue;
  primaryTextColor: ThemeValue;
  secondaryTextColor: ThemeValue;
  warningTextColor: ThemeValue;
  errorTextColor: ThemeValue;
  baseTextSize: ThemeValue;
  baseTextWeight: ThemeValue;
  primaryButtonBgColor: ThemeValue;
  primaryButtonTextColor: ThemeValue;
  secondaryButtonBgColor: ThemeValue;
  secondaryButtonTextColor: ThemeValue;
  warningButtonBgColor: ThemeValue;
  warningButtonTextColor: ThemeValue;
  dangerButtonBgColor: ThemeValue;
  dangerButtonTextColor: ThemeValue;

  panelBgColor: ThemeValue;
  panelAccentColor: ThemeValue;
  panelDividerColor: ThemeValue;
  panelTitleTextColor: ThemeValue;
  panelTitleTextSize: ThemeValue;
  panelTitleTextWeight: ThemeValue;
  panelPrimaryTextColor: ThemeValue;
  panelSecondaryTextColor: ThemeValue;
  panelPrimaryButtonBgColor: ThemeValue;
  panelPrimaryButtonTextColor: ThemeValue;
  panelSecondaryButtonBgColor: ThemeValue;
  panelSecondaryButtonTextColor: ThemeValue;
  panelWarningButtonBgColor: ThemeValue;
  panelWarningButtonTextColor: ThemeValue;
  panelDangerButtonBgColor: ThemeValue;
  panelDangerButtonTextColor: ThemeValue;

  cardBgColor: ThemeValue;
  cardAccentColor: ThemeValue;
  cardDividerColor: ThemeValue;
  cardTitleTextColor: ThemeValue;
  cardTitleTextSize: ThemeValue;
  cardTitleTextWeight: ThemeValue;
  cardPrimaryTextColor: ThemeValue;
  cardSecondaryTextColor: ThemeValue;
  cardPrimaryButtonBgColor: ThemeValue;
  cardPrimaryButtonTextColor: ThemeValue;
  cardSecondaryButtonBgColor: ThemeValue;
  cardSecondaryButtonTextColor: ThemeValue;
  cardWarningButtonBgColor: ThemeValue;
  cardWarningButtonTextColor: ThemeValue;
  cardDangerButtonBgColor: ThemeValue;
  cardDangerButtonTextColor: ThemeValue;

  sidebarBgColor: ThemeValue;
  sidebarAccentColor: ThemeValue;
  sidebarDividerColor: ThemeValue;
  sidebarTitleTextColor: ThemeValue;
  sidebarTitleTextSize: ThemeValue;
  sidebarPrimaryTextColor: ThemeValue;
  sidebarSecondaryTextColor: ThemeValue;
  sidebarPrimaryButtonBgColor: ThemeValue;
  sidebarPrimaryButtonTextColor: ThemeValue;
  sidebarSecondaryButtonBgColor: ThemeValue;
  sidebarSecondaryButtonTextColor: ThemeValue;
  sidebarWarningButtonBgColor: ThemeValue;
  sidebarWarningButtonTextColor: ThemeValue;
  sidebarDangerButtonBgColor: ThemeValue;
  sidebarDangerButtonTextColor: ThemeValue;
};

export type Theme = {
  id: string;
  name: string;
  values: ThemeValues;
};
