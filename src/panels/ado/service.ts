import * as vsoNodeApi from 'azure-devops-node-api';
import { User } from './models';

export class AzureDevOps {
  private ado;

  constructor(token: string) {
    const authHandler = vsoNodeApi.getPersonalAccessTokenHandler(token);
    this.ado = new vsoNodeApi.WebApi(
      'https://dev.azure.com/Garredow',
      authHandler,
      undefined
    );
  }

  async getCurrentUser(): Promise<User> {
    const connection = await this.ado.connect();

    const body = {
      lookupKeys: [
        {
          descriptor: connection.authenticatedUser?.subjectDescriptor,
        },
      ],
    };
    const user = await this.ado.rest.client
      .post(
        `https://vssps.dev.azure.com/garredow/_apis/graph/subjectlookup?api-version=6.0-preview.1`,
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
      descriptor: connection.authenticatedUser?.subjectDescriptor!,
      name: connection.authenticatedUser?.providerDisplayName!,
      email: user.mailAddress,
      avatarUrl: user._links.avatar.href,
    };
  }

  // async getWorkItems(): Promise<any> {
  //   const api = await this.ado.getWorkItemTrackingApi();
  //   const res = await api.getWorkItems(
  //     [1, 2],
  //     undefined,
  //     undefined,
  //     WorkItemExpand.All
  //   );
  //   console.log('work items', res);
  // }
}
