import { Notification, RawNotification, RawUser, User } from './models';

export class Mapper {
  static toUser(raw: RawUser): User {
    return {
      name: raw.name,
      login: raw.login,
      avatarUrl: raw.avatar_url,
      profileUrl: raw.html_url,
      followers: raw.followers,
      following: raw.following,
      location: raw.location,
    };
  }

  static toNotification(raw: RawNotification): Notification {
    return {
      id: raw.id,
      title: raw.subject.title,
      url: raw.subject.url,
      latestCommentUrl: raw.subject.latest_comment_url,
      type: raw.subject.type,
      reason: raw.reason,
      unread: raw.unread,
      updatedAt: new Date(raw.updated_at).valueOf(),
      repoName: raw.repository.name,
      repoFullName: raw.repository.full_name,
      repoDesc: raw.repository.description,
    };
  }
}
