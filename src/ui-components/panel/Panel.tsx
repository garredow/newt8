import React, { useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useContext } from 'react';
import { useEffect } from 'react';
import { MdSettings } from 'react-icons/md';
import { PanelHeader } from '.';
import { ControlKind } from '../../enums/controlKind';
import { ButtonType } from '../../enums/buttonType';
import { ComponentBase } from '../../models/ComponentBase';
import { DraggablePanelProps } from '../../models/DraggablePanelProps';
import { PanelOptions } from '../../services/panels';
import { SettingsContext } from '../../SettingsContext';
import { mixin } from '../../utilities/mixin';
import { IconButton } from '../button';
import { Button } from '../button/Button';
import { ConfirmDialog } from '../ConfirmDialog';
import styles from './Panel.module.css';
import { PanelSettings } from './PanelSettings';
import { SettingsRow } from './SettingsRow';
import { animateFade } from '../animations';
import { delay } from '../../utilities/delay';
import { PanelDisplayType } from '../../enums/panelDisplayType';

type PanelProps = ComponentBase &
  DraggablePanelProps & {
    options: PanelOptions;
    enableSettings?: boolean;
    enableColumns?: boolean;
    extraSettings?: React.ReactNode;
    onOptionsChanged: (options: PanelOptions) => void;
    onDeletePanel: () => void;
  };

export const Panel = React.forwardRef(
  (
    { enableSettings = true, enableColumns = false, ...props }: PanelProps,
    ref: any
  ) => {
    const [showSettings, setShowSettings] = useState(false);
    const [animateSettings, setAnimateSettings] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const settingsNodeRef = useRef(null);

    const { settings } = useContext(SettingsContext);

    useEffect(() => {
      const handleEscapeKey = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape' && showSettings) {
          handleShowSettings(false);
        }
      };
      window.addEventListener('keydown', handleEscapeKey);

      return () => window.removeEventListener('keydown', handleEscapeKey);
    });

    function setOptionValue(key: string, val: any) {
      const newOpts = { ...props.options, [key]: val };
      props.onOptionsChanged?.(newOpts);
    }

    function handleRequestDelete() {
      if (settings.confirmBeforeDelete) {
        setShowConfirm(true);
        return;
      }

      props.onDeletePanel();
    }

    async function handleShowSettings(show: boolean) {
      if (show) {
        setShowSettings(true);
        await delay(0);
        setAnimateSettings(true);
      } else {
        setAnimateSettings(false);
      }
    }

    const classes = [styles.root];
    return (
      <div
        className={classes.join(' ')}
        data-testid={props['data-testid']}
        ref={props.ref}
        style={{
          gridArea: props.panelId,
          ...props.style,
        }}
      >
        <PanelHeader
          className={styles.header}
          text={props.options.title}
          editable={showSettings}
          onTitleChanged={(title) => setOptionValue('title', title)}
          data-testid="panel-header"
        >
          <div
            className={mixin(
              styles.headerActions,
              settings.showActionsOnHover ? styles.headerActionsHidden : ''
            )}
          >
            {enableSettings ? (
              <IconButton
                icon={<MdSettings />}
                title="Edit panel settings"
                onClick={() => handleShowSettings(!showSettings)}
                data-testid="btn-settings"
              />
            ) : null}
          </div>
        </PanelHeader>

        <div className={styles.content}>
          {showSettings && (
            <Transition
              in={animateSettings}
              timeout={animateFade.duration}
              nodeRef={settingsNodeRef}
              onExited={() => setShowSettings(false)}
            >
              {(state) => (
                <PanelSettings
                  ref={settingsNodeRef}
                  style={{
                    ...animateFade.defaultStyles,
                    ...animateFade.transitionStyles[state],
                  }}
                  data-testid="settings"
                >
                  <SettingsRow
                    label="Display"
                    helpText="Choose how you want information in this panel displayed."
                  >
                    <select
                      value={props.options.display}
                      onChange={(ev) =>
                        setOptionValue('display', ev.target.value)
                      }
                      data-testid="select-display"
                    >
                      <option value={PanelDisplayType.Default}>Default</option>
                      <option value={PanelDisplayType.Cards}>Cards</option>
                      <option value={PanelDisplayType.Lists}>Lists</option>
                    </select>
                  </SettingsRow>
                  {enableColumns ? (
                    <SettingsRow
                      label="Columns"
                      helpText="The number of columns the cards in this panel will be arranged in. 'Auto' will change it depending on the panel width."
                    >
                      <select
                        defaultValue={props.options.columns}
                        onChange={(ev) =>
                          setOptionValue(
                            'columns',
                            parseInt(ev.target.value, 10)
                          )
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
                  <div
                    onClick={(ev) => {
                      if ((ev.target as HTMLDivElement).tagName === 'BUTTON') {
                        setShowSettings(false);
                        setAnimateSettings(false);
                      }
                    }}
                  >
                    {props.extraSettings}
                  </div>
                  <Button
                    text="Delete"
                    type={ButtonType.Danger}
                    kind={ControlKind.Panel}
                    onClick={handleRequestDelete}
                  />
                </PanelSettings>
              )}
            </Transition>
          )}
          {props.children}
        </div>
        {showConfirm && (
          <ConfirmDialog
            title="Confirm"
            message="Are you sure you want to delete this?"
            danger
            onCancel={() => setShowConfirm(false)}
            onConfirm={props.onDeletePanel}
            data-testid="confirm-delete-panel"
          />
        )}
      </div>
    );
  }
);
