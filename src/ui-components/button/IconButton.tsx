import React, { MouseEventHandler } from 'react';
import { IconContext } from 'react-icons/lib';
import { ControlLocation } from '../../enums/controlLocation';
import { ControlType } from '../../enums/controlType';
import { ComponentBase } from '../../models/ComponentBase';
import { mixin } from '../../utilities/mixin';
import styles from './IconButton.module.css';

type IconButtonProps = ComponentBase & {
  size?: number;
  type?: ControlType;
  location?: ControlLocation;
  icon: React.ReactNode;
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function IconButton({
  size = 36,
  type = ControlType.Secondary,
  location = ControlLocation.Default,
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

    switch (location) {
      case ControlLocation.Panel:
        iconClass.push(styles.panel);
        break;
      case ControlLocation.Card:
        iconClass.push(styles.card);
        break;
      case ControlLocation.SideBar:
        iconClass.push(styles.sidebar);
        break;
    }
    switch (type) {
      case ControlType.Primary:
        iconClass.push(styles.primary);
        break;
      case ControlType.Secondary:
        iconClass.push(styles.secondary);
        break;
      case ControlType.Warning:
        iconClass.push(styles.warning);
        break;
      case ControlType.Danger:
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
