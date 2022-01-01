import React from 'react';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { Card, CardContent } from '../../../ui-components/card';
import { User } from '../models';
import styles from './UserCard.module.css';

type Props = ComponentBaseProps & {
  user: User;
};

export function UserCard({ user, ...props }: Props) {
  return (
    <Card cardId="user" className={styles.root} defaultTitle="User">
      <CardContent>
        <div className={styles.user}>
          {user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : null}
          <div>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
