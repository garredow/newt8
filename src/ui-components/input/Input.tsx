import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { ifClass, joinClasses } from '../../utilities/classes';
import styles from './Input.module.css';

export type InputProps = ComponentBaseProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    value?: string;
    secret?: boolean;
    onChange?: (value: string) => void;
  };

export function Input({
  value = '',
  secret = false,
  onChange,
  ...props
}: InputProps) {
  return (
    <div className={styles.root}>
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
      <div
        className={joinClasses(styles.mask, ifClass(secret, styles.showMask))}
      />
    </div>
  );
}
