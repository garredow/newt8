import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { joinClasses } from '../../utilities/classes';
import styles from './SettingsSection.module.css';

type SettingsSectionProps = ComponentBaseProps & {
  title?: string;
};

export function SettingsSection(props: SettingsSectionProps) {
  return (
    <div
      className={joinClasses(styles.root)}
      data-testid={props['data-testid']}
    >
      {props.title ? <div className={styles.title}>{props.title}</div> : null}
      {props.children}
    </div>
  );
}
