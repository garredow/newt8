import React from 'react';
import styles from './SiteRow.module.css';

export type SiteRowProps = {
  title?: string;
  iconUrl?: string;
  url?: string;
  line3?: string;
  onClick?: () => void;
};

export function SiteRow(site: SiteRowProps) {
  function isValidImageUrl() {
    return (
      site.iconUrl &&
      (site.iconUrl.startsWith('http') ||
        site.iconUrl.startsWith('chrome://favicon'))
    );
  }

  return (
    <div className={styles.root} onClick={site.onClick}>
      {isValidImageUrl() ? (
        <img
          src={site.iconUrl}
          alt=""
          className={styles.icon}
          data-testid="favicon"
        />
      ) : (
        <div className={styles.icon}></div>
      )}
      <div className={styles.details}>
        <div className={styles.line1} data-testid="line1">
          {site.title}
        </div>
        {site.url && (
          <div className={styles.line2} data-testid="line2">
            {site.url}
          </div>
        )}
        {site.line3 && (
          <div className={styles.line3} data-testid="line3">
            {site.line3}
          </div>
        )}
      </div>
    </div>
  );
}
