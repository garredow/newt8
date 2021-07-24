import React from 'react';
import { MdCheck } from 'react-icons/md';
import { ControlKind } from '../../enums/controlKind';
import { ComponentBase } from '../../models/ComponentBase';
import { mixin } from '../../utilities/mixin';
import { Icon } from '../icon';
import styles from './Checkbox.module.css';

type CheckboxProps = ComponentBase & {
  checked?: boolean;
  kind?: ControlKind;
  onChange?: (checked: boolean) => void;
};

export function Checkbox({
  checked = false,
  kind = ControlKind.Default,
  ...props
}: CheckboxProps) {
  return (
    <label className={mixin(styles.root, styles[kind])}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(ev) => props.onChange?.(ev.target.checked)}
      />
      <div className={styles.checkbox}>
        <Icon size="16" className={styles.checkmark} icon={<MdCheck />} />
      </div>
    </label>
  );
}
