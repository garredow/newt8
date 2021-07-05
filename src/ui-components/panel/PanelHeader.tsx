import React, { useState } from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import { mixin } from '../../utilities/mixin';
import styles from './PanelHeader.module.css';

type PanelHeaderProps = ComponentBase & {
  text: string;
  editable?: boolean;
  onTitleChanged: (title: string) => void;
};

export function PanelHeader(props: PanelHeaderProps) {
  const [changed, setChanged] = useState(false);

  return (
    <div
      className={mixin(styles.root, props.className!)}
      data-testid={props['data-testid']}
    >
      <h1
        className={styles.title}
        contentEditable={props.editable}
        suppressContentEditableWarning
        onKeyDown={(ev) => {
          if (ev.key !== 'Enter') {
            setChanged(true);
            return;
          }

          ev.preventDefault();
          setChanged(false);
          props.onTitleChanged((ev.target as HTMLHeadingElement).innerText);
        }}
      >
        {props.text}
      </h1>
      {changed ? <span className={styles.message}>Enter to save</span> : null}
      <div className={styles.flex} />
      {props.children}
    </div>
  );
}
