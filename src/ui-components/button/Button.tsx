import React from 'react';
import { ButtonKind } from '../../enums/buttonKind';
import { ButtonType } from '../../enums/buttonType';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './Button.module.css';

type ButtonProps = ComponentBase & {
  text: string;
  type?: ButtonType;
  kind?: ButtonKind;
  disabled?: boolean;
  fullWidth?: boolean;
  htmlType?: 'submit' | 'reset' | 'button';
  onClick?: Function;
};

export function Button({
  type = ButtonType.Secondary,
  kind = ButtonKind.Default,
  disabled = false,
  fullWidth = false,
  htmlType = 'button',
  ...props
}: ButtonProps) {
  function getButtonClasses() {
    let classes = [styles.root];

    switch (kind) {
      case ButtonKind.Panel:
        classes.push(styles.panel);
        break;
      case ButtonKind.Card:
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
      onClick={() => props.onClick?.()}
      data-testid={props['data-testid']}
    >
      {props.text}
    </button>
  );
}
