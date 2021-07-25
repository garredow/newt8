import React, { useContext } from 'react';
import { Orientation } from '../../enums/orientation';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { ComponentBase } from '../../models/ComponentBase';
import { SettingsContext } from '../../SettingsContext';
import { ifClass, joinClasses } from '../../utilities/classes';
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
  const { settings } = useContext(SettingsContext);

  const style = props.columns
    ? { gridTemplateColumns: `repeat(${props.columns}, 1fr)` }
    : {};

  return (
    <div
      className={joinClasses(
        styles.root,
        ifClass(
          orientation === Orientation.Horizontal,
          styles.horizontal,
          styles.vertical
        ),
        ifClass(
          display === PanelDisplayType.Default,
          ifClass(
            settings.defaultPanelDisplay === PanelDisplayType.Lists,
            styles.list
          ),
          ifClass(display === PanelDisplayType.Lists, styles.list)
        )
      )}
      style={style}
      data-testid={props['data-testid']}
    >
      {props.children}
    </div>
  );
}
