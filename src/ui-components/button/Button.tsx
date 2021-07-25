import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
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
  clickToConfirm?: boolean;
  confirmText?: string;
  onClick?: Function;
};

export function Button({
  type = ControlType.Secondary,
  location = ControlLocation.Default,
  disabled = false,
  fullWidth = false,
  htmlType = 'button',
  clickToConfirm = false,
  confirmText = 'Click again to confirm',
  ...props
}: ButtonProps) {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    if (clicks === 0) return;

    const timer = setTimeout(() => setClicks(0), 2000);
    return () => clearTimeout(timer);
  }, [clicks]);

  function handleClick() {
    if (!clickToConfirm || clicks + 1 === 2) {
      props.onClick?.();
      setClicks(0);
      return;
    }

    setClicks(1);
  }

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
      onClick={handleClick}
      data-testid={props['data-testid']}
    >
      {clickToConfirm && clicks === 1 ? confirmText : props.text}
    </button>
  );
}
