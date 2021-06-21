import React, { MouseEventHandler } from 'react';
import { IconContext } from 'react-icons/lib';
import { ButtonKind } from '../../enums/buttonKind';
import { ButtonType } from '../../enums/buttonType';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './IconButton.module.css';

type IconButtonProps = ComponentBase & {
  size?: number;
  type?: ButtonType;
  kind?: ButtonKind;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function IconButton({
  size = 36,
  type = ButtonType.Secondary,
  kind = ButtonKind.Default,
  ...props
}: IconButtonProps) {
  const buttonStyle = {
    height: `${size}px`,
    width: `${size}px`,
  };

  function getIconClass() {
    let iconClass = [];

    switch (kind) {
      case ButtonKind.Panel:
        iconClass.push(styles.panel);
        break;
      case ButtonKind.Card:
        iconClass.push(styles.card);
        break;
    }
    switch (type) {
      case ButtonType.Primary:
        iconClass.push(styles.primary);
        break;
      case ButtonType.Secondary:
        iconClass.push(styles.secondary);
        break;
      case ButtonType.Warning:
        iconClass.push(styles.warning);
        break;
      case ButtonType.Danger:
        iconClass.push(styles.danger);
        break;
    }

    return iconClass.join(' ');
  }
  return (
    <button
      className={styles.root}
      style={buttonStyle}
      onClick={props.onClick}
      data-testid={props['data-testid']}
    >
      <IconContext.Provider
        value={{
          size: `${size - size * 0.2}px`,
          className: getIconClass(),
        }}
      >
        {props.children}
      </IconContext.Provider>
    </button>
  );
}
