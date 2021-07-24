import React, { MouseEventHandler } from 'react';
import { IconContext } from 'react-icons/lib';
import { ControlKind } from '../../enums/controlKind';
import { ButtonType } from '../../enums/buttonType';
import { ComponentBase } from '../../models/ComponentBase';
import { mixin } from '../../utilities/mixin';
import styles from './IconButton.module.css';

type IconButtonProps = ComponentBase & {
  size?: number;
  type?: ButtonType;
  kind?: ControlKind;
  icon: React.ReactNode;
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function IconButton({
  size = 36,
  type = ButtonType.Secondary,
  kind = ControlKind.Default,
  icon,
  title,
  onClick,
  ...props
}: IconButtonProps) {
  const buttonStyle = {
    height: `${size}px`,
    width: `${size}px`,
  };

  function getIconClass() {
    let iconClass = [];

    switch (kind) {
      case ControlKind.Panel:
        iconClass.push(styles.panel);
        break;
      case ControlKind.Card:
        iconClass.push(styles.card);
        break;
      case ControlKind.SideBar:
        iconClass.push(styles.sidebar);
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
      className={mixin(styles.root, props.className)}
      style={buttonStyle}
      onClick={onClick}
      title={title}
      type="button"
      data-testid={props['data-testid']}
      {...props}
    >
      <IconContext.Provider
        value={{
          size: `${size - size * 0.2}px`,
          className: getIconClass(),
        }}
      >
        {icon}
      </IconContext.Provider>
    </button>
  );
}
