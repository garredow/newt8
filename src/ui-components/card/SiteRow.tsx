import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './SiteRow.module.css';

export type SiteRowProps = ComponentBase & {
  title?: string;
  iconUrl?: string;
  url?: string;
  line3?: string;
  onClick?: () => void;
};

export function SiteRow(props: SiteRowProps) {
  function isValidImageUrl() {
    return (
      props.iconUrl &&
      (props.iconUrl.startsWith('http') ||
        props.iconUrl.startsWith('chrome://favicon'))
    );
  }

  return (
    <div
      className={styles.root}
      onClick={props.onClick}
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
        {props.url && (
          <div className={styles.line2} data-testid="line2">
            {props.url}
          </div>
        )}
        {props.line3 && (
          <div className={styles.line3} data-testid="line3">
            {props.line3}
          </div>
        )}
      </div>
    </div>
  );
}
