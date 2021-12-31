import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { PanelSettings } from '../../contexts/PanelContext';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { Panel, PanelContent } from '../../ui-components/panel';
import { EventsCard } from './components/EventsCard';
import { NotificationsCard } from './components/NotificationsCard';
import { UserCard } from './components/UserCard';
import { GitHub } from './service';

export type GitHubPanelOptions = PanelSettings & {
  accessToken: string;
  showUserCard: boolean;
  showNotificationsCard: boolean;
  showEventsCard: boolean;
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

  const { data: events = [] } = useQuery(
    'gh_events',
    () => {
      const gh = new GitHub(props.panel.options.accessToken);
      return gh.getEvents(user?.login as string);
    },
    { enabled: isLoggedIn && !!user }
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
            {
              type: 'checkbox',
              key: 'showNotificationsCard',
              label: 'Notifications Card',
              helpText: 'Show the notifications card.',
              testId: 'check-notifications-card',
            },
            {
              type: 'checkbox',
              key: 'showEventsCard',
              label: 'Events Card',
              helpText: 'Show the events card.',
              testId: 'check-events-card',
            },
          ],
        },
        {
          id: 'github',
          title: 'GitHub',
          items: [
            {
              type: 'input',
              key: 'accessToken',
              label: 'Access Token',
              helpText: 'Your GitHub personal access token.',
              testId: 'input-access-token',
            },
            {
              type: 'button',
              key: 'forceRefresh',
              label: 'Force Refresh',
              testId: 'btn-force-refresh',
              onClick: () => {
                queryClient.invalidateQueries('gh_user');
                queryClient.invalidateQueries('gh_notifs');
                queryClient.invalidateQueries('gh_events');
              },
            },
          ],
        },
      ]}
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
          <>
            {props.panel.options.showUserCard && user ? (
              <UserCard user={user} panelOptions={props.panel.options} />
            ) : null}
            {props.panel.options.showNotificationsCard && (
              <NotificationsCard
                notifications={notifs}
                panelOptions={props.panel.options}
              />
            )}
            {props.panel.options.showEventsCard && (
              <EventsCard events={events} panelOptions={props.panel.options} />
            )}
          </>
        ) : (
          <span>
            Please add a GitHub personal access token in panel settings.
          </span>
        )}
      </PanelContent>
    </Panel>
  );
}
