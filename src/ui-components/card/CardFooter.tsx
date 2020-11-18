import React from 'react';
import './CardFooter.css';

type CardFooterProps = {
  children?: any;
};

export function CardFooter(props: CardFooterProps) {
  return <div className="CardFooter">{props.children}</div>;
}
