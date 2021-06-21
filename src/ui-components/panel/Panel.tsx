import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdSettings } from 'react-icons/md';
import { PanelHeader } from '.';
import { ButtonType } from '../../enums/buttonType';
import { ComponentBase } from '../../models/ComponentBase';
import { IconButton } from '../button';
import { Button } from '../button/Button';
import styles from './Panel.module.css';
import { PanelSettings } from './PanelSettings';
import { SettingsRow } from './SettingsRow';

export type PanelOptions = {
  title: string;
  width: number;
  columns: number;
};

type PanelProps = ComponentBase & {
  options: PanelOptions;
  enableSettings?: boolean;
  onOptionsChanged?: (options: PanelOptions) => void;
  onDeletePanel?: () => void;
};

Panel.defaultProps = {
  enableSettings: true,
};

export function Panel(props: PanelProps) {
  const [showSettings, setShowSettings] = useState(false);

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

  return (
    <div
      className={styles.root}
      style={{ gridColumn: `span ${props.options.width}` }}
      data-testid={props['data-testid']}
    >
      <PanelHeader
        text={props.options.title}
        editable={showSettings}
        onTitleChanged={(title) => setOptionValue('title', title)}
      >
        {props.enableSettings ? (
          <IconButton
            onClick={() => setShowSettings(!showSettings)}
            data-testid="btn-settings"
          >
            <MdSettings />
          </IconButton>
        ) : null}
      </PanelHeader>
      {showSettings ? (
        <PanelSettings>
          <SettingsRow label="Columns">
            <select
              defaultValue={props.options.columns}
              onChange={(ev) =>
                setOptionValue('columns', parseInt(ev.target.value, 10))
              }
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
          <SettingsRow label="Width">
            <select
              defaultValue={props.options.width}
              onChange={(ev) => setOptionValue('width', ev.target.value)}
            >
              <option value={1}>Smallest</option>
              <option value={2}>Small</option>
              <option value={3}>Medium</option>
              <option value={4}>Large</option>
              <option value={5}>Largest</option>
            </select>
          </SettingsRow>
          <Button
            text="Delete"
            type={ButtonType.Danger}
            onClick={props.onDeletePanel}
          />
        </PanelSettings>
      ) : null}
      {props.children}
    </div>
  );
}
