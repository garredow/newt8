import React, { useState } from 'react';
import { useContext } from 'react';
import { MdSettings } from 'react-icons/md';
import { CardHeader } from '.';
import { ThemeValueChooser } from '../../components/ThemeValueChooser';
import { ControlLocation } from '../../enums/controlLocation';
import { ControlType } from '../../enums/controlType';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { ComponentBase } from '../../models/ComponentBase';
import { ifClass, joinClasses } from '../../utilities/classes';
import { Button, IconButton } from '../button';
import { Dialog } from '../dialog/Dialog';
import { SettingsRow } from '../list';
import { PanelContext } from '../../contexts/PanelContext';
import styles from './Card.module.css';

export type CardSettings = {
  showCardShadow: boolean;
  showCardDividers: boolean;
  displayStyle: PanelDisplayType;
};

export type CardProps = ComponentBase & {
  cardId?: string;
  title?: string;
  enableSettings?: boolean;
};

export function Card({ enableSettings = false, ...props }: CardProps) {
  const [showConfig, setShowConfig] = useState(false);
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
      {props.title || enableSettings ? (
        <CardHeader
          text={props.title}
          actions={
            enableSettings && (
              <IconButton
                icon={<MdSettings />}
                title="Edit panel settings"
                onClick={() => setShowConfig(true)}
                size={28}
                data-testid="btn-settings"
              />
            )
          }
        />
      ) : null}
      {props.children}
      {showConfig && (
        <Dialog
          title={props.title}
          width="medium"
          onClose={() => setShowConfig(false)}
          data-testid="card-settings"
        >
          <SettingsRow
            label="Header Color"
            helpText="Choose a custom color for this card's header."
          >
            <ThemeValueChooser
              value={'rgba(255, 0, 0, 0.1)'}
              type="color"
              fitValue={true}
              onChange={(val) => console.log('new val', val)}
            />
          </SettingsRow>
          <SettingsRow
            label="Card Color"
            helpText="Choose a custom color for this card."
          >
            <ThemeValueChooser
              value={'rgba(255, 0, 0, 0.1)'}
              type="color"
              fitValue={true}
              onChange={(val) => console.log('new val', val)}
            />
          </SettingsRow>
          <Button
            text="Reset Styles"
            type={ControlType.Danger}
            location={ControlLocation.Card}
            fullWidth
            onClick={() => {}}
          />
        </Dialog>
      )}
    </div>
  );
}
