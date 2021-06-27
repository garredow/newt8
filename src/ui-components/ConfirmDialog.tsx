import { Dialog } from '@reach/dialog';
import React from 'react';
import { ButtonKind } from '../enums/buttonKind';
import { ButtonType } from '../enums/buttonType';
import { ComponentBase } from '../models/ComponentBase';
import { Button } from './button/Button';
import styles from './ConfirmDialog.module.css';

export type ConfirmDialogProps = ComponentBase & {
  title?: string;
  message?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};
export function ConfirmDialog({
  title = 'Confirm',
  message = 'Are you sure you want to do this?',
  danger = false,
  onConfirm,
  onCancel,
  ...props
}: ConfirmDialogProps) {
  return (
    <Dialog
      onDismiss={onCancel}
      aria-label="confirm"
      className={styles.root}
      data-testid={props['data-testid']}
    >
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <Button
          kind={ButtonKind.Card}
          type={ButtonType.Secondary}
          text="Cancel"
          onClick={onCancel}
        />
        <Button
          kind={ButtonKind.Card}
          type={danger ? ButtonType.Danger : ButtonType.Primary}
          text="Yes"
          onClick={onConfirm}
        />
      </div>
    </Dialog>
  );
}
