// import { PullRequest as AdoPullRequest } from 'azure-devops-node-api/interfaces/BuildInterfaces';
import { TeamProjectReference } from 'azure-devops-node-api/interfaces/CoreInterfaces';
import { GitPullRequest } from 'azure-devops-node-api/interfaces/GitInterfaces';
import {
  Comment as AdoComment,
  QueryHierarchyItem,
  WorkItem as AdoWorkItem,
  WorkItemType as AdoWorkItemType,
} from 'azure-devops-node-api/interfaces/WorkItemTrackingInterfaces';
import {
  Comment,
  Project,
  PullRequest,
  Query,
  WorkItem,
  WorkItemType,
} from './models';

export class Mapper {
  static toProject(raw: TeamProjectReference): Project {
    return {
      id: raw.id!,
      name: raw.name!,
      lastUpdateTime: raw.lastUpdateTime!.valueOf(),
    };
  }
  static toQuery(
    projectId: string,
    query: QueryHierarchyItem,
    folder?: QueryHierarchyItem
  ): Query {
    return {
      projectId,
      folderId: folder?.id,
      folderName: folder?.name,
      folderPath: folder?.path,
      id: query.id!,
      name: query.name!,
      path: query.path!,
    };
  }
  static toWorkItem(raw: AdoWorkItem, types?: WorkItemType[]): WorkItem {
    const result: WorkItem = {
      id: raw.id!,
      title: raw.fields!['System.Title'],
      priority: raw.fields!['Microsoft.VSTS.Common.Priority'],
      effort: raw.fields!['Microsoft.VSTS.Scheduling.Effort'],
      url: raw._links.html.href,
      commentCount: raw.fields!['System.CommentCount'],
      comments: [],
      createdDate: new Date(raw.fields!['System.CreatedDate']).valueOf(),
      changedDate: new Date(raw.fields!['System.ChangedDate']).valueOf(),
      children: [],
    };

    const type = types?.find(
      (a) => a.name === raw.fields!['System.WorkItemType']
    );
    if (type) {
      result.type = type;
      result.icon = type.icon;
      result.state = type.states.find(
        (a) => a.name === raw.fields!['System.State']
      );
    }

    const user = raw.fields?.['System.AssignedTo'];
    if (user) {
      result.assignedTo = {
        id: user.id,
        name: user.displayName || user.uniqueName,
        subjectDescriptor: user.descriptor,
        avatarUrl: user.imageUrl,
      };
    }

    return result;
  }
  static toWorkItemType(raw: AdoWorkItemType): WorkItemType {
    return {
      name: raw.name!,
      description: raw.description,
      icon: {
        id: raw.icon!.id!,
        url: raw.icon!.url!,
      },
      states:
        raw.states?.map((a) => ({
          name: a.name!,
          color: a.color!,
          category: a.category!,
        })) ?? [],
    };
  }
  static toComment(raw: AdoComment): Comment {
    return {
      id: raw.id!,
      text: raw.text!,
      url: raw.url!,
      createdBy: {
        id: raw.createdBy!.id!,
        name: raw.createdBy!.displayName || raw.createdBy!.uniqueName!,
        subjectDescriptor: raw.createdBy!.descriptor!,
        avatarUrl: raw.createdBy!.imageUrl!,
      },
      modifiedBy: {
        id: raw.modifiedBy!.id!,
        name: raw.modifiedBy!.displayName || raw.modifiedBy!.uniqueName!,
        subjectDescriptor: raw.modifiedBy!.descriptor!,
        avatarUrl: raw.modifiedBy!.imageUrl!,
      },
      createdDate: raw.createdDate?.valueOf()!,
      modifiedDate: raw.modifiedDate?.valueOf()!,
    };
  }
  static toPullRequest(raw: GitPullRequest): PullRequest {
    return {
      id: (raw as any).pullRequestId!,
      title: raw.title!,
      description: raw.description,
      createdBy: {
        id: raw.createdBy!.id!,
        name: raw.createdBy!.displayName || raw.createdBy!.uniqueName!,
        subjectDescriptor: raw.createdBy!.descriptor!,
        avatarUrl: raw.createdBy!.imageUrl!,
      },
      createdDate: raw.creationDate!.valueOf(),
      repository: {
        id: raw.repository!.id!,
        name: raw.repository!.name!,
      },
      reviewers:
        raw.reviewers?.map((a) => ({
          id: a.id!,
          name: a.displayName!,
          avatarUrl: a.imageUrl!,
          vote: a.vote!,
        })) || [],
      status: raw.status!,
    };
  }
}
