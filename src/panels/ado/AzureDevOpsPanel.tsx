import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { PanelSettings } from '../../contexts/PanelContext';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { Panel, PanelContent } from '../../ui-components/panel';
import { QueryCard } from './components/QueryCard';
import { UserCard } from './components/UserCard';
import { AzureDevOps } from './service';

export type AzureDevOpsPanelSettings = PanelSettings & {
  accessToken: string;
  showUserCard: boolean;
};

type AzureDevOpsPanelProps = ComponentBaseProps &
  PanelBaseProps<AzureDevOpsPanelSettings>;

export function AzureDevOpsPanel(props: AzureDevOpsPanelProps) {
  const isLoggedIn = !!props.panel.options.accessToken;
  const queryClient = useQueryClient();

  const user = useQuery(
    ['adoPanel', 'users'],
    async () => {
      const ado = new AzureDevOps(props.panel.options.accessToken);
      await ado.getWorkActivity();
      return ado.getCurrentUser();
    },
    { enabled: isLoggedIn }
  );

  const projects = useQuery(
    ['adoPanel', 'projects'],
    () => {
      const ado = new AzureDevOps(props.panel.options.accessToken);
      return ado.getProjects();
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
            {
              type: 'button',
              key: 'forceRefresh',
              label: 'Force Refresh',
              testId: 'btn-force-refresh',
              onClick: () => {
                queryClient.invalidateQueries('adoPanel');
              },
            },
          ],
        },
      ]}
    >
      <PanelContent>
        {user.isLoading && <span>Fetching data....</span>}
        {user.isError && (
          <span>
            There was an issue fetching your Azure DevOps data. Please check
            your personal access token.
          </span>
        )}
        {isLoggedIn ? (
          <>
            {props.panel.options.showUserCard && user.data ? (
              <UserCard user={user.data} />
            ) : null}
            <QueryCard projects={projects.data} />
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
