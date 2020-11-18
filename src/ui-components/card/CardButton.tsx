import React from 'react';
import './CardButton.css';

type CardButtonProps = {
  text: string;
  onClick: Function;
};

export function CardButton(props: CardButtonProps) {
  return (
    <button className="CardButton-button" onClick={() => props.onClick()}>
      {props.text}
    </button>
  );
}
