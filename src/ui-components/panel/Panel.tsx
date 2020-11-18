import React from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import './Panel.css';

type PanelProps = ComponentBase;

export function Panel(props: PanelProps) {
  return (
    <div className={`Panel ${props.className || ''}`}>{props.children}</div>
  );
}

// type PanelHeaderProps = ComponentBase & {
//   text: string;
// };

// export function PanelHeader(props: PanelHeaderProps) {
//   return <h1 className="Panel__header">{props.text}</h1>;
// }

// type PanelContentProps = ComponentBase;

// export function PanelContent(props: PanelContentProps) {
//   return <div className="Panel__content">{props.children}</div>;
// }
