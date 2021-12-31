import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { PanelSettings } from '../../contexts/PanelContext';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { Button } from '../../ui-components/button';
import { Input } from '../../ui-components/input';
import { SettingsRow } from '../../ui-components/list';
import { Panel, PanelContent } from '../../ui-components/panel';
import { NotificationsCard } from './components/NotificationsCard';
import { GitHub } from './service';

export type GitHubPanelOptions = PanelSettings & {
  accessToken: string;
};

type GitHubPanelProps = ComponentBaseProps & PanelBaseProps<GitHubPanelOptions>;

export function GitHubPanel(props: GitHubPanelProps) {
  const isLoggedIn = !!props.panel.options.accessToken;

  const queryClient = useQueryClient();

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery(
    'gh_user',
    () => {
      const gh = new GitHub(props.panel.options.accessToken);
      return gh.getCurrentUser();
    },
    { enabled: isLoggedIn }
  );

  const { data: notifs = [] } = useQuery(
    'gh_notifs',
    () => {
      const gh = new GitHub(props.panel.options.accessToken);
      return gh.getNotifications();
    },
    { enabled: isLoggedIn }
  );

  // const { data: activity = [] } = useQuery(
  //   'gh_activity',
  //   () => {
  //     const gh = new GitHub(props.panel.options.accessToken);
  //     return gh.getActivity(user?.login as string);
  //   },
  //   { enabled: isLoggedIn && !!user }
  // );

  function setOptionValue(key: string, val: any) {
    const newOpts: GitHubPanelOptions = {
      ...props.panel.options,
      [key]: val,
    };
    props.onOptionsChanged(newOpts);
  }

  return (
    <Panel
      panel={props.panel}
      enableAccentText={false}
      enableSecondaryText={false}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
      extraSettings={
        <>
          <SettingsRow
            label="Token"
            helpText="Your GitHub personal access token."
          >
            <Input
              type="text"
              spellCheck="false"
              value={props.panel.options.accessToken}
              secret={true}
              onChange={(val) => setOptionValue('accessToken', val)}
              data-testid="input-access-token"
            />
          </SettingsRow>
        </>
      }
      extraButtons={
        <>
          <Button
            text="Force Refresh"
            fullWidth
            onClick={() => {
              queryClient.invalidateQueries('gh_user');
              queryClient.invalidateQueries('gh_notifs');
            }}
          />
        </>
      }
    >
      <PanelContent>
        {isLoading && <span>Fetching data....</span>}
        {isError && (
          <span>
            There was an issue fetching your GitHub data. Please check your
            personal access token.
          </span>
        )}
        {isLoggedIn ? (
          <NotificationsCard
            user={user}
            notifications={notifs}
            panelOptions={props.panel.options}
          />
        ) : (
          <span>
            Please add a GitHub personal access token in panel settings.
          </span>
        )}
      </PanelContent>
    </Panel>
  );
}
