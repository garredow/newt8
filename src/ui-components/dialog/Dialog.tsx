import { Dialog as ReachDialog } from '@reach/dialog';
import React from 'react';
import { MdClear } from 'react-icons/md';
import { ComponentBase } from '../../models/ComponentBase';
import { ifClass, joinClasses } from '../../utilities/classes';
import { IconButton } from '../button';
import styles from './Dialog.module.css';

export type DialogProps = ComponentBase & {
  title?: string;
  width?: 'small' | 'medium' | 'large';
  onClose: () => void;
};
export function Dialog({
  title,
  width = 'medium',
  onClose,
  ...props
}: DialogProps) {
  return (
    <ReachDialog
      onDismiss={() => onClose()}
      aria-label="confirm"
      className={joinClasses(
        styles.root,
        ifClass(width === 'small', styles.small),
        ifClass(width === 'medium', styles.medium),
        ifClass(width === 'large', styles.large),
        props.className
      )}
      data-testid={props['data-testid']}
    >
      <header className={styles.header}>
        <h2>{title}</h2>
        <IconButton icon={<MdClear />} title="Close" onClick={onClose} />
      </header>
      <div className={styles.content}>{props.children}</div>
    </ReachDialog>
  );
}
