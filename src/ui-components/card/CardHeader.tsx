import React from 'react';
import { useAppSettings } from '../../contexts/AppSettingsProvider';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { ifClass, joinClasses } from '../../utilities/classes';
import styles from './CardHeader.module.css';

type CardHeaderProps = ComponentBaseProps & {
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  actions?: any;
};

export function CardHeader(props: CardHeaderProps) {
  const { settings } = useAppSettings();
  return (
    <div
      className={styles.root}
      style={{
        backgroundColor: props.backgroundColor,
      }}
      data-testid={props['data-testid']}
    >
      <div
        className={styles.title}
        style={{
          color: props.textColor,
        }}
      >
        {props.text}
      </div>
      <div
        className={joinClasses(
          styles.actions,
          ifClass(settings.showActionsOnHover, styles.hide)
        )}
      >
        {props.actions}
      </div>
    </div>
  );
}
