import React from 'react';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { openUrl } from '../../../services/browser';
import { Card, CardContent } from '../../../ui-components/card';
import { GitHubPanelOptions } from '../GitHubPanel';
import { Notification } from '../models';
import { NotificationRow } from './NotificationRow';
import styles from './NotificationsCard.module.css';

type Props = ComponentBaseProps & {
  panelOptions: GitHubPanelOptions;
  notifications: Notification[];
};

export function NotificationsCard({ notifications, ...props }: Props) {
  return (
    <Card className={styles.root} title="Notifications">
      <CardContent>
        {notifications.map((a) => (
          <NotificationRow
            key={a.id}
            notification={a}
            onClick={() => openUrl(a.url)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
