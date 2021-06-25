export type ThemeColor = {
  name: string;
  variable: string;
  value: string;
};

export type ThemeValues = {
  appBgColor: ThemeColor;
  appAccentColor: ThemeColor;
  dividerColor: ThemeColor;
  primaryTextColor: ThemeColor;
  secondaryTextColor: ThemeColor;
  warningTextColor: ThemeColor;
  errorTextColor: ThemeColor;
  primaryButtonBgColor: ThemeColor;
  primaryButtonTextColor: ThemeColor;
  secondaryButtonBgColor: ThemeColor;
  secondaryButtonTextColor: ThemeColor;
  warningButtonBgColor: ThemeColor;
  warningButtonTextColor: ThemeColor;
  dangerButtonBgColor: ThemeColor;
  dangerButtonTextColor: ThemeColor;

  panelBgColor: ThemeColor;
  panelAccentColor: ThemeColor;
  panelDividerColor: ThemeColor;
  panelTitleTextColor: ThemeColor;
  panelPrimaryTextColor: ThemeColor;
  panelSecondaryTextColor: ThemeColor;
  panelPrimaryButtonBgColor: ThemeColor;
  panelPrimaryButtonTextColor: ThemeColor;
  panelSecondaryButtonBgColor: ThemeColor;
  panelSecondaryButtonTextColor: ThemeColor;
  panelWarningButtonBgColor: ThemeColor;
  panelWarningButtonTextColor: ThemeColor;
  panelDangerButtonBgColor: ThemeColor;
  panelDangerButtonTextColor: ThemeColor;

  cardBgColor: ThemeColor;
  cardAccentColor: ThemeColor;
  cardDividerColor: ThemeColor;
  cardTitleTextColor: ThemeColor;
  cardPrimaryTextColor: ThemeColor;
  cardSecondaryTextColor: ThemeColor;
  cardPrimaryButtonBgColor: ThemeColor;
  cardPrimaryButtonTextColor: ThemeColor;
  cardSecondaryButtonBgColor: ThemeColor;
  cardSecondaryButtonTextColor: ThemeColor;
  cardWarningButtonBgColor: ThemeColor;
  cardWarningButtonTextColor: ThemeColor;
  cardDangerButtonBgColor: ThemeColor;
  cardDangerButtonTextColor: ThemeColor;

  sidebarBgColor: ThemeColor;
  sidebarAccentColor: ThemeColor;
  sidebarDividerColor: ThemeColor;
  sidebarTitleTextColor: ThemeColor;
  sidebarPrimaryTextColor: ThemeColor;
  sidebarSecondaryTextColor: ThemeColor;
  sidebarPrimaryButtonBgColor: ThemeColor;
  sidebarPrimaryButtonTextColor: ThemeColor;
  sidebarSecondaryButtonBgColor: ThemeColor;
  sidebarSecondaryButtonTextColor: ThemeColor;
  sidebarWarningButtonBgColor: ThemeColor;
  sidebarWarningButtonTextColor: ThemeColor;
  sidebarDangerButtonBgColor: ThemeColor;
  sidebarDangerButtonTextColor: ThemeColor;
};

export type Theme = {
  id: string;
  name: string;
  values: ThemeValues;
};
