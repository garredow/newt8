import React from 'react';
import { GoCheck, GoDash, GoX } from 'react-icons/go';
import { MdCheck } from 'react-icons/md';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { Icon } from '../../../ui-components/icon';
import { joinClasses } from '../../../utilities/classes';
import { PullRequestVote } from '../models';
import styles from './Avatar.module.css';

type Props = ComponentBaseProps & {
  imageUrl: string;
  name: string;
  email?: string;
  vote?: PullRequestVote;
  size?: number;
};

export function Avatar({ size = 24, ...props }: Props) {
  const voteMap = {
    [PullRequestVote.Approved]: {
      title: 'Approved',
      style: styles.approved,
      icon: <GoCheck />,
    },
    [PullRequestVote.ApprovedWithSuggestions]: {
      title: 'Approved With Suggestions',
      style: styles.approvedWithSuggestions,
      icon: <GoCheck />,
    },
    [PullRequestVote.NoVote]: {
      title: 'No Response',
      style: styles.noResponse,
      icon: <GoDash />,
    },
    [PullRequestVote.WaitingForAuthor]: {
      title: 'Waiting For Author',
      style: styles.waiting,
      icon: <MdCheck />,
    },
    [PullRequestVote.Rejected]: {
      title: 'Rejected',
      style: styles.rejected,
      icon: <GoX />,
    },
  };

  return (
    <div
      className={joinClasses(styles.root, props.className)}
      style={{ height: `${size}px`, width: `${size}px` }}
      title={`${props.name}${props.email ? `(${props.email})` : ''}`}
    >
      <img src={props.imageUrl} alt="" />
      {props.vote !== undefined && (
        <div
          className={joinClasses(styles.badge, voteMap[props.vote].style)}
          style={{ height: `${size / 2}px`, width: `${size / 2}px` }}
          title={voteMap[props.vote].title}
        >
          <Icon
            icon={voteMap[props.vote].icon}
            color="#fff"
            size={`${size / 3}`}
          />
        </div>
      )}
    </div>
  );
}
