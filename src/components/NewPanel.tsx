import React, { useState } from 'react';
import { Panel, PanelContent } from '../ui-components/panel';
import styles from './NewPanel.module.css';
import { PanelType } from '../enums/panelType';
import { ButtonType } from '../enums/buttonType';
import { ButtonKind } from '../enums/buttonKind';
import { Button } from '../ui-components/button/Button';
import {
  PermissionDetail,
  permissionNameMap,
  requestPermissions,
  verifyPermissionsForPanel,
} from '../services/permissions';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig, PanelOptions } from '../services/panels';

type NewPanelOptions = PanelOptions;

type NewPanelProps = ComponentBase & {
  availablePanels: PanelType[];
  options?: NewPanelOptions;
  onPanelTypeChanged: (panelType: PanelType) => void;
  onDeletePanel: () => void;
};

export function NewPanel(props: NewPanelProps) {
  const [showPermissions, setShowPermissions] = useState(false);
  const [permissions, setPermissions] = useState<PermissionDetail[]>([]);
  const [panelType, setPanelType] = useState<PanelType | undefined>();
  const [permissionsError, setPermissionsError] = useState(false);

  const options: NewPanelOptions = Object.assign(
    {
      columns: 1,
      width: 3,
      title: 'New Panel',
    },
    props.options
  );

  async function checkPermissions(panelType: PanelType) {
    const missingPermissions = await verifyPermissionsForPanel(panelType);

    if (missingPermissions.length > 0) {
      setPanelType(panelType);
      setPermissions(missingPermissions);
      setShowPermissions(true);
      return;
    }

    props.onPanelTypeChanged(panelType);
  }

  async function request() {
    const success = await requestPermissions(permissions.map((a) => a.key));

    if (!success) {
      setPermissionsError(true);
      return;
    }

    props.onPanelTypeChanged(panelType!);
  }

  function cancelRequest() {
    setShowPermissions(false);
    setPermissions([]);
    setPanelType(undefined);
    setPermissionsError(false);
  }

  return (
    <Panel
      options={options}
      enableSettings={false}
      onOptionsChanged={() => {}}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
    >
      {showPermissions ? (
        <PanelContent columns={1}>
          <p>
            Before we can add this panel, Newt needs some extra permissions. If
            everything below looks ok to you, click the 'Request Permissons'
            button to finish setting up this panel.
          </p>
          <ul className={styles.permissionsList}>
            {permissions.map((a) => (
              <li key={a.key}>
                <b>{(permissionNameMap as any)[a.key]}</b>
                <div>{a.reason}</div>
              </li>
            ))}
          </ul>
          <Button
            text="Request Permissions"
            onClick={request}
            type={ButtonType.Primary}
            kind={ButtonKind.Panel}
          />
          <Button
            text="Cancel"
            onClick={cancelRequest}
            type={ButtonType.Secondary}
            kind={ButtonKind.Panel}
          />
          {permissionsError ? (
            <p className={styles.error}>
              Failed to get permissions. Please try again.
            </p>
          ) : null}
        </PanelContent>
      ) : (
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
              text={getPanelConfig(panel).name}
              type={ButtonType.Secondary}
              kind={ButtonKind.Panel}
              onClick={() => checkPermissions(panel)}
            />
          ))}
          <Button
            text="Delete"
            type={ButtonType.Danger}
            kind={ButtonKind.Panel}
            onClick={props.onDeletePanel}
          />
        </PanelContent>
      )}
    </Panel>
  );
}
