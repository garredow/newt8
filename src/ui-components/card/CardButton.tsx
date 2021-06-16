import React from 'react';
import { ButtonType } from '../../enums/buttonType';
import styles from './CardButton.module.css';

type CardButtonProps = {
  text: string;
  type?: ButtonType;
  onClick: Function;
};

export function CardButton(props: CardButtonProps) {
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
