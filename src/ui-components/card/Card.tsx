import React from 'react';
import { useContext } from 'react';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { ComponentBase } from '../../models/ComponentBase';
import { ifClass, joinClasses } from '../../utilities/classes';
import { PanelContext } from '../panel/PanelContext';
import styles from './Card.module.css';

export type CardSettings = {
  showCardShadow: boolean;
  showCardDividers: boolean;
  displayStyle: PanelDisplayType;
};

export type CardProps = ComponentBase;

export function Card(props: CardProps) {
  const { settings } = useContext(PanelContext);

  return (
    <div
      className={joinClasses(
        styles.root,
        ifClass(settings.showCardShadow, styles.shadow),
        ifClass(settings.showCardDividers, styles.divider),
        ifClass(settings.displayStyle === PanelDisplayType.Lists, styles.list)
      )}
      data-testid={props['data-testid']}
    >
      {props.children}
    </div>
  );
}
