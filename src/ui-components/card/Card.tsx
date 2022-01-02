import React, { useContext, useEffect, useState } from 'react';
import { MdSettings } from 'react-icons/md';
import { CardHeader } from '.';
import { PanelContext } from '../../contexts/PanelContext';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { CardSettings } from '../../models/CardSettings';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { ifClass, joinClasses } from '../../utilities/classes';
import { IconButton } from '../button';
import { SettingConfigSection, SettingsDialog } from '../SettingsDialog';
import styles from './Card.module.css';

export type CardProps = ComponentBaseProps & {
  cardId: string;
  headerIcon?: React.ReactNode;
  defaultTitle?: string;
  title?: string;
  canCustomize?: boolean;
  settings?: SettingConfigSection[];
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

export function Card({ cardId, canCustomize = true, ...props }: CardProps) {
  const [showSettings, setShowSettings] = useState(false);
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

  function setOptionValue(key: string, value: any) {
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
        ),
        props.className
      )}
      style={{
        backgroundColor: cardSettings.cardColor,
        color: cardSettings.cardTextColor,
      }}
      data-testid={props['data-testid']}
    >
      <CardHeader
        icon={props.headerIcon}
        title={props.title || cardSettings.title || props.defaultTitle}
        backgroundColor={cardSettings.headerColor}
        textColor={cardSettings.headerTextColor}
        actions={
          <>
            {props.actions}
            {canCustomize && (
              <IconButton
                icon={<MdSettings />}
                title="Edit card settings"
                onClick={() => setShowSettings(true)}
                size={28}
                data-testid="btn-settings"
              />
            )}
          </>
        }
        onTitleChanged={(title) => {
          setOptionValue('title', title);
          props.onTitleChanged?.(title);
        }}
      />
      {props.children}
      {showSettings && (
        <SettingsDialog
          title="Card Settings"
          width="medium"
          settings={[
            {
              id: 'style',
              title: 'Style',
              items: [
                {
                  type: 'color',
                  key: 'headerColor',
                  label: 'Header Color',
                  helpText: "Choose a custom color for this card's header.",
                  testId: 'input-header-bg',
                },
                {
                  type: 'color',
                  key: 'headerTextColor',
                  label: 'Header Text Color',
                  helpText:
                    "Choose a custom color for this card's header text.",
                  testId: 'input-header-text',
                },
                {
                  type: 'color',
                  key: 'cardColor',
                  label: 'Card Color',
                  helpText: 'Choose a custom color for this card.',
                  testId: 'input-card-bg',
                },
                {
                  type: 'color',
                  key: 'cardTextColor',
                  label: 'Card Text Color',
                  helpText: "Choose a custom color for this card's text.",
                  testId: 'input-card-text',
                },
                {
                  type: 'button',
                  key: 'clearStyles',
                  label: 'Clear Styles',
                  testId: 'btn-clear-styles',
                  onClick: clearCardStyles,
                },
              ],
            },
            ...(props.settings || []),
          ]}
          settingsValues={cardSettings}
          onSettingChanged={setOptionValue}
          onClose={() => setShowSettings(false)}
          data-testid="dialog-card-settings"
        />
      )}
    </div>
  );
}
