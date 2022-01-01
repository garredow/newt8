import React, { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { PanelSettings } from '../../contexts/PanelContext';
import { ControlType } from '../../enums/controlType';
import { PanelKind } from '../../enums/panelKind';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { getPanelConfig, getPanelConfigs } from '../../services/panels';
import {
  PermissionDetail,
  permissionNameMap,
  requestPermissions,
  verifyPermissionsForPanel,
} from '../../services/permissions';
import { animateSlideLeft } from '../../ui-components/animations';
import { Button } from '../../ui-components/button/Button';
import { Card, CardContent, CardFooter } from '../../ui-components/card';
import { Panel, PanelContent } from '../../ui-components/panel';
import styles from './NewPanel.module.css';

type NewPanelOptions = PanelSettings;

type NewPanelProps = ComponentBaseProps &
  PanelBaseProps<NewPanelOptions> & {
    onPanelKindChanged: (panelKind: PanelKind) => void;
  };

export function NewPanel(props: NewPanelProps) {
  const [showPermissions, setShowPermissions] = useState(false);
  const [permissions, setPermissions] = useState<PermissionDetail[]>([]);
  const [panelKind, setPanelKind] = useState<PanelKind | undefined>();
  const [permissionsError, setPermissionsError] = useState(false);
  const [animate, setAnimate] = useState(false);
  const nodeRef = useRef(null);

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
          panel={props.panel}
          onOptionsChanged={() => {}}
          onDeletePanel={props.onDeletePanel}
          ref={nodeRef}
          style={{
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
              />
              <Button
                text="Cancel"
                onClick={cancelRequest}
                type={ControlType.Secondary}
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
                <Card
                  key={panel}
                  cardId={`new_${panel}`}
                  canCustomize={false}
                  title={getPanelConfig(panel).name}
                >
                  <CardContent padding={true}>
                    {getPanelConfig(panel).description}
                  </CardContent>
                  <CardFooter>
                    <Button
                      key={panel}
                      text="Add Panel"
                      type={ControlType.Secondary}
                      fullWidth
                      onClick={() => checkPermissions(panel)}
                    />
                  </CardFooter>
                </Card>
              ))}
              <Card cardId="new_cancel" title="Cancel" canCustomize={false}>
                <CardContent padding={true}>
                  Changed your mind? No problem.
                </CardContent>
                <CardFooter>
                  <Button
                    text="Delete"
                    type={ControlType.Danger}
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
