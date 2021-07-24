import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { ComponentBase } from '../../models/ComponentBase';
import { SettingsContext } from '../../SettingsContext';
import { mixin } from '../../utilities/mixin';
import styles from './Card.module.css';

export type CardProps = ComponentBase & {
  display?: PanelDisplayType;
};

export function Card({
  display = PanelDisplayType.Default,
  ...props
}: CardProps) {
  const [classes, setClasses] = useState([styles.root]);
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    const newClasses = [styles.root];
    if (settings.showCardShadow) {
      newClasses.push(styles.shadow);
    }
    if (settings.showCardDividers) {
      newClasses.push(styles.divider);
    }

    if (display !== PanelDisplayType.Default) {
      newClasses.push(display === PanelDisplayType.Lists ? styles.list : '');
    } else if (settings.defaultPanelDisplay === PanelDisplayType.Lists) {
      newClasses.push(styles.list);
    }

    setClasses(newClasses);
  }, [
    settings.showCardShadow,
    settings.showCardDividers,
    settings.defaultPanelDisplay,
    display,
  ]);

  return (
    <div className={mixin(...classes)} data-testid={props['data-testid']}>
      {props.children}
    </div>
  );
}
