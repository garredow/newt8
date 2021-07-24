import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { ComponentBase } from '../../models/ComponentBase';
import { SettingsContext } from '../../SettingsContext';
import { mixin } from '../../utilities/mixin';
import styles from './Card.module.css';

export type CardProps = ComponentBase;

export function Card({ children, ...props }: CardProps) {
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

    setClasses(newClasses);
  }, [settings.showCardShadow, settings.showCardDividers]);
  return (
    <div className={mixin(...classes)} data-testid={props['data-testid']}>
      {children}
    </div>
  );
}
