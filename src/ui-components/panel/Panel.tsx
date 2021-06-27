import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MdCompareArrows, MdSettings } from 'react-icons/md';
import { PanelHeader } from '.';
import { ButtonKind } from '../../enums/buttonKind';
import { ButtonType } from '../../enums/buttonType';
import { ComponentBase } from '../../models/ComponentBase';
import { DraggablePanelProps } from '../../models/DraggablePanelProps';
import { PanelOptions } from '../../services/panels';
import { SettingsContext } from '../../SettingsContext';
import { IconButton } from '../button';
import { Button } from '../button/Button';
import { ConfirmDialog } from '../ConfirmDialog';
import styles from './Panel.module.css';
import { PanelSettings } from './PanelSettings';
import { SettingsRow } from './SettingsRow';

type PanelProps = ComponentBase &
  DraggablePanelProps & {
    options: PanelOptions;
    enableSettings?: boolean;
    extraSettings?: React.ReactNode;
    onOptionsChanged: (options: PanelOptions) => void;
    onDeletePanel: () => void;
  };

Panel.defaultProps = {
  enableSettings: true,
};

export function Panel(props: PanelProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    const handleEscapeKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && showSettings) {
        setShowSettings(false);
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

  const classes = [styles.root];
  classes.push(styles[`span${props.options.width}`]);

  return (
    <Draggable draggableId={props.panelId} index={props.panelIndex}>
      {(provided) => (
        <div
          className={classes.join(' ')}
          style={{ gridColumn: `span ${props.options.width}` }}
          data-testid={props['data-testid']}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <PanelHeader
            text={props.options.title}
            editable={showSettings}
            onTitleChanged={(title) => setOptionValue('title', title)}
            data-testid="panel-header"
          >
            <div>
              <IconButton
                icon={<MdCompareArrows />}
                title="Drag to reorder"
                onClick={() => {}}
                data-testid="btn-drag"
                {...provided.dragHandleProps}
              />
              {props.enableSettings ? (
                <IconButton
                  icon={<MdSettings />}
                  title="Edit panel settings"
                  onClick={() => setShowSettings(!showSettings)}
                  data-testid="btn-settings"
                />
              ) : null}
            </div>
          </PanelHeader>
          {showSettings ? (
            <PanelSettings data-testid="settings">
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
              <SettingsRow
                label="Width"
                helpText="How wide this column is in relation to the others in the dashboard."
              >
                <select
                  defaultValue={props.options.width}
                  onChange={(ev) =>
                    setOptionValue('width', parseInt(ev.target.value, 10))
                  }
                  data-testid="select-width"
                >
                  <option value={1}>Smallest</option>
                  <option value={2}>Small</option>
                  <option value={3}>Medium</option>
                  <option value={4}>Large</option>
                  <option value={5}>Largest</option>
                </select>
              </SettingsRow>
              {props.extraSettings}
              <Button
                text="Delete"
                type={ButtonType.Danger}
                kind={ButtonKind.Panel}
                onClick={handleRequestDelete}
              />
            </PanelSettings>
          ) : null}
          {props.children}
          {showConfirm && (
            <ConfirmDialog
              title="Confirm"
              message="Are you sure you want to delete this?"
              danger
              onCancel={() => setShowConfirm(false)}
              onConfirm={props.onDeletePanel}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}
