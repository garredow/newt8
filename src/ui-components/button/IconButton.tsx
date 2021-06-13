import React, { MouseEventHandler } from 'react';
import { IconContext } from 'react-icons/lib';
import { ComponentBase } from '../../models/ComponentBase';
import styles from './IconButton.module.css';

type IconButtonProps = ComponentBase & {
  icon?: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function IconButton(props: IconButtonProps) {
  return (
    <button className={styles.root} onClick={props.onClick}>
      <IconContext.Provider value={{ size: '24px', className: styles.icon }}>
        {props.children}
      </IconContext.Provider>
    </button>
  );
}
