import React from 'react';
import { ControlKind } from '../../enums/controlKind';
import { ButtonType } from '../../enums/buttonType';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './Button.module.css';

type ButtonProps = ComponentBase & {
  text: string;
  type?: ButtonType;
  kind?: ControlKind;
  disabled?: boolean;
  fullWidth?: boolean;
  htmlType?: 'submit' | 'reset' | 'button';
  onClick?: Function;
};

export function Button({
  type = ButtonType.Secondary,
  kind = ControlKind.Default,
  disabled = false,
  fullWidth = false,
  htmlType = 'button',
  ...props
}: ButtonProps) {
  function getButtonClasses() {
    let classes = [styles.root];

    switch (kind) {
      case ControlKind.Panel:
        classes.push(styles.panel);
        break;
      case ControlKind.Card:
        classes.push(styles.card);
        break;
    }
    switch (type) {
      case ButtonType.Primary:
        classes.push(styles.primary);
        break;
      case ButtonType.Secondary:
        classes.push(styles.secondary);
        break;
      case ButtonType.Warning:
        classes.push(styles.warning);
        break;
      case ButtonType.Danger:
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
