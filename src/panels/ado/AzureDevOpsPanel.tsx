import React, { useEffect, useMemo, useState } from 'react';
import { PanelSettings } from '../../contexts/PanelContext';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { Panel, PanelContent } from '../../ui-components/panel';
import { AzureDevOpsAPI } from './service';

type AzureDevOpsPanelOptions = PanelSettings & {
  accessToken: string;
  refreshToken: string;
};

type AzureDevOpsPanelProps = ComponentBaseProps &
  PanelBaseProps<AzureDevOpsPanelOptions>;

export function AzureDevOpsPanel(props: AzureDevOpsPanelProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const ado = useMemo(() => new AzureDevOpsAPI(), []);
  console.log('loggedIn', loggedIn);

  useEffect(() => {
    console.log('panel load');
    ado.isLoggedIn().then(setLoggedIn);
  }, []);
  async function test() {
    console.log('start test');

    const client = new AzureDevOpsAPI();
    const tokens = await client.login();
    console.log('result', tokens);
  }

  return (
    <Panel
      panel={props.panel}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
    >
      <PanelContent>
        {/* <Button text="Test OAuth" onClick={test} /> */}
        Azure DevOps
      </PanelContent>
    </Panel>
  );
}
