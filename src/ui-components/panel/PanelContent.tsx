import React, { useContext, useEffect, useState } from 'react';
import { Orientation } from '../../enums/orientation';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { ComponentBase } from '../../models/ComponentBase';
import { SettingsContext } from '../../SettingsContext';
import { mixin } from '../../utilities/mixin';
import styles from './PanelContent.module.css';

type PanelContentProps = ComponentBase & {
  columns?: number;
  display?: PanelDisplayType;
  orientation?: Orientation;
};

export function PanelContent({
  display = PanelDisplayType.Default,
  orientation = Orientation.Vertical,
  ...props
}: PanelContentProps) {
  const [classes, setClasses] = useState([styles.root]);
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    const newClasses = [styles.root];
    if (display !== PanelDisplayType.Default) {
      newClasses.push(display === PanelDisplayType.Lists ? styles.list : '');
    } else if (settings.defaultPanelDisplay === PanelDisplayType.Lists) {
      newClasses.push(styles.list);
    }

    if (orientation === Orientation.Horizontal) {
      newClasses.push(styles.horizontal);
    } else {
      newClasses.push(styles.vertical);
    }

    setClasses(newClasses);
  }, [settings.defaultPanelDisplay, display, orientation]);

  const style = props.columns
    ? { gridTemplateColumns: `repeat(${props.columns}, 1fr)` }
    : {};

  return (
    <div
      className={mixin(...classes)}
      style={style}
      data-testid={props['data-testid']}
    >
      {props.children}
    </div>
  );
}
