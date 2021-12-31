import React from 'react';
import { MdLocationPin, MdPeople, MdPerson } from 'react-icons/md';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { openUrl } from '../../../services/browser';
import { Card } from '../../../ui-components/card';
import { Icon } from '../../../ui-components/icon';
import { GitHubPanelOptions } from '../GitHubPanel';
import { Notification, User } from '../models';
import { NotificationRow } from './NotificationRow';
import styles from './NotificationsCard.module.css';

type Props = ComponentBaseProps & {
  panelOptions: GitHubPanelOptions;
  notifications: Notification[];
  user?: User;
};

export function NotificationsCard({ user, notifications }: Props) {
  return (
    <Card>
      {user ? (
        <div className={styles.user}>
          {user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : null}
          <div>
            <div>{user.name || user.login}</div>
            <div>
              <span>
                <Icon icon={<MdPeople title="Followers" />} />
                {user.followers}
              </span>
              <span>
                <Icon icon={<MdPerson title="Following" />} />
                {user.following}
              </span>
              <span>
                <Icon icon={<MdLocationPin title="Location" />} />
                {user.location}
              </span>
            </div>
          </div>
        </div>
      ) : null}
      {notifications.map((a) => (
        <NotificationRow
          key={a.id}
          notification={a}
          onClick={() => openUrl(a.url)}
        />
      ))}
    </Card>
  );
}
