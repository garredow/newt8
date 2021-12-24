import React from 'react';
import { useAppSettings } from '../../contexts/AppSettingsProvider';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { ifClass, joinClasses } from '../../utilities/classes';
import { DynamicText } from '../DynamicText';
import styles from './CardHeader.module.css';

type CardHeaderProps = ComponentBaseProps & {
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
      <DynamicText
        style={{
          color: props.textColor || 'inherit',
        }}
        text={props.title}
        type="title"
        editable={true}
        onEdit={props.onTitleChanged}
      />
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
