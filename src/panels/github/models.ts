export type NotificationType = 'Issue' | 'PullRequest' | 'Commit';

export type Notification = {
  id: string;
  title: string;
  url: string;
  latestCommentUrl: string;
  type: NotificationType;
  reason: string;
  unread: boolean;
  updatedAt: number;
  repoName: string;
  repoFullName: string;
  repoDesc: string;
};

export type User = {
  name: string | null;
  login: string;
  avatarUrl: string;
  profileUrl: string;
  followers: number;
  following: number;
  location: string | null;
};

export enum EventType {
  CreatePullRequest = 'pr',
  Star = 'star',
  Fork = 'fork',
  CreateRepo = 'repo',
  OpenIssue = 'issue',
  Unknown = 'unknown',
}
export type Event = {
  id: string;
  type: EventType;
  title: string;
  userAvatalUrl: string;
  userName: string;
  repoName: string;
  action?: string;
  createdAt: number;
  entity?: {
    id: number;
    state: string;
    url: string;
    title: string;
    body?: string;
    comments: number;
    number: number;
  };
};

export type RawUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username?: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  plan?: {
    collaborators: number;
    name: string;
    space: number;
    private_repos: number;
  };
  suspended_at?: string | null;
  private_gists?: number;
  total_private_repos?: number;
  owned_private_repos?: number;
  disk_usage?: number;
  collaborators?: number;
};

export type RawNotification = {
  id: string;
  subject: {
    title: string;
    url: string;
    latest_comment_url: string;
    type: NotificationType;
  };
  repository: {
    name: string;
    full_name: string;
    description: string;
  };
  reason: string;
  unread: boolean;
  updated_at: string;
  last_read_at: string | null;
  url: string;
  subscription_url: string;
};

export type RawEventType =
  | 'IssuesEvent'
  | 'WatchEvent'
  | 'ForkEvent'
  | 'PullRequestEvent'
  | 'MemberEvent'
  | 'CreateEvent';

export type RawEvent = {
  id: string;
  type: RawEventType;
  actor: {
    id: number;
    login: string;
    display_login?: string;
    gravatar_id: string | null;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  // org?: components["schemas"]["actor"];
  payload: {
    action?: string;
    issue?: {
      id: number;
      node_id: string;
      /** URL for the issue */
      url: string;
      repository_url: string;
      labels_url: string;
      comments_url: string;
      events_url: string;
      html_url: string;
      /** Number uniquely identifying the issue within its repository */
      number: number;
      /** State of the issue; either 'open' or 'closed' */
      state: 'open' | 'closed';
      /** Title of the issue */
      title: string;
      /** Contents of the issue */
      body?: string | null;
      comments: number;
      closed_at: string | null;
      created_at: string;
      updated_at: string;
    };
    pull_request?: {
      id: number;
      html_url: string;
      number: number;
      state: string;
      title: string;
      body?: string | null;
      comments: number;
      closed_at: string | null;
      created_at: string;
      updated_at: string;
    };
    // comment?: components["schemas"]["issue-comment"];
    pages?: {
      page_name?: string;
      title?: string;
      summary?: string | null;
      action?: string;
      sha?: string;
      html_url?: string;
    }[];
  };
  public: boolean;
  created_at: string | null;
};
