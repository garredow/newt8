import React, { useContext, useEffect, useState } from 'react';
import { DisplayDensity } from '../../enums/displayDensity';
import { ComponentBase } from '../../models/ComponentBase';
import { OpenSiteOption } from '../../services/browser';
import { SettingsContext } from '../../SettingsContext';
import { mixin } from '../../utilities/mixin';
import styles from './SiteRow.module.css';

export type SiteRowProps = ComponentBase & {
  title?: string;
  iconUrl?: string;
  url?: string;
  line3?: string;
  showUrl?: boolean;
  showLine3?: boolean;
  onClick?: (url: string, action: OpenSiteOption) => void;
};

export function SiteRow({
  showUrl = true,
  showLine3 = true,
  ...props
}: SiteRowProps) {
  const [classes, setClasses] = useState([styles.root]);
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    const newClasses = [styles.root];
    if (settings.showSiteDividers) {
      newClasses.push(styles.divider);
    }
    if (settings.displayDensity === DisplayDensity.Compact) {
      newClasses.push(styles.compact);
    }
    if (settings.displayDensity === DisplayDensity.Spacious) {
      newClasses.push(styles.spacious);
    }

    setClasses(newClasses);
  }, [settings.showSiteDividers, settings.displayDensity]);

  function isValidImageUrl() {
    return (
      props.iconUrl &&
      (props.iconUrl.startsWith('http') ||
        props.iconUrl.startsWith('chrome://favicon'))
    );
  }

  function handleClick(ev: any) {
    const action =
      ev.metaKey || ev.optionKey
        ? ev.shiftKey
          ? OpenSiteOption.NewBackgroundTab
          : OpenSiteOption.NewTab
        : OpenSiteOption.SameTab;

    props.onClick?.(props.url!, action);
  }

  return (
    <div
      className={mixin(...classes)}
      onClick={handleClick}
      data-testid={props['data-testid']}
    >
      {isValidImageUrl() ? (
        <img
          src={props.iconUrl}
          alt=""
          className={styles.icon}
          data-testid="favicon"
        />
      ) : (
        <div className={styles.icon}></div>
      )}
      <div className={styles.details}>
        <div className={styles.line1} data-testid="line1">
          {props.title}
        </div>
        {showUrl && props.url && (
          <div className={styles.line2} data-testid="line2">
            {props.url}
          </div>
        )}
        {showLine3 && props.line3 && (
          <div className={styles.line3} data-testid="line3">
            {props.line3}
          </div>
        )}
      </div>
    </div>
  );
}
