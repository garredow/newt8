import React, { useContext } from 'react';
import { Orientation } from '../../enums/orientation';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { ifClass, joinClasses } from '../../utilities/classes';
import styles from './PanelContent.module.css';
import { PanelContext } from '../../contexts/PanelContext';

type PanelContentProps = ComponentBaseProps & {
  columns?: number;
};

export function PanelContent(props: PanelContentProps) {
  const { settings } = useContext(PanelContext);

  const columns =
    props.columns !== undefined ? props.columns : settings.columns;
  const style = columns
    ? { gridTemplateColumns: `repeat(${columns}, 1fr)` }
    : {};

  return (
    <div
      className={joinClasses(
        styles.root,
        ifClass(
          settings.orientation === Orientation.Horizontal,
          styles.horizontal,
          styles.vertical
        ),
        ifClass(settings.displayStyle === PanelDisplayType.Lists, styles.list)
      )}
      style={style}
      data-testid={props['data-testid']}
    >
      {props.children}
    </div>
  );
}
