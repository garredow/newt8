import { Dialog } from '@reach/dialog';
import React from 'react';
import { ControlType } from '../../enums/controlType';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { Button } from '../button/Button';
import styles from './ConfirmDialog.module.css';

export type ConfirmDialogProps = ComponentBaseProps & {
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
        <Button type={ControlType.Secondary} text="Cancel" onClick={onCancel} />
        <Button
          type={danger ? ControlType.Danger : ControlType.Primary}
          text="Yes"
          onClick={onConfirm}
        />
      </div>
    </Dialog>
  );
}
