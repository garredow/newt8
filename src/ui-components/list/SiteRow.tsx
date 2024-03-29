import React, { useContext } from 'react';
import { PanelContext } from '../../contexts/PanelContext';
import { DisplayDensity } from '../../enums/displayDensity';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { OpenSiteOption } from '../../services/browser';
import { ifClass, joinClasses } from '../../utilities/classes';
import { DynamicText } from '../DynamicText';
import styles from './SiteRow.module.css';

export type SiteRowProps = ComponentBaseProps & {
  url?: string;
  primaryText?: string;
  secondaryText?: string;
  accentText?: string;
  editable?: boolean;
  onClick?: (action: OpenSiteOption) => void;
  onEdit?: (newText: string) => void;
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
        <DynamicText
          wrap="nowrap"
          text={props.primaryText}
          editable={props.editable}
          onEdit={props.onEdit}
        />
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
