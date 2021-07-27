import React from 'react';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import styles from './PanelSettings.module.css';

type PanelSettingsProps = ComponentBaseProps & {};

export const PanelSettings = React.forwardRef(
  (props: PanelSettingsProps, ref: any) => (
    <div
      className={styles.root}
      style={{ ...props.style }}
      ref={ref}
      data-testid={props['data-testid']}
    >
      {props.children}
    </div>
  )
);
