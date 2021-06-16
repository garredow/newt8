import React from 'react';
import { ButtonType } from '../../enums/buttonType';
import styles from './PanelButton.module.css';

type PanelButtonProps = {
  text: string;
  type?: ButtonType;
  onClick: Function;
};

export function PanelButton(props: PanelButtonProps) {
  let classes = [styles.root];
  switch (props.type) {
    case ButtonType.Primary:
      classes.push(styles.primary);
      break;
    case ButtonType.Secondary:
      classes.push(styles.secondary);
      break;
    case ButtonType.Warning:
      classes.push(styles.warning);
      break;
    case ButtonType.Danger:
      classes.push(styles.danger);
      break;
  }

  return (
    <button className={classes.join(' ')} onClick={() => props.onClick()}>
      {props.text}
    </button>
  );
}
