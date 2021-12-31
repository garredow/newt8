import React from 'react';
import { MdLocationPin, MdPeople, MdPerson } from 'react-icons/md';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { Card, CardContent } from '../../../ui-components/card';
import { Icon } from '../../../ui-components/icon';
import { GitHubPanelOptions } from '../GitHubPanel';
import { User } from '../models';
import styles from './UserCard.module.css';

type Props = ComponentBaseProps & {
  panelOptions: GitHubPanelOptions;
  user: User;
};

export function UserCard({ user, ...props }: Props) {
  return (
    <Card className={styles.root} title="User">
      <CardContent>
        <div className={styles.user}>
          {user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : null}
          <div>
            <div>{user.name ? `${user.name} (${user.login})` : user.login}</div>
            <div className={styles.stats}>
              <div>
                <Icon icon={<MdPeople title="Followers" />} />
                {user.followers} followers
              </div>
              <div>
                <Icon icon={<MdPerson title="Following" />} />
                {user.following} following
              </div>
              <div>
                <Icon icon={<MdLocationPin title="Location" />} />
                {user.location}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
