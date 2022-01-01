import React, { MouseEventHandler, useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { ControlType } from '../../enums/controlType';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { ifClass, joinClasses } from '../../utilities/classes';
import styles from './IconButton.module.css';

type IconButtonProps = ComponentBaseProps & {
  size?: number;
  type?: ControlType;
  icon: React.ReactNode;
  title: string;
  animation?: 'spin';
  forceAnimate?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function IconButton({
  size = 36,
  type = ControlType.Secondary,
  icon,
  title,
  forceAnimate = false,
  onClick,
  ...props
}: IconButtonProps) {
  const [working, setWorking] = useState(false);

  async function handleClick(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    ev.stopPropagation();
    ev.preventDefault();
    if (working) return;

    setWorking(true);
    try {
      await onClick?.(ev);
      setWorking(false);
    } catch (err) {
      setWorking(false);
    }
  }

  const buttonStyle = {
    height: `${size}px`,
    width: `${size}px`,
  };

  function getIconClass() {
    let iconClass = [];

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
      className={joinClasses(
        styles.root,
        ifClass(
          props.animation === 'spin' && (working || forceAnimate),
          styles.iconSpin
        ),
        props.className
      )}
      style={buttonStyle}
      onClick={handleClick}
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
