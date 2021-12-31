import React, { useEffect, useState } from 'react';
import { ControlType } from '../../enums/controlType';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import styles from './Button.module.css';

type ButtonProps = ComponentBaseProps & {
  text: string;
  type?: ControlType;
  disabled?: boolean;
  fullWidth?: boolean;
  htmlType?: 'submit' | 'reset' | 'button';
  clickToConfirm?: boolean;
  confirmText?: string;
  onClick?: Function;
};

export function Button({
  type = ControlType.Secondary,
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
