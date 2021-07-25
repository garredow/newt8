import React, { useContext } from 'react';
import { DisplayDensity } from '../../enums/displayDensity';
import { ComponentBase } from '../../models/ComponentBase';
import { OpenSiteOption } from '../../services/browser';
import { SettingsContext } from '../../SettingsContext';
import { ifClass, joinClasses } from '../../utilities/classes';
import styles from './SiteRow.module.css';

export type SiteRowOptions = {
  showSecondaryText: boolean;
  showAccentText: boolean;
};

export type SiteRowProps = ComponentBase & {
  url?: string;
  primaryText?: string;
  secondaryText?: string;
  accentText?: string;
  showSecondaryText?: boolean;
  showAccentText?: boolean;
  onClick?: (action: OpenSiteOption) => void;
};

export function SiteRow({
  showSecondaryText = true,
  showAccentText = true,
  ...props
}: SiteRowProps) {
  const { settings } = useContext(SettingsContext);

  function handleClick(ev: any) {
    const action =
      ev.metaKey || ev.optionKey
        ? ev.shiftKey
          ? OpenSiteOption.NewBackgroundTab
          : OpenSiteOption.NewTab
        : OpenSiteOption.SameTab;

    props.onClick?.(action);
  }

  return (
    <div
      className={joinClasses(
        styles.root,
        ifClass(settings.showSiteDividers, styles.divider),
        ifClass(
          settings.displayDensity === DisplayDensity.Compact,
          styles.compact
        ),
        ifClass(
          settings.displayDensity === DisplayDensity.Spacious,
          styles.spacious
        )
      )}
      onClick={handleClick}
      data-testid={props['data-testid']}
    >
      <img
        src={`chrome://favicon/size/32@1x/${props.url}`}
        alt=""
        className={styles.icon}
        data-testid="favicon"
      />
      <div className={styles.details}>
        <div className={styles.primaryText} data-testid="primary-text">
          {props.primaryText}
        </div>
        {showSecondaryText && props.secondaryText && (
          <div className={styles.secondaryText} data-testid="secondary-text">
            {props.secondaryText}
          </div>
        )}
        {showAccentText && props.accentText && (
          <div className={styles.accentText} data-testid="accent-text">
            {props.accentText}
          </div>
        )}
      </div>
    </div>
  );
}
