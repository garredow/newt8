import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import styles from './Input.module.css';

export type InputProps = ComponentBaseProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    value?: string;
    onChange?: (value: string) => void;
  };

export function Input({ value = '', onChange, ...props }: InputProps) {
  return (
    <input
      className={styles.root}
      autoComplete="false"
      autoCorrect="false"
      {...props}
      size={value.length + 1}
      value={value}
      onChange={(ev) => onChange?.(ev.target.value)}
      data-testid={props['data-testid']}
    />
  );
}
