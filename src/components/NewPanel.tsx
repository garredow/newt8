import React, { useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { Panel, PanelContent } from '../ui-components/panel';
import styles from './NewPanel.module.css';
import { PanelType } from '../enums/panelType';
import { ButtonType } from '../enums/buttonType';
import { ControlKind } from '../enums/controlKind';
import { Button } from '../ui-components/button/Button';
import {
  PermissionDetail,
  permissionNameMap,
  requestPermissions,
  verifyPermissionsForPanel,
} from '../services/permissions';
import { ComponentBase } from '../models/ComponentBase';
import {
  getPanelConfig,
  getPanelConfigs,
  PanelOptions,
} from '../services/panels';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import { useEffect } from 'react';
import { animateSlideLeft } from '../ui-components/animations';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../ui-components/card';

type NewPanelOptions = PanelOptions;

type NewPanelProps = ComponentBase &
  DraggablePanelProps & {
    options?: NewPanelOptions;
    onPanelTypeChanged: (panelType: PanelType) => void;
    onDeletePanel: () => void;
  };

export function NewPanel(props: NewPanelProps) {
  const [showPermissions, setShowPermissions] = useState(false);
  const [permissions, setPermissions] = useState<PermissionDetail[]>([]);
  const [panelType, setPanelType] = useState<PanelType | undefined>();
  const [permissionsError, setPermissionsError] = useState(false);
  const [animate, setAnimate] = useState(false);
  const nodeRef = useRef(null);

  const options: NewPanelOptions = Object.assign(
    {
      columns: 1,
      width: 3,
      title: 'New Panel',
    },
    props.options
  );

  const availablePanels = getPanelConfigs().map((a) => a.kind);

  useEffect(() => {
    setAnimate(true);
  }, []);

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
    <Transition
      in={animate}
      timeout={animateSlideLeft.duration}
      nodeRef={nodeRef}
    >
      {(state) => (
        <Panel
          panelId={props.panelId}
          panelIndex={props.panelIndex}
          options={options}
          enableSettings={false}
          onOptionsChanged={() => {}}
          onDeletePanel={props.onDeletePanel}
          ref={nodeRef}
          style={{
            gridArea: props.panelId,
            ...animateSlideLeft.defaultStyles,
            ...animateSlideLeft.transitionStyles[state],
          }}
          data-testid={props['data-testid']}
        >
          {showPermissions ? (
            <PanelContent columns={1}>
              <p>
                Before we can add this panel, Newt needs some extra permissions.
                If everything below looks ok to you, click the 'Request
                Permissions' button to finish setting up this panel.
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
                kind={ControlKind.Panel}
              />
              <Button
                text="Cancel"
                onClick={cancelRequest}
                type={ButtonType.Secondary}
                kind={ControlKind.Panel}
              />
              {permissionsError ? (
                <p className={styles.error}>
                  Failed to get permissions. Please try again.
                </p>
              ) : null}
            </PanelContent>
          ) : (
            <PanelContent columns={0}>
              {availablePanels.map((panel) => (
                <Card key={panel}>
                  <CardHeader text={getPanelConfig(panel).name} />
                  <CardContent>{getPanelConfig(panel).description}</CardContent>
                  <CardFooter>
                    <Button
                      key={panel}
                      text="Add Panel"
                      type={ButtonType.Secondary}
                      kind={ControlKind.Panel}
                      fullWidth
                      onClick={() => checkPermissions(panel)}
                    />
                  </CardFooter>
                </Card>
              ))}
              <Card>
                <CardHeader text="Cancel" />
                <CardContent>Changed your mind? No problem.</CardContent>
                <CardFooter>
                  <Button
                    text="Delete"
                    type={ButtonType.Danger}
                    kind={ControlKind.Panel}
                    fullWidth
                    onClick={props.onDeletePanel}
                  />
                </CardFooter>
              </Card>
            </PanelContent>
          )}
        </Panel>
      )}
    </Transition>
  );
}
