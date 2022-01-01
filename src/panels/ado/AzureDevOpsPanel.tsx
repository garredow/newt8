import React from 'react';
import { useQuery } from 'react-query';
import { PanelSettings } from '../../contexts/PanelContext';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { Panel, PanelContent } from '../../ui-components/panel';
import { UserCard } from './components/UserCard';
import { AzureDevOps } from './service';

type AzureDevOpsPanelOptions = PanelSettings & {
  accessToken: string;
  showUserCard: boolean;
};

type AzureDevOpsPanelProps = ComponentBaseProps &
  PanelBaseProps<AzureDevOpsPanelOptions>;

export function AzureDevOpsPanel(props: AzureDevOpsPanelProps) {
  const isLoggedIn = !!props.panel.options.accessToken;

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery(
    'ado_user',
    () => {
      const ado = new AzureDevOps(props.panel.options.accessToken);
      return ado.getCurrentUser();
    },
    { enabled: isLoggedIn }
  );

  return (
    <Panel
      panel={props.panel}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
      settings={[
        {
          id: 'cards',
          title: 'Cards',
          items: [
            {
              type: 'checkbox',
              key: 'showUserCard',
              label: 'User Card',
              helpText: 'Show the user card.',
              testId: 'check-user-card',
            },
          ],
        },
        {
          id: 'ado',
          title: 'Azure DevOps',
          items: [
            {
              type: 'input',
              key: 'accessToken',
              label: 'Access Token',
              helpText: 'Your Azure DevOps personal access token.',
              testId: 'input-access-token',
            },
          ],
        },
      ]}
    >
      <PanelContent>
        {isLoading && <span>Fetching data....</span>}
        {isError && (
          <span>
            There was an issue fetching your Azure DevOps data. Please check
            your personal access token.
          </span>
        )}
        {isLoggedIn ? (
          <>
            {props.panel.options.showUserCard && user ? (
              <UserCard user={user} />
            ) : null}
          </>
        ) : (
          <span>
            Please add an Azure DevOps personal access token in panel settings.
          </span>
        )}
      </PanelContent>
    </Panel>
  );
}
