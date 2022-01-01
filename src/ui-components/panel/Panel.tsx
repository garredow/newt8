import React, { useContext, useState } from 'react';
import { MdSettings } from 'react-icons/md';
import { PanelHeader } from '.';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';
import { PanelSettings } from '../../contexts/PanelContext';
import { PanelProvider } from '../../contexts/PanelProvider';
import { ControlType } from '../../enums/controlType';
import { Orientation } from '../../enums/orientation';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { Panel as PanelType } from '../../models/Panel';
import { PanelSettingsSection } from '../../services/panels';
import { ifClass, joinClasses } from '../../utilities/classes';
import { IconButton } from '../button';
import { SettingsDialog } from '../SettingsDialog';
import styles from './Panel.module.css';

const defaultSettingsConfig: PanelSettingsSection[] = [
  {
    id: 'panelLayout',
    title: 'Panel Layout',
    items: [
      {
        type: 'select',
        key: 'displayStyle',
        label: 'Display Style',
        helpText: 'Choose how you want information in this panel displayed.',
        options: [
          { label: 'Default', value: PanelDisplayType.Default },
          { label: 'Cards', value: PanelDisplayType.Cards },
          { label: 'Lists', value: PanelDisplayType.Lists },
        ],
        testId: 'select-display-style',
      },
      {
        type: 'select',
        key: 'orientation',
        label: 'Scroll Orientation',
        helpText:
          'Whether this panel should scroll horizontally or vertically.',
        options: [
          { label: 'Horizontal', value: Orientation.Horizontal },
          { label: 'Vertical', value: Orientation.Vertical },
        ],
        testId: 'select-orientation',
      },
      {
        type: 'select',
        key: 'columns',
        label: 'Columns',
        helpText:
          "The number of columns the cards in this panel will be arranged in. 'Auto' will change it depending on the panel width.",
        options: [
          { label: 'Auto', value: 0 },
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
          { label: '4', value: 4 },
          { label: '5', value: 5 },
          { label: '6', value: 6 },
          { label: '7', value: 7 },
          { label: '8', value: 8 },
          { label: '9', value: 9 },
          { label: '10', value: 10 },
        ],
        testId: 'select-columns',
      },
      {
        type: 'checkbox',
        key: 'fitCardsToViewport',
        label: 'Fit Cards to Viewport',
        helpText:
          'Any cards in the panel will resize to fit on your screen without scrolling.',
        testId: 'check-fit-cards',
      },
    ],
  },
];

export type PanelProps = ComponentBaseProps & {
  panel: PanelType<PanelSettings>;
  settings?: PanelSettingsSection[];
  onOptionsChanged: (options: PanelSettings) => void;
  onDeletePanel: () => void;
};

export const Panel = React.forwardRef(
  ({ panel, ...props }: PanelProps, ref: any) => {
    const [showSettings, setShowSettings] = useState(false);
    const { settings: appSettings } = useContext(AppSettingsContext);

    function setOptionValue(key: string, val: any) {
      const newOpts = { ...panel.options, [key]: val };
      props.onOptionsChanged?.(newOpts);
    }

    return (
      <PanelProvider panel={panel}>
        <div
          className={styles.root}
          data-testid={props['data-testid']}
          ref={ref}
          style={{
            gridArea: panel.id,
            ...props.style,
          }}
        >
          <PanelHeader
            className={styles.header}
            title={panel.options.title}
            onTitleChanged={(title) => setOptionValue('title', title)}
            data-testid="panel-header"
          >
            <div
              className={joinClasses(
                styles.headerActions,
                ifClass(
                  appSettings.showActionsOnHover,
                  styles.headerActionsHidden
                )
              )}
            >
              <IconButton
                icon={<MdSettings />}
                title="Edit panel settings"
                onClick={() => setShowSettings(true)}
                data-testid="btn-settings"
              />
            </div>
          </PanelHeader>

          <div
            className={joinClasses(
              styles.content,
              ifClass(
                panel.options.orientation === Orientation.Vertical,
                styles.vertical,
                styles.horizontal
              )
            )}
          >
            {props.children}
          </div>
          {showSettings && (
            <SettingsDialog
              title="Panel Settings"
              width="medium"
              settings={[
                {
                  id: 'panelLayout',
                  title: 'Panel Layout',
                  items: [
                    {
                      type: 'select',
                      key: 'displayStyle',
                      label: 'Display Style',
                      helpText:
                        'Choose how you want information in this panel displayed.',
                      options: [
                        { label: 'Default', value: PanelDisplayType.Default },
                        { label: 'Cards', value: PanelDisplayType.Cards },
                        { label: 'Lists', value: PanelDisplayType.Lists },
                      ],
                      testId: 'select-display-style',
                    },
                    {
                      type: 'select',
                      key: 'orientation',
                      label: 'Scroll Orientation',
                      helpText:
                        'Whether this panel should scroll horizontally or vertically.',
                      options: [
                        { label: 'Horizontal', value: Orientation.Horizontal },
                        { label: 'Vertical', value: Orientation.Vertical },
                      ],
                      testId: 'select-orientation',
                    },
                    {
                      type: 'select',
                      key: 'columns',
                      label: 'Columns',
                      helpText:
                        "The number of columns the cards in this panel will be arranged in. 'Auto' will change it depending on the panel width.",
                      options: [
                        { label: 'Auto', value: 0 },
                        { label: '1', value: 1 },
                        { label: '2', value: 2 },
                        { label: '3', value: 3 },
                        { label: '4', value: 4 },
                        { label: '5', value: 5 },
                        { label: '6', value: 6 },
                        { label: '7', value: 7 },
                        { label: '8', value: 8 },
                        { label: '9', value: 9 },
                        { label: '10', value: 10 },
                      ],
                      testId: 'select-columns',
                    },
                    {
                      type: 'checkbox',
                      key: 'fitCardsToViewport',
                      label: 'Fit Cards to Viewport',
                      helpText:
                        'Any cards in the panel will resize to fit on your screen without scrolling.',
                      testId: 'check-fit-cards',
                    },
                  ],
                },
                ...(props.settings || []),
                {
                  id: 'defaultActions',
                  items: [
                    {
                      type: 'button',
                      key: 'deletePanel',
                      label: 'Delete Panel',
                      testId: 'btn-delete-panel',
                      controlProps: {
                        type: ControlType.Danger,
                        clickToConfirm: appSettings.confirmBeforeDelete,
                      },
                      onClick: props.onDeletePanel,
                    },
                  ],
                },
              ]}
              settingsValues={panel.options}
              onSettingChanged={setOptionValue}
              onClose={() => setShowSettings(false)}
              data-testid="dialog-panel-settings"
            />
          )}
        </div>
      </PanelProvider>
    );
  }
);
