import React from 'react';
import styles from './CardButton.module.css';

type CardButtonProps = {
  text: string;
  onClick: Function;
};

export function CardButton(props: CardButtonProps) {
  return (
    <button className={styles.root} onClick={() => props.onClick()}>
      {props.text}
    </button>
  );
}
