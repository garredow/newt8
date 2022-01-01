import { format, formatDistanceToNow } from 'date-fns';
import React from 'react';
import {
  GoGitPullRequest,
  GoInfo,
  GoIssueOpened,
  GoRepo,
  GoRepoForked,
} from 'react-icons/go';
import { MdStarBorder } from 'react-icons/md';
import { DisplayDensity } from '../../../enums/displayDensity';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { Card, CardContent } from '../../../ui-components/card';
import { Icon } from '../../../ui-components/icon';
import { ifClass, joinClasses } from '../../../utilities/classes';
import { GitHubPanelOptions } from '../GitHubPanel';
import { Event, EventType } from '../models';
import styles from './EventsCard.module.css';

type Props = ComponentBaseProps & {
  panelOptions: GitHubPanelOptions;
  events: Event[];
};

export function EventsCard({ events, ...props }: Props) {
  function renderIcon(event: Event) {
    let icon;
    switch (event.type) {
      case EventType.CreatePullRequest:
        icon = (
          <Icon icon={<GoGitPullRequest title="Pull request" />} size="20" />
        );
        break;
      case EventType.Star:
        icon = <Icon icon={<MdStarBorder title="Star" />} size="20" />;
        break;
      case EventType.Fork:
        icon = <Icon icon={<GoRepoForked title="Fork" />} size="20" />;
        break;
      case EventType.CreateRepo:
        icon = <Icon icon={<GoRepo title="Repository" />} size="20" />;
        break;
      case EventType.OpenIssue:
        icon = <Icon icon={<GoIssueOpened title="Issue" />} size="20" />;
        break;
      default:
        icon = <Icon icon={<GoInfo title="Info" />} size="20" />;
    }

    return icon;
  }
  return (
    <Card className={styles.root} cardId="events" defaultTitle="Events">
      <CardContent>
        {events.map((a) => (
          <div
            key={a.id}
            className={joinClasses(
              styles.row,
              ifClass(props.panelOptions.showSiteDividers, styles.divider),
              ifClass(
                props.panelOptions.displayDensity === DisplayDensity.Compact,
                styles.compact
              ),
              ifClass(
                props.panelOptions.displayDensity === DisplayDensity.Spacious,
                styles.spacious
              )
            )}
          >
            <div className={styles.image}>
              <img className={styles.avatar} src={a.userAvatalUrl} alt="" />
              {renderIcon(a)}
            </div>
            <div>
              <div className={styles.title}>{a.title}</div>
              {a.entity ? (
                <div className={styles.entityTitle}>{a.entity?.title}</div>
              ) : null}
              <div>
                <span
                  className={styles.date}
                  title={format(a.createdAt, 'PPPppp')}
                >
                  {formatDistanceToNow(a.createdAt, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
