import React from 'react';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import styles from './NewPanel.module.css';
import { PanelType } from '../enums/panelType';
import { CardButton } from '../ui-components/card';
import { ButtonType } from '../enums/buttonType';

const panelNameMap = {
  [PanelType.New]: 'New',
  [PanelType.Bookmarks]: 'Bookmarks',
  [PanelType.RecentTabs]: 'Recent Tabs',
  [PanelType.Windows]: 'Windows',
};

type NewPanelProps = {
  availablePanels: PanelType[];
  onPanelTypeChanged: (panelType: PanelType) => void;
  onDeletePanel: () => void;
};

export function NewPanel(props: NewPanelProps) {
  console.log('available', props.availablePanels);

  return (
    <div className={styles.root}>
      <Panel>
        <PanelHeader text="New Panel" />
        <PanelContent columns={1}>
          What do you want to put in here?
          {props.availablePanels.length === 0 && (
            <div className={styles.message}>
              You've already placed all the available panels.
            </div>
          )}
          {props.availablePanels.map((panel) => (
            <CardButton
              key={panel}
              text={panelNameMap[panel]}
              onClick={() => props.onPanelTypeChanged(panel)}
            ></CardButton>
          ))}
          <CardButton
            text="Delete"
            type={ButtonType.Danger}
            onClick={props.onDeletePanel}
          ></CardButton>
        </PanelContent>
      </Panel>
    </div>
  );
}
