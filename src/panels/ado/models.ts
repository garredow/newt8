export type User = {
  id: string;
  subjectDescriptor: string;
  name: string;
  email?: string;
  avatarUrl: string;
};

export type Project = {
  id: string;
  name: string;
  lastUpdateTime: number;
};

export type Query = {
  projectId: string;
  folderId?: string;
  folderName?: string;
  folderPath?: string;
  id: string;
  name: string;
  path: string;
};

export type WorkItem = {
  id: number;
  type?: WorkItemType;
  state?: WorkItemState;
  icon?: WorkItemIcon;
  title: string;
  priority: number;
  effort?: number;
  assignedTo?: User;
  url: string;
  commentCount: number;
  comments: Comment[];
  createdDate: number;
  changedDate: number;
  children: WorkItem[];
};

export type WorkItemIcon = {
  id: string;
  url: string;
};

export type WorkItemState = {
  name: string;
  color: string;
  category: string;
};

export type WorkItemType = {
  name: string;
  description?: string;
  icon: {
    id: string;
    url: string;
  };
  states: WorkItemState[];
};

export type Comment = {
  id: number;
  text: string;
  url: string;
  createdBy: User;
  modifiedBy: User;
  createdDate: number;
  modifiedDate: number;
};
