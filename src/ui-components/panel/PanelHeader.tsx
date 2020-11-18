import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import './PanelHeader.css';

type PanelHeaderProps = ComponentBase & {
  text: string;
};

export function PanelHeader(props: PanelHeaderProps) {
  return (
    <div className={`PanelHeader ${props.className || ''}`}>
      <div>
        <h1 className="PanelHeader__title">{props.text}</h1>
        {props.children}
      </div>
    </div>
  );
}
