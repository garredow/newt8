import React from 'react';
import { ButtonKind } from '../../enums/buttonKind';
import { ButtonType } from '../../enums/buttonType';
import styles from './Button.module.css';

type ButtonProps = {
  text: string;
  type?: ButtonType;
  kind?: ButtonKind;
  disabled?: boolean;
  onClick: Function;
};

export function Button({
  type = ButtonType.Secondary,
  kind = ButtonKind.Default,
  disabled = false,
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

    return classes.join(' ');
  }

  return (
    <button
      className={getButtonClasses()}
      disabled={disabled}
      onClick={() => props.onClick()}
    >
      {props.text}
    </button>
  );
}
