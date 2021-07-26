import React, { useState } from 'react';
import { useContext } from 'react';
import { MdSettings } from 'react-icons/md';
import { PanelHeader } from '.';
import { ControlLocation } from '../../enums/controlLocation';
import { ControlType } from '../../enums/controlType';
import { ComponentBase } from '../../models/ComponentBase';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';
import { joinClasses } from '../../utilities/classes';
import { IconButton } from '../button';
import { Button } from '../button/Button';
import { SettingsRow } from '../list/SettingsRow';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { Orientation } from '../../enums/orientation';
import { Dialog } from '../dialog/Dialog';
import styles from './Panel.module.css';
import { DraggablePanelProps } from '../../models/DraggablePanelProps';
import { Checkbox } from '../input';
import {
  defaultPanelSettings,
  PanelContext,
  PanelSettings,
} from '../../contexts/PanelContext';
import { useEffect } from 'react';

type PanelProps = ComponentBase &
  DraggablePanelProps & {
    options: PanelSettings;
    enableSettings?: boolean;
    enableColumns?: boolean;
    enableOrientation?: boolean;
    enableSecondaryText?: boolean;
    enableAccentText?: boolean;
    extraSettings?: React.ReactNode;
    extraButtons?: React.ReactNode;
    onOptionsChanged: (options: PanelSettings) => void;
    onDeletePanel: () => void;
  };

export const Panel = React.forwardRef(
  (
    {
      enableSettings = true,
      enableColumns = false,
      enableOrientation = false,
      enableSecondaryText = true,
      enableAccentText = true,
      ...props
    }: PanelProps,
    ref: any
  ) => {
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] =
      useState<PanelSettings>(defaultPanelSettings);
    const { settings: appSettings } = useContext(AppSettingsContext);

    useEffect(() => {
      // Figure out settings here so rest of panel doesn't have to
      const newSettings: PanelSettings = {
        ...props.options,
        ...appSettings,
        displayStyle:
          props.options.displayStyle === PanelDisplayType.Default
            ? appSettings.defaultPanelDisplay
            : props.options.displayStyle,
      };

      setSettings(newSettings);
    }, [appSettings, props.options]);

    function setOptionValue(key: string, val: any) {
      const newOpts = { ...props.options, [key]: val };
      props.onOptionsChanged?.(newOpts);
    }

    return (
      <PanelContext.Provider value={{ settings }}>
        <div
          className={styles.root}
          data-testid={props['data-testid']}
          ref={ref}
          style={{
            gridArea: props.panelId,
            ...props.style,
          }}
        >
          <PanelHeader
            className={styles.header}
            text={props.options.title}
            data-testid="panel-header"
          >
            <div
              className={joinClasses(
                styles.headerActions,
                appSettings.showActionsOnHover ? styles.headerActionsHidden : ''
              )}
            >
              {enableSettings ? (
                <IconButton
                  icon={<MdSettings />}
                  title="Edit panel settings"
                  onClick={() => setShowSettings(true)}
                  data-testid="btn-settings"
                />
              ) : null}
            </div>
          </PanelHeader>

          <div
            className={joinClasses(
              styles.content,
              props.options.orientation === Orientation.Vertical
                ? styles.vertical
                : styles.horizontal
            )}
          >
            {props.children}
          </div>
          {showSettings && (
            <Dialog
              title={props.options.title}
              width="medium"
              onClose={() => setShowSettings(false)}
              data-testid="settings"
            >
              <SettingsRow
                label="Title"
                helpText="What should this panel be called?"
              >
                <input
                  type="text"
                  value={props.options.title}
                  size={props.options.title.length + 1}
                  onChange={(ev) => setOptionValue('title', ev.target.value)}
                  data-testid="inp-title"
                />
              </SettingsRow>
              <SettingsRow
                label="Display"
                helpText="Choose how you want information in this panel displayed."
              >
                <select
                  value={props.options.displayStyle}
                  onChange={(ev) =>
                    setOptionValue('displayStyle', ev.target.value)
                  }
                  data-testid="select-display-style"
                >
                  <option value={PanelDisplayType.Default}>Default</option>
                  <option value={PanelDisplayType.Cards}>Cards</option>
                  <option value={PanelDisplayType.Lists}>Lists</option>
                </select>
              </SettingsRow>
              {enableOrientation ? (
                <SettingsRow
                  label="Scroll Orientation"
                  helpText="Whether this panel should scroll horizontally or vertically."
                >
                  <select
                    defaultValue={props.options.orientation}
                    onChange={(ev) =>
                      setOptionValue('orientation', ev.target.value)
                    }
                    data-testid="select-orientation"
                  >
                    <option value={Orientation.Vertical}>Vertical</option>
                    <option value={Orientation.Horizontal}>Horizontal</option>
                  </select>
                </SettingsRow>
              ) : null}
              {enableSecondaryText ? (
                <SettingsRow
                  label="Show Site Secondary Text"
                  helpText="This is usually the site's URL."
                >
                  <Checkbox
                    location={ControlLocation.Panel}
                    checked={props.options.showSecondaryText}
                    onChange={(checked) =>
                      setOptionValue('showSecondaryText', checked)
                    }
                  />
                </SettingsRow>
              ) : null}
              {enableAccentText ? (
                <SettingsRow
                  label="Show Site Accent Text"
                  helpText="This is usually the time the site was last accessed."
                >
                  <Checkbox
                    location={ControlLocation.Panel}
                    checked={props.options.showAccentText}
                    onChange={(checked) =>
                      setOptionValue('showAccentText', checked)
                    }
                  />
                </SettingsRow>
              ) : null}
              {enableColumns ? (
                <SettingsRow
                  label="Columns"
                  helpText="The number of columns the cards in this panel will be arranged in. 'Auto' will change it depending on the panel width."
                >
                  <select
                    defaultValue={props.options.columns}
                    onChange={(ev) =>
                      setOptionValue('columns', parseInt(ev.target.value, 10))
                    }
                    data-testid="select-columns"
                  >
                    <option value={0}>Auto</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                </SettingsRow>
              ) : null}
              {props.extraSettings}
              <div
                className={styles.extraButtons}
                onClick={(ev) => {
                  if ((ev.target as HTMLButtonElement).tagName === 'BUTTON') {
                    setShowSettings(false);
                  }
                }}
              >
                {props.extraButtons}
              </div>
              <Button
                text="Delete Panel"
                type={ControlType.Danger}
                location={ControlLocation.Panel}
                fullWidth
                clickToConfirm={appSettings.confirmBeforeDelete}
                onClick={props.onDeletePanel}
              />
            </Dialog>
          )}
        </div>
      </PanelContext.Provider>
    );
  }
);
