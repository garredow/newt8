import React from 'react';
import { ThemeValueOption } from '../models/Theme';
import { ifClass, joinClasses } from '../utilities/classes';
import styles from './ThemeValueChooser.module.css';

export type ThemeValueChooserProps = {
  title?: string;
  value: string;
  type: 'color' | 'number' | 'string';
  options?: ThemeValueOption[];
  fitValue?: boolean;
  onChange?: (newVal: string) => void;
};

export function ThemeValueChooser({
  fitValue = false,
  ...props
}: ThemeValueChooserProps) {
  function handleColorChange(ev: any) {
    props.onChange?.(ev.target.value);
  }

  return (
    <div>
      <div>{props.title}</div>
      <div className={styles.row}>
        {props.options ? (
          <select value={props.value} onChange={handleColorChange}>
            {props.options.map((a) => (
              <option key={a.key} value={a.key}>
                {a.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={joinClasses(styles.input, ifClass(fitValue, styles.fit))}
            value={props.value}
            onChange={handleColorChange}
            readOnly={false}
            type={props.type === 'number' ? 'number' : undefined}
            size={fitValue && props.value ? props.value.length : undefined}
          />
        )}
        {props.type === 'color' ? (
          <div className={styles.previewContainer}>
            <input
              type="color"
              className={styles.previewInput}
              value={
                new RegExp(/#[0-9a-fA-F]{6}/).test(props.value)
                  ? props.value
                  : '#000000'
              } // It complains if the value isn't hex
              onInput={handleColorChange}
            ></input>
            <div
              className={styles.preview}
              style={{ backgroundColor: props.value }}
            ></div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
