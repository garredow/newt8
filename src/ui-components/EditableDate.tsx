import { format, parse } from 'date-fns';
import React from 'react';
import { ComponentBaseProps } from '../models/ComponentBaseProps';
import { joinClasses } from '../utilities/classes';
import styles from './EditableDate.module.css';

export type EditableDateProps = ComponentBaseProps & {
  value: number;
  label: string;
  onChange?: (value: number) => void;
};

export function EditableDate(props: EditableDateProps) {
  return (
    <div
      className={joinClasses(styles.root, props.className)}
      title={format(props.value, 'PPPppp')}
      data-testid={props['data-testid']}
    >
      {props.label}
      <div className={styles.dateContainer}>
        <input
          type="datetime-local"
          className={styles.date}
          defaultValue={format(props.value, "yyyy-MM-dd'T'HH:mm")}
          onBlur={(ev) => {
            if (!ev.target.value) return;
            console.log('CHANGE', ev.target.value);

            props.onChange?.(
              parse(ev.target.value, "yyyy-MM-dd'T'HH:mm", new Date()).valueOf()
            );
          }}
        />
      </div>
    </div>
  );
}
