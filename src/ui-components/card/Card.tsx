import React from 'react';
import { useContext } from 'react';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { ComponentBase } from '../../models/ComponentBase';
import { SettingsContext } from '../../SettingsContext';
import { ifClass, joinClasses } from '../../utilities/classes';
import styles from './Card.module.css';

export type CardProps = ComponentBase & {
  display?: PanelDisplayType;
};

export function Card({
  display = PanelDisplayType.Default,
  ...props
}: CardProps) {
  const { settings } = useContext(SettingsContext);

  return (
    <div
      className={joinClasses(
        styles.root,
        ifClass(settings.showCardShadow, styles.shadow),
        ifClass(settings.showCardDividers, styles.divider),
        ifClass(
          display === PanelDisplayType.Default,
          ifClass(
            settings.defaultPanelDisplay === PanelDisplayType.Lists,
            styles.list
          ),
          ifClass(display === PanelDisplayType.Lists, styles.list)
        )
      )}
      data-testid={props['data-testid']}
    >
      {props.children}
    </div>
  );
}
