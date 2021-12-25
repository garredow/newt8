import React, { useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { ComponentBaseProps } from '../models/ComponentBaseProps';
import { ifClass, joinClasses } from '../utilities/classes';
import { IconButton } from './button';
import styles from './DynamicText.module.css';

export type DynamicTextProps = ComponentBaseProps & {
  text?: string;
  type?: 'caption' | 'body' | 'title';
  color?: 'primary' | 'secondary' | 'warning' | 'error' | 'accent';
  decoration?: 'none' | 'underline';
  transform?: 'none' | 'uppercase' | 'lowercase';
  align?: 'left' | 'center' | 'right';
  padding?: 'vertical' | 'horizontal' | 'both' | 'none';
  wrap?: 'wrap' | 'nowrap';
  editable?: boolean;
  deletable?: boolean;
  onEdit?: (newText: string) => void;
  onDelete?: () => void;
  onClick?: () => void;
};

export function DynamicText(props: DynamicTextProps): JSX.Element {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={joinClasses(
        styles.root,
        ifClass(!!props.editable, styles.editable),
        ifClass(editing, styles.editing),
        ifClass(!!props.type, styles[props.type!]),
        ifClass(!!props.color, styles[props.color!]),
        ifClass(!!props.decoration, styles[props.decoration!]),
        ifClass(!!props.transform, styles[props.transform!]),
        ifClass(!!props.align, styles[props.align!]),
        ifClass(!!props.padding, styles[`padding-${props.padding}`]),
        ifClass(!!props.wrap, styles[props.wrap!]),
        props.className
      )}
      style={props.style}
      contentEditable={props.editable && editing}
      suppressContentEditableWarning={true}
      spellCheck={false}
      onClick={(ev) => {
        if (editing) {
          ev.preventDefault();
          ev.stopPropagation();
        } else {
          props.onClick?.();
        }
      }}
      onContextMenu={(ev) => {
        if (!props.editable) return;
        ev.preventDefault();
        setEditing(true);
        setTimeout(() => {
          ref.current?.focus();
        }, 100);
      }}
      onKeyDown={(ev) => {
        switch (ev.key) {
          case 'Enter':
            props.onEdit?.((ev.target as HTMLDivElement).textContent || '');
            setEditing(false);
            break;
          case 'Escape':
            ref.current!.textContent = props.text || '';
            setEditing(false);
        }
      }}
      onBlur={(ev) => {
        props.onEdit?.((ev.target as HTMLDivElement).textContent || '');
        setEditing(false);
      }}
      data-testid={props['data-testid']}
    >
      {props.text}
      {editing && props.deletable && (
        <IconButton
          icon={<MdDelete />}
          title="Delete"
          onClick={props.onDelete}
          size={24}
          data-testid="btn-delete"
        />
      )}
    </div>
  );
}
