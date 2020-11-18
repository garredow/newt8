import React from 'react';
import './CardHeader.css';

type CardHeaderProps = {
  text?: string;
  actions?: any;
  children?: any;
};

export function CardHeader(props: CardHeaderProps) {
  return (
    <div className="CardHeader">
      <div className="CardHeader__row">
        <div className="CardHeader__text">{props.text}</div>
        <div className="CardHeader__actions">{props.actions}</div>
      </div>
      {props.children}
    </div>
  );
}
