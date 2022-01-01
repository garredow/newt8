import React from 'react';
import { ThemeValueChooser } from '../components/ThemeValueChooser';
import { ComponentBaseProps } from '../models/ComponentBaseProps';
import { Button } from './button';
import { Dialog } from './dialog/Dialog';
import { Checkbox, Input } from './input';
import { SettingsRow } from './list';
import { SettingsSection } from './list/SettingsSection';

export type SettingConfig = {
  type: 'input' | 'checkbox' | 'select' | 'button' | 'color';
  key: string;
  label: string;
  helpText?: string;
  options?: {
    label: string;
    value: any;
  }[];
  controlProps?: { [key: string]: any };
  onClick?: () => void;
  testId: string;
};

export type SettingConfigSection = {
  id: string;
  title?: string;
  items: SettingConfig[];
};

type SettingsDialogProps = ComponentBaseProps & {
  title: string;
  width?: 'small' | 'medium' | 'large';
  settings: SettingConfigSection[];
  settingsValues: { [key: string]: any };
  onSettingChanged: (key: string, value: any) => void;
  onClose: () => void;
};

export function SettingsDialog(props: SettingsDialogProps) {
  return (
    <Dialog
      title={props.title}
      width={props.width}
      onClose={props.onClose}
      data-testid={props['data-testid']}
    >
      {props.settings.map((section) => (
        <SettingsSection key={section.id} title={section.title}>
          {section.items.map((item) =>
            item.type === 'button' ? (
              <Button
                key={item.key}
                text={item.label}
                fullWidth
                {...item.controlProps}
                onClick={() => {
                  props.onClose?.();
                  item.onClick?.();
                }}
                data-testid={item.testId}
              />
            ) : (
              <SettingsRow
                key={item.key}
                label={item.label}
                helpText={item.helpText}
              >
                {item.type === 'select' ? (
                  <select
                    value={(props.settingsValues as any)[item.key]}
                    {...item.controlProps}
                    onChange={(ev) => {
                      const val = ev.target.value.match(/^[0-9]+$/)
                        ? parseInt(ev.target.value, 10)
                        : ev.target.value;
                      props.onSettingChanged(item.key, val);
                    }}
                    data-testid={item.testId}
                  >
                    {item.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : item.type === 'checkbox' ? (
                  <Checkbox
                    checked={(props.settingsValues as any)[item.key]}
                    {...item.controlProps}
                    onChange={(val) => props.onSettingChanged(item.key, val)}
                    data-testid={item.testId}
                  />
                ) : item.type === 'input' ? (
                  <Input
                    type="text"
                    spellCheck="false"
                    value={(props.settingsValues as any)[item.key]}
                    {...item.controlProps}
                    onChange={(val) => props.onSettingChanged(item.key, val)}
                    data-testid={item.testId}
                  />
                ) : item.type === 'color' ? (
                  <ThemeValueChooser
                    value={(props.settingsValues as any)[item.key]}
                    type="color"
                    {...item.controlProps}
                    onChange={(val) => props.onSettingChanged(item.key, val)}
                  />
                ) : null}
              </SettingsRow>
            )
          )}
        </SettingsSection>
      ))}
    </Dialog>
  );
}
