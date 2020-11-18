import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import './PanelContent.css';

type PanelContentProps = ComponentBase;

export function PanelContent(props: PanelContentProps) {
  return (
    <div className={`PanelContent ${props.className || ''}`}>
      {props.children}
    </div>
  );
}
