import React, { useState } from 'react';
import { useContext } from 'react';
import { MdSettings } from 'react-icons/md';
import { PanelHeader } from '.';
import { ControlLocation } from '../../enums/controlLocation';
import { ControlType } from '../../enums/controlType';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { Panel as PanelType } from '../../models/Panel';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';
import { joinClasses } from '../../utilities/classes';
import { IconButton } from '../button';
import { Button } from '../button/Button';
import { SettingsRow } from '../list/SettingsRow';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { Orientation } from '../../enums/orientation';
import { Dialog } from '../dialog/Dialog';
import styles from './Panel.module.css';
import { Checkbox } from '../input';
import { PanelSettings } from '../../contexts/PanelContext';
import { PanelProvider } from '../../contexts/PanelProvider';

type PanelProps = ComponentBaseProps & {
  panel: PanelType<PanelSettings>;
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
      panel,
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
            text={panel.options.title}
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
              panel.options.orientation === Orientation.Vertical
                ? styles.vertical
                : styles.horizontal
            )}
          >
            {props.children}
          </div>
          {showSettings && (
            <Dialog
              title={panel.options.title}
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
                  value={panel.options.title}
                  size={panel.options.title.length + 1}
                  onChange={(ev) => setOptionValue('title', ev.target.value)}
                  data-testid="inp-title"
                />
              </SettingsRow>
              <SettingsRow
                label="Display Style"
                helpText="Choose how you want information in this panel displayed."
              >
                <select
                  value={panel.options.displayStyle}
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
                    defaultValue={panel.options.orientation}
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
              {enableColumns ? (
                <SettingsRow
                  label="Columns"
                  helpText="The number of columns the cards in this panel will be arranged in. 'Auto' will change it depending on the panel width."
                >
                  <select
                    defaultValue={panel.options.columns}
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
              {enableSecondaryText ? (
                <SettingsRow
                  label="Show Site Secondary Text"
                  helpText="This is usually the site's URL."
                >
                  <Checkbox
                    location={ControlLocation.Panel}
                    checked={panel.options.showSecondaryText}
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
                    checked={panel.options.showAccentText}
                    onChange={(checked) =>
                      setOptionValue('showAccentText', checked)
                    }
                  />
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
      </PanelProvider>
    );
  }
);
