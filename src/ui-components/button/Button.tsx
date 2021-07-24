import React from 'react';
import { ControlLocation } from '../../enums/controlLocation';
import { ControlType } from '../../enums/controlType';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './Button.module.css';

type ButtonProps = ComponentBase & {
  text: string;
  type?: ControlType;
  location?: ControlLocation;
  disabled?: boolean;
  fullWidth?: boolean;
  htmlType?: 'submit' | 'reset' | 'button';
  onClick?: Function;
};

export function Button({
  type = ControlType.Secondary,
  location = ControlLocation.Default,
  disabled = false,
  fullWidth = false,
  htmlType = 'button',
  ...props
}: ButtonProps) {
  function getButtonClasses() {
    let classes = [styles.root];

    switch (location) {
      case ControlLocation.Panel:
        classes.push(styles.panel);
        break;
      case ControlLocation.Card:
        classes.push(styles.card);
        break;
    }
    switch (type) {
      case ControlType.Primary:
        classes.push(styles.primary);
        break;
      case ControlType.Secondary:
        classes.push(styles.secondary);
        break;
      case ControlType.Warning:
        classes.push(styles.warning);
        break;
      case ControlType.Danger:
        classes.push(styles.danger);
        break;
    }

    if (fullWidth) {
      classes.push(styles.fullWidth);
    }

    return classes.join(' ');
  }

  return (
    <button
      className={getButtonClasses()}
      style={props.style}
      disabled={disabled}
      type={htmlType}
      title={props.title}
      onClick={() => props.onClick?.()}
      data-testid={props['data-testid']}
    >
      {props.text}
    </button>
  );
}
