import {
  Event,
  EventType,
  Notification,
  RawEvent,
  RawNotification,
  RawUser,
  User,
} from './models';

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

  static toEvent(raw: RawEvent): Event {
    const result: Event = {
      id: raw.id,
      type: EventType.Unknown,
      title: '',
      userAvatalUrl: raw.actor.avatar_url,
      userName: raw.actor.display_login || raw.actor.login,
      repoName: raw.repo.name,
      createdAt: new Date(raw.created_at as string).valueOf(),
      action: raw.payload.action,
    };

    if (raw.type === 'CreateEvent') {
      result.type = EventType.CreateRepo;
      result.title = `${result.userName} created ${result.repoName}`;
    } else if (raw.type === 'ForkEvent') {
      result.type = EventType.Fork;
      result.title = `${result.userName} forked ${result.repoName}`;
    } else if (raw.type === 'IssuesEvent') {
      result.type = EventType.OpenIssue;
      result.entity = {
        id: raw.payload.issue!.id,
        state: raw.payload.issue!.state,
        url: raw.payload.issue!.html_url,
        title: raw.payload.issue!.title,
        body: raw.payload.issue!.body || undefined,
        comments: raw.payload.issue!.comments,
        number: raw.payload.issue!.number,
      };
      result.title = `${result.userName} opened issue #${result.entity.number} in ${result.repoName}`;
    } else if (raw.type === 'PullRequestEvent') {
      result.type = EventType.CreatePullRequest;
      result.entity = {
        id: raw.payload.pull_request!.id,
        state: raw.payload.pull_request!.state,
        url: raw.payload.pull_request!.html_url,
        title: raw.payload.pull_request!.title,
        body: raw.payload.pull_request!.body || undefined,
        comments: raw.payload.pull_request!.comments,
        number: raw.payload.pull_request!.number,
      };
      result.title = `${result.userName} created pull request #${result.entity.number}`;
    } else if (raw.type === 'WatchEvent' && raw.payload.action === 'started') {
      result.type = EventType.Star;
      result.title = `${result.userName} starred #${result.repoName}`;
    } else {
      result.title = `${result.userName} performed an action`;
    }

    return result;
  }
}
