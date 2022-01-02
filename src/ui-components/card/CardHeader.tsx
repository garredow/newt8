import React from 'react';
import { useAppSettings } from '../../contexts/AppSettingsProvider';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { ifClass, joinClasses } from '../../utilities/classes';
import { DynamicText } from '../DynamicText';
import { Icon } from '../icon';
import styles from './CardHeader.module.css';

type CardHeaderProps = ComponentBaseProps & {
  icon?: React.ReactNode;
  title?: string;
  backgroundColor?: string;
  textColor?: string;
  actions?: any;
  onTitleChanged?: (title: string) => void;
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
      {props.icon ? <Icon className={styles.icon} icon={props.icon} /> : null}
      <DynamicText
        className={styles.title}
        style={{
          color: props.textColor || 'inherit',
        }}
        text={props.title}
        type="title"
        editable={true}
        onEdit={props.onTitleChanged}
      />
      <div className={styles.spacer} />
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
