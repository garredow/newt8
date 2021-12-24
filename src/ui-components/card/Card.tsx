import React, { useContext, useEffect, useState } from 'react';
import { MdSettings } from 'react-icons/md';
import { CardHeader } from '.';
import { ThemeValueChooser } from '../../components/ThemeValueChooser';
import { PanelContext } from '../../contexts/PanelContext';
import { ControlLocation } from '../../enums/controlLocation';
import { ControlType } from '../../enums/controlType';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { CardSettings } from '../../models/CardSettings';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { ifClass, joinClasses } from '../../utilities/classes';
import { Button, IconButton } from '../button';
import { Dialog } from '../dialog/Dialog';
import { SettingsRow } from '../list';
import styles from './Card.module.css';

export type CardProps = ComponentBaseProps & {
  cardId?: string;
  defaultTitle?: string;
  title?: string;
  enableSettings?: boolean;
  useCustomerHeader?: boolean;
  actions?: React.ReactNode;
  onTitleChanged?: (title: string) => void;
};

export const defaultCardSettings: CardSettings = {
  title: '',
  headerColor: '',
  headerTextColor: '',
  cardColor: '',
  cardTextColor: '',
};

export function Card({ cardId, enableSettings = false, ...props }: CardProps) {
  const [showConfig, setShowConfig] = useState(false);
  const [cardSettings, setCardSettings] =
    useState<CardSettings>(defaultCardSettings);

  const {
    settings: panelSettings,
    cardSettingsMap,
    saveCardSettings,
  } = useContext(PanelContext);

  useEffect(() => {
    if (cardId && cardSettingsMap && cardSettingsMap[cardId]) {
      setCardSettings(cardSettingsMap[cardId]);
    }
  }, [cardId, cardSettingsMap]);

  function handleSettingChanged(key: keyof CardSettings, value: string) {
    const newSettings = {
      ...cardSettings,
      [key]: value,
    };

    saveCardSettings(cardId!, newSettings);
  }

  function clearCardStyles() {
    saveCardSettings(cardId!, {
      ...defaultCardSettings,
      title: cardSettings.title,
    });
  }

  return (
    <div
      className={joinClasses(
        styles.root,
        ifClass(panelSettings.showCardShadow, styles.shadow),
        ifClass(panelSettings.showCardDividers, styles.divider),
        ifClass(
          panelSettings.displayStyle === PanelDisplayType.Lists,
          styles.list
        )
      )}
      style={{
        backgroundColor: cardSettings.cardColor,
        color: cardSettings.cardTextColor,
      }}
      data-card
      data-testid={props['data-testid']}
    >
      <CardHeader
        title={props.title || cardSettings.title || props.defaultTitle}
        backgroundColor={cardSettings.headerColor}
        textColor={cardSettings.headerTextColor}
        actions={
          <>
            {props.actions}
            {enableSettings && (
              <IconButton
                icon={<MdSettings />}
                title="Edit card settings"
                onClick={() => setShowConfig(true)}
                size={28}
                data-testid="btn-settings"
              />
            )}
          </>
        }
        onTitleChanged={(title) => {
          handleSettingChanged('title', title);
          props.onTitleChanged?.(title);
        }}
      />
      {props.children}
      {showConfig && cardId && (
        <Dialog
          title="Card Settings"
          width="medium"
          onClose={() => setShowConfig(false)}
          data-testid="dialog-card-settings"
        >
          <SettingsRow
            label="Header Color"
            helpText="Choose a custom color for this card's header."
          >
            <ThemeValueChooser
              value={cardSettings.headerColor}
              type="color"
              onChange={(val) => handleSettingChanged('headerColor', val)}
            />
          </SettingsRow>
          <SettingsRow
            label="Header Text Color"
            helpText="Choose a custom color for this card's header text."
          >
            <ThemeValueChooser
              value={cardSettings.headerTextColor}
              type="color"
              onChange={(val) => handleSettingChanged('headerTextColor', val)}
            />
          </SettingsRow>
          <SettingsRow
            label="Card Color"
            helpText="Choose a custom color for this card."
          >
            <ThemeValueChooser
              value={cardSettings.cardColor}
              type="color"
              onChange={(val) => handleSettingChanged('cardColor', val)}
            />
          </SettingsRow>
          <SettingsRow
            label="Card Text Color"
            helpText="Choose a custom color for this card's text."
          >
            <ThemeValueChooser
              value={cardSettings.cardTextColor}
              type="color"
              onChange={(val) => handleSettingChanged('cardTextColor', val)}
            />
          </SettingsRow>
          <Button
            text="Clear Styles"
            type={ControlType.Danger}
            location={ControlLocation.Card}
            fullWidth
            onClick={clearCardStyles}
          />
        </Dialog>
      )}
    </div>
  );
}
