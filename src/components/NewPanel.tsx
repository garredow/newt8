import React from 'react';
import { Panel, PanelContent, PanelOptions } from '../ui-components/panel';
import styles from './NewPanel.module.css';
import { PanelType } from '../enums/panelType';
import { ButtonType } from '../enums/buttonType';
import { ButtonKind } from '../enums/buttonKind';
import { Button } from '../ui-components/button/Button';

const panelNameMap = {
  [PanelType.New]: 'New',
  [PanelType.Bookmarks]: 'Bookmarks',
  [PanelType.RecentTabs]: 'Recent Tabs',
  [PanelType.Windows]: 'Windows',
  [PanelType.RecentlyClosed]: 'Recently Closed Tabs',
  [PanelType.Devices]: 'Other Devices',
};

type NewPanelOptions = PanelOptions;

type NewPanelProps = {
  availablePanels: PanelType[];
  options?: NewPanelOptions;
  onPanelTypeChanged: (panelType: PanelType) => void;
  onDeletePanel: () => void;
};

export function NewPanel(props: NewPanelProps) {
  const options: NewPanelOptions = Object.assign(
    {
      columns: 1,
      width: 3,
      title: 'New Panel',
    },
    props.options
  );

  return (
    <Panel
      options={options}
      enableSettings={false}
      onOptionsChanged={() => {}}
      onDeletePanel={props.onDeletePanel}
    >
      <PanelContent columns={1}>
        What do you want to put in here?
        {props.availablePanels.length === 0 && (
          <div className={styles.message}>
            You've already placed all the available panels.
          </div>
        )}
        {props.availablePanels.map((panel) => (
          <Button
            key={panel}
            text={panelNameMap[panel]}
            type={ButtonType.Secondary}
            kind={ButtonKind.Panel}
            onClick={() => props.onPanelTypeChanged(panel)}
          />
        ))}
        <Button
          text="Delete"
          type={ButtonType.Danger}
          kind={ButtonKind.Panel}
          onClick={props.onDeletePanel}
        />
      </PanelContent>
    </Panel>
  );
}
