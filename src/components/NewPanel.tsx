import React, { useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { Panel, PanelContent } from '../ui-components/panel';
import styles from './NewPanel.module.css';
import { PanelKind } from '../enums/panelKind';
import { ControlType } from '../enums/controlType';
import { ControlLocation } from '../enums/controlLocation';
import { Button } from '../ui-components/button/Button';
import {
  PermissionDetail,
  permissionNameMap,
  requestPermissions,
  verifyPermissionsForPanel,
} from '../services/permissions';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig, getPanelConfigs } from '../services/panels';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import { useEffect } from 'react';
import { animateSlideLeft } from '../ui-components/animations';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../ui-components/card';
import { PanelSettings } from '../ui-components/panel/PanelContext';

type NewPanelOptions = PanelSettings;

type NewPanelProps = ComponentBase &
  DraggablePanelProps & {
    options?: NewPanelOptions;
    onPanelKindChanged: (panelKind: PanelKind) => void;
    onDeletePanel: () => void;
  };

export function NewPanel(props: NewPanelProps) {
  const [showPermissions, setShowPermissions] = useState(false);
  const [permissions, setPermissions] = useState<PermissionDetail[]>([]);
  const [panelKind, setPanelKind] = useState<PanelKind | undefined>();
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

  async function checkPermissions(panelKind: PanelKind) {
    const missingPermissions = await verifyPermissionsForPanel(panelKind);

    if (missingPermissions.length > 0) {
      setPanelKind(panelKind);
      setPermissions(missingPermissions);
      setShowPermissions(true);
      return;
    }

    props.onPanelKindChanged(panelKind);
  }

  async function request() {
    const success = await requestPermissions(permissions.map((a) => a.key));

    if (!success) {
      setPermissionsError(true);
      return;
    }

    props.onPanelKindChanged(panelKind!);
  }

  function cancelRequest() {
    setShowPermissions(false);
    setPermissions([]);
    setPanelKind(undefined);
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
                type={ControlType.Primary}
                location={ControlLocation.Panel}
              />
              <Button
                text="Cancel"
                onClick={cancelRequest}
                type={ControlType.Secondary}
                location={ControlLocation.Panel}
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
                      type={ControlType.Secondary}
                      location={ControlLocation.Panel}
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
                    type={ControlType.Danger}
                    location={ControlLocation.Panel}
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
