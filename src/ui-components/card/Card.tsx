import React from 'react';
import './Card.css';

export type CardProps = {
  children?: any;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return <div className={`Card ${className}`}>{children}</div>;
}
