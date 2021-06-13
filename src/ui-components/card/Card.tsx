import React from 'react';
import styles from './Card.module.css';
export type CardProps = {
  children?: any;
};

export function Card({ children }: CardProps) {
  return <div className={styles.root}>{children}</div>;
}
