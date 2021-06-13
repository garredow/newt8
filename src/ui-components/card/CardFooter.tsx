import React from 'react';
import styles from './CardFooter.module.css';

type CardFooterProps = {
  children?: any;
};

export function CardFooter(props: CardFooterProps) {
  return <div className={styles.root}>{props.children}</div>;
}
