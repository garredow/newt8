import React, { useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
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
import { mixin } from '../../utilities/mixin';
import { IconButton } from '../button';
import { Button } from '../button/Button';
import { ConfirmDialog } from '../ConfirmDialog';
import styles from './Panel.module.css';
import { PanelSettings } from './PanelSettings';
import { SettingsRow } from './SettingsRow';
import { animateFade } from '../animations';
import { delay } from '../../utilities/delay';

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

  return (
    <Draggable draggableId={props.panelId} index={props.panelIndex}>
      {(provided, data) => {
        const classes = [styles.root];
        classes.push(styles[`span${props.options.width}`]);
        if (provided.draggableProps.style?.transform && !data.isDragging) {
          classes.push(styles.draggableMargin);
        }
        return (
          <div
            className={classes.join(' ')}
            data-testid={props['data-testid']}
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
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
                <IconButton
                  className={styles.btnMove}
                  icon={<MdCompareArrows />}
                  title="Drag to reorder"
                  data-testid="btn-drag"
                  {...provided.dragHandleProps}
                />
                {props.enableSettings ? (
                  <IconButton
                    icon={<MdSettings />}
                    title="Edit panel settings"
                    onClick={() => handleShowSettings(!showSettings)}
                    data-testid="btn-settings"
                  />
                ) : null}
              </div>
            </PanelHeader>

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
                    <div
                      onClick={(ev) => {
                        if (
                          (ev.target as HTMLDivElement).tagName === 'BUTTON'
                        ) {
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
                      kind={ButtonKind.Panel}
                      onClick={handleRequestDelete}
                    />
                  </PanelSettings>
                )}
              </Transition>
            )}
            {props.children}
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
      }}
    </Draggable>
  );
}
