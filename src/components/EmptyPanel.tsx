import React from 'react';
import { Panel, PanelContent } from '../ui-components/panel';
import { PanelKind } from '../enums/panelKind';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig } from '../services/panels';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import { PanelSettings } from '../ui-components/panel/PanelContext';

type EmptyPanelOptions = PanelSettings;

type EmptyPanelProps = ComponentBase &
  DraggablePanelProps & {
    options?: EmptyPanelOptions;
    onOptionsChanged: (options: EmptyPanelOptions) => void;

    onDeletePanel: () => void;
  };

export function EmptyPanel(props: EmptyPanelProps) {
  const options: EmptyPanelOptions = Object.assign(
    getPanelConfig(PanelKind.Empty).defaultOptions,
    props.options
  );

  return (
    <Panel
      panelId={props.panelId}
      panelIndex={props.panelIndex}
      options={options}
      enableSettings={true}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
    >
      <PanelContent />
    </Panel>
  );
}
