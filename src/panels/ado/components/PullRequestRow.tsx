import React, { useContext } from 'react';
import { PanelContext } from '../../../contexts/PanelContext';
import { DisplayDensity } from '../../../enums/displayDensity';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { ifClass, joinClasses } from '../../../utilities/classes';
import { PullRequest } from '../models';
import { Avatar } from './Avatar';
import styles from './PullRequestRow.module.css';

type Props = ComponentBaseProps & {
  pullRequest: PullRequest;
  onClick: () => void;
};

export function PullRequestRow({ pullRequest, onClick, ...props }: Props) {
  const { settings } = useContext(PanelContext);

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
        ),
        props.className
      )}
      onClick={onClick}
    >
      <Avatar
        className={styles.createdAvatar}
        imageUrl={pullRequest.createdBy.avatarUrl}
        name={pullRequest.createdBy.name}
        size={32}
      />
      <div className={styles.container}>
        <div className={styles.title}>{pullRequest.title}</div>
        <span className={styles.repoName}>{pullRequest.repository.name}</span>
      </div>
      {pullRequest.reviewers.map((a) => (
        <Avatar
          key={a.id}
          className={styles.reviewer}
          imageUrl={a.avatarUrl}
          name={a.name}
          vote={a.vote}
          size={28}
        />
      ))}
    </div>
  );
}
