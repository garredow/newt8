import React, { useRef, useState } from 'react';
import { ControlLocation } from '../enums/controlLocation';
import { ComponentBaseProps } from '../models/ComponentBaseProps';
import { joinClasses } from '../utilities/classes';
import styles from './EditableText.module.css';

export type EditableTextProps = ComponentBaseProps & {
  value: string;
  location?: ControlLocation;
  onChange?: (value: string) => void;
};

export function EditableText({
  location = ControlLocation.Default,
  ...props
}: EditableTextProps) {
  const [edit, setEdit] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={joinClasses(styles.root, styles[location], props.className)}
      contentEditable={edit}
      suppressContentEditableWarning={true}
      onContextMenu={(ev) => {
        ev.preventDefault();
        setEdit(true);
        setTimeout(() => {
          ref.current?.focus();
        }, 0);
      }}
      onKeyDown={(ev) => {
        switch (ev.key) {
          case 'Enter':
            props.onChange?.((ev.target as HTMLDivElement).textContent || '');
            setEdit(false);
            break;
          case 'Escape':
            ref.current!.textContent = props.value;
            setEdit(false);
        }
      }}
      onBlur={(ev) => {
        props.onChange?.((ev.target as HTMLDivElement).textContent || '');
        setEdit(false);
      }}
      data-testid={props['data-testid']}
    >
      {props.value}
    </div>
  );
}
