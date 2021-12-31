import { format, formatDistanceToNow } from 'date-fns';
import React, { useContext } from 'react';
import { DiGitCommit, DiGitPullRequest } from 'react-icons/di';
import { MdModeStandby } from 'react-icons/md';
import { PanelContext } from '../../../contexts/PanelContext';
import { DisplayDensity } from '../../../enums/displayDensity';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { Icon } from '../../../ui-components/icon';
import { ifClass, joinClasses } from '../../../utilities/classes';
import { Notification, NotificationType } from '../models';
import styles from './NotificationRow.module.css';

type Props = ComponentBaseProps & {
  notification: Notification;
  onClick: () => void;
};

export function NotificationRow({ notification, onClick }: Props) {
  const { settings } = useContext(PanelContext);

  function renderIcon(type: NotificationType) {
    switch (type) {
      case 'Commit':
        return (
          <Icon
            className={styles.icon}
            icon={<DiGitCommit title={type} />}
            size="24"
          />
        );
      case 'Issue':
        return (
          <Icon
            className={styles.icon}
            icon={<MdModeStandby title={type} />}
            size="24"
          />
        );
      case 'PullRequest':
        return (
          <Icon
            className={styles.icon}
            icon={<DiGitPullRequest title={type} />}
            size="24"
          />
        );
    }
  }
  return (
    <div
      className={joinClasses(
        styles.root,
        ifClass(settings.showSiteDividers, styles.divider),
        ifClass(
          settings.displayDensity === DisplayDensity.Compact,
          styles.compact
        ),
        ifClass(
          settings.displayDensity === DisplayDensity.Spacious,
          styles.spacious
        )
      )}
      onClick={onClick}
    >
      {renderIcon(notification.type)}
      <div className={styles.textContainer}>
        <div className={styles.title}>{notification.title}</div>
        <div className={styles.line2}>
          <span className={styles.repoName}>{notification.repoFullName}</span>
          <span
            className={styles.date}
            title={format(notification.updatedAt, 'PPPppp')}
          >
            {formatDistanceToNow(notification.updatedAt, { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
}
