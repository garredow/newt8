import React from 'react';
import { MdCheck } from 'react-icons/md';
import { ControlLocation } from '../../enums/controlLocation';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { joinClasses } from '../../utilities/classes';
import { Icon } from '../icon';
import styles from './Checkbox.module.css';

export type CheckboxProps = ComponentBaseProps & {
  checked?: boolean;
  location?: ControlLocation;
  onChange?: (checked: boolean) => void;
};

export function Checkbox({
  checked = false,
  location = ControlLocation.Default,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={joinClasses(styles.root, styles[location])}
      data-testid={props['data-testid']}
    >
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
