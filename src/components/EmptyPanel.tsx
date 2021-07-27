import React from 'react';
import { Panel, PanelContent } from '../ui-components/panel';
import { ComponentBaseProps } from '../models/ComponentBaseProps';
import { PanelSettings } from '../contexts/PanelContext';
import { PanelBaseProps } from '../models/PanelBaseProps';

type EmptyPanelOptions = PanelSettings;

type EmptyPanelProps = ComponentBaseProps & PanelBaseProps<EmptyPanelOptions>;

export function EmptyPanel(props: EmptyPanelProps) {
  return (
    <Panel
      panel={props.panel}
      enableSettings={true}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
    >
      <PanelContent />
    </Panel>
  );
}
