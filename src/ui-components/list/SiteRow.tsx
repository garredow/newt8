import React, { useContext } from 'react';
import { DisplayDensity } from '../../enums/displayDensity';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { OpenSiteOption } from '../../services/browser';
import { ifClass, joinClasses } from '../../utilities/classes';
import { PanelContext } from '../../contexts/PanelContext';
import styles from './SiteRow.module.css';

export type SiteRowSettings = {
  showSecondaryText: boolean;
  showAccentText: boolean;
  showSiteDividers: boolean;
  displayDensity: DisplayDensity;
};

export type SiteRowProps = ComponentBaseProps & {
  url?: string;
  primaryText?: string;
  secondaryText?: string;
  accentText?: string;
  onClick?: (action: OpenSiteOption) => void;
};

export function SiteRow(props: SiteRowProps) {
  const { settings } = useContext(PanelContext);

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
        {settings.showSecondaryText && props.secondaryText && (
          <div className={styles.secondaryText} data-testid="secondary-text">
            {props.secondaryText}
          </div>
        )}
        {settings.showAccentText && props.accentText && (
          <div className={styles.accentText} data-testid="accent-text">
            {props.accentText}
          </div>
        )}
      </div>
    </div>
  );
}
