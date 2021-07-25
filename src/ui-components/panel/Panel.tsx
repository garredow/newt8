import React, { useState } from 'react';
import { useContext } from 'react';
import { MdSettings } from 'react-icons/md';
import { PanelHeader } from '.';
import { ControlLocation } from '../../enums/controlLocation';
import { ControlType } from '../../enums/controlType';
import { ComponentBase } from '../../models/ComponentBase';
import { DraggablePanelProps } from '../../models/DraggablePanelProps';
import { PanelOptions } from '../../services/panels';
import { SettingsContext } from '../../SettingsContext';
import { mixin } from '../../utilities/mixin';
import { IconButton } from '../button';
import { Button } from '../button/Button';
import { ConfirmDialog } from '../dialog/ConfirmDialog';
import styles from './Panel.module.css';
import { SettingsRow } from '../list/SettingsRow';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { Orientation } from '../../enums/orientation';
import { Dialog } from '../dialog/Dialog';

type PanelProps = ComponentBase &
  DraggablePanelProps & {
    options: PanelOptions;
    enableSettings?: boolean;
    enableColumns?: boolean;
    enableOrientation?: boolean;
    extraSettings?: React.ReactNode;
    extraButtons?: React.ReactNode;
    onOptionsChanged: (options: PanelOptions) => void;
    onDeletePanel: () => void;
  };

export const Panel = React.forwardRef(
  (
    {
      enableSettings = true,
      enableColumns = false,
      enableOrientation = false,
      ...props
    }: PanelProps,
    ref: any
  ) => {
    const [showSettings, setShowSettings] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { settings } = useContext(SettingsContext);

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

    const classes = [styles.root];
    return (
      <div
        className={classes.join(' ')}
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
                onClick={() => setShowSettings(true)}
                data-testid="btn-settings"
              />
            ) : null}
          </div>
        </PanelHeader>

        <div
          className={mixin(
            styles.content,
            props.options.orientation === Orientation.Vertical
              ? styles.vertical
              : styles.horizontal
          )}
        >
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
        {showSettings && (
          <Dialog
            title={props.options.title}
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
                value={props.options.display}
                onChange={(ev) => setOptionValue('display', ev.target.value)}
                data-testid="select-display"
              >
                <option value={PanelDisplayType.Default}>Default</option>
                <option value={PanelDisplayType.Cards}>Cards</option>
                <option value={PanelDisplayType.Lists}>Lists</option>
              </select>
            </SettingsRow>
            {enableOrientation ? (
              <SettingsRow
                label="Orientation"
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
              onClick={handleRequestDelete}
            />
          </Dialog>
        )}
      </div>
    );
  }
);
