import * as vsoNodeApi from 'azure-devops-node-api';
import {
  CommentExpandOptions,
  QueryExpand,
  QueryHierarchyItem,
  WorkItem as AdoWorkItem,
  WorkItemExpand,
} from 'azure-devops-node-api/interfaces/WorkItemTrackingInterfaces';
import { Mapper } from './mapper';
import {
  Comment,
  Project,
  Query,
  User,
  WorkItem,
  WorkItemType,
} from './models';

export class AzureDevOps {
  private ado;
  private projectId: string | undefined;

  constructor(token: string) {
    const authHandler = vsoNodeApi.getPersonalAccessTokenHandler(token);
    this.ado = new vsoNodeApi.WebApi(
      'https://dev.azure.com/Garredow',
      authHandler,
      undefined
    );
  }

  setProject(projectId: string) {
    this.projectId = projectId;
  }

  async getCurrentUser(): Promise<User> {
    const connection = await this.ado.connect();
    // console.log('connection', connection);

    const body = {
      lookupKeys: [
        {
          descriptor: connection.authenticatedUser?.subjectDescriptor,
        },
      ],
    };

    const user = await this.ado.rest.client
      .post(
        `https://vssps.dev.azure.com/${this.getOrgName()}/_apis/graph/subjectlookup?api-version=6.0-preview.1`,
        JSON.stringify(body),
        { 'Content-Type': 'application/json' }
      )
      .then((res) => res.readBody())
      .then(
        (res) =>
          JSON.parse(res).value[
            connection.authenticatedUser?.subjectDescriptor!
          ]
      );

    return {
      id: connection.authenticatedUser?.id!,
      subjectDescriptor: connection.authenticatedUser?.subjectDescriptor!,
      name: connection.authenticatedUser?.providerDisplayName!,
      email: user.mailAddress,
      avatarUrl: user._links.avatar.href,
    };
  }

  async getProjects(): Promise<Project[]> {
    const api = await this.ado.getCoreApi();
    const res = await api.getProjects();
    // console.log('projects', res);

    return res.map((a) => Mapper.toProject(a));
  }

  async getQueries(projectId: string): Promise<Query[]> {
    const api = await this.ado.getWorkItemTrackingApi();
    const res = await api.getQueries(projectId, QueryExpand.All, 2);

    const queries = res
      .map((a) => this.processQueryChild(projectId, a))
      .flat(3)
      .filter(Boolean);
    // console.log('queries', queries);

    return queries;
  }

  async getWorkItemsByQuery(
    projectId: string,
    queryId: string
  ): Promise<WorkItem[]> {
    const api = await this.ado.getWorkItemTrackingApi();
    const res = await api.queryById(queryId);
    // console.log('res', res);

    const ids = res.workItems?.map((a) => a.id as number) ?? [];
    const items = await this.getWorkItemsByIds(projectId, ids, true);

    return items;
  }

  async getWorkItemsByIds(
    projectId: string,
    ids: number[],
    includeChildren = false
  ): Promise<WorkItem[]> {
    const api = await this.ado.getWorkItemTrackingApi();
    const apiRes = await api.getWorkItems(
      ids,
      undefined,
      undefined,
      WorkItemExpand.All
    );
    // console.log('raw work items', apiRes);

    const workItemTypes = await this.getWorkItemTypes();

    const result: WorkItem[] = [];
    for (const item of apiRes) {
      const mappedItem = Mapper.toWorkItem(item, workItemTypes);
      if (item.fields?.['System.CommentCount'] > 0) {
        mappedItem.comments = await this.getWorkItemComments(
          projectId,
          item.id!
        );
      }
      if (includeChildren) {
        for (const url of (item.relations || [])
          .filter((a) => a.attributes?.name === 'Child')
          .map((a) => a.url)
          .filter(Boolean)) {
          const res = await this.followLink<AdoWorkItem>(url!);
          const childItem = Mapper.toWorkItem(res, workItemTypes);
          if (childItem.commentCount > 0) {
            childItem.comments = await this.getWorkItemComments(
              projectId,
              childItem.id!
            );
          }
          mappedItem.children.push(Mapper.toWorkItem(res, workItemTypes));
        }
      }
      result.push(mappedItem);
    }
    // console.log('work items', result);
    return result;
  }

  async getWorkItemTypes(
    projectId: string = 'a194fab5-0a4a-4049-9d2c-a8a3eb6f52c2'
  ): Promise<WorkItemType[]> {
    const api = await this.ado.getWorkItemTrackingApi();
    const res = await api.getWorkItemTypes(projectId);
    // console.log('types', res);

    return res.map((a) => Mapper.toWorkItemType(a));
  }

  async getWorkItemComments(
    projectId: string,
    workItemId: number
  ): Promise<Comment[]> {
    const api = await this.ado.getWorkItemTrackingApi();
    const res = await api.getComments(
      projectId,
      workItemId,
      undefined,
      undefined,
      undefined,
      CommentExpandOptions.All
    );
    // console.log('raw comments', res);

    return res.comments?.map((a) => Mapper.toComment(a)) ?? [];
  }

  async getWorkActivity(): Promise<any> {
    const api = await this.ado.getWorkItemTrackingApi();
    const res = await api.getAccountMyWorkData();
    // console.log('activity', res);

    // return res.map((a) => Mapper.toWorkItemType(a));
  }

  private async followLink<T>(url: string): Promise<T> {
    const res = await this.ado.rest.client
      .get(url, {
        'Content-Type': 'application/json',
      })
      .then((res) => res.readBody())
      .then((res) => JSON.parse(res));
    // console.log('followLink res', res);

    return res as unknown as T;
  }

  private processQueryChild(
    projectId: string,
    item: QueryHierarchyItem,
    parent?: QueryHierarchyItem
  ): any {
    if (item.hasChildren)
      return item.children?.map((a) =>
        this.processQueryChild(projectId, a, item)
      );
    if (!item.isFolder) return Mapper.toQuery(projectId, item, parent);
  }

  private getOrgName(): string | undefined {
    return this.ado.serverUrl.match(/\/([A-Za-z0-9]*)$/)?.[1];
  }
}
