import React, { MouseEventHandler } from 'react';
import { IconContext } from 'react-icons/lib';
import { ComponentBase } from '../../models/ComponentBase';
import './IconButton.css';

type IconButtonProps = ComponentBase & {
  icon?: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function IconButton(props: IconButtonProps) {
  return (
    <button className="IconButton" onClick={props.onClick}>
      <IconContext.Provider
        value={{ size: '24px', className: 'IconButton__button' }}
      >
        {props.children}
      </IconContext.Provider>
    </button>
  );
}
