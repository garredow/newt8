import * as vsoNodeApi from 'azure-devops-node-api';
import { WorkItemExpand } from 'azure-devops-node-api/interfaces/WorkItemTrackingInterfaces';
import { addSeconds } from 'date-fns';
import { getItem, setItem, StorageKey } from '../../utilities/storage';

function authorize(): Promise<string> {
  const redirectUrl = chrome.identity.getRedirectURL('oauth');
  console.log('redirectUrl', redirectUrl);

  return new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      {
        interactive: true,
        url: `https://app.vssps.visualstudio.com/oauth2/authorize
            ?client_id=C11BBAE2-C243-48F8-848F-AB08ACB71580
            &response_type=Assertion
            &state=SomeState12345
            &scope=vso.analytics%20vso.code%20vso.dashboards%20vso.identity%20vso.notification%20vso.project%20vso.threads_full%20vso.work
            &redirect_uri=${redirectUrl}`,
      },
      (res = '') => {
        console.log('authorize res', res);
        const token = res.match(/code=(.*)&/)?.[1];
        if (token) {
          resolve(token);
        } else {
          reject('Authorize failed');
        }
      }
    );
  });
}

async function getTokens(accessToken: string) {
  const redirectUrl = chrome.identity.getRedirectURL('oauth');
  const secret = '';
  const body = `client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=${secret}&grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${accessToken}&redirect_uri=${redirectUrl}`;
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': body.length.toString(),
  });

  return await fetch('https://app.vssps.visualstudio.com/oauth2/token', {
    method: 'POST',
    headers,
    body,
  }).then((res) => res.json());
}

type Tokens = {
  access: string;
  refresh: string;
  expires: number;
};

// const authHandler = vsoNodeApi.getBearerHandler();
// let AzDO = new vsoNodeApi.WebApi(serverUrl, authHandler, undefined);

export class AzureDevOpsAPI {
  // private async getTokens(): Promise<Tokens> {
  //   const tokens = await getItem<Tokens>(StorageKey.AzureDevOps);
  //   if (!tokens || new Date().valueOf() > tokens.expires) {
  //   }
  // }

  async isLoggedIn() {
    const tokens = await getItem<Tokens>(StorageKey.AzureDevOps);
    return !!tokens;
  }

  async login() {
    const accessCode = await authorize();
    const res = await getTokens(accessCode);
    const tokens = {
      access: res.access_token,
      refresh: res.refresh_token,
      expires: addSeconds(
        new Date(),
        parseInt(res.expires_in, 10) - 300
      ).valueOf(),
    };
    console.log('logged in', res, tokens);
    setItem<Tokens>(StorageKey.AzureDevOps, tokens);

    const authHandler = vsoNodeApi.getBearerHandler(tokens.access);
    let AzDO = new vsoNodeApi.WebApi(
      'https://dev.azure.com/Garredow',
      authHandler,
      undefined
    );

    // const profileApi = await AzDO.getProfileApi();
    // const me = await profileApi.getProfile('me');
    // console.log('profile', me);

    // const api = await AzDO.getNotificationApi();
    // const notifs = await api.listNotificationReasons();
    // console.log('notifs', notifs);

    const api = await AzDO.getWorkItemTrackingApi();
    const apires = await api.getWorkItems(
      [1, 2],
      undefined,
      undefined,
      WorkItemExpand.All
    );
    console.log('items', apires);
    // apires[0].fields;

    return tokens;
  }

  async logout() {
    await setItem(StorageKey.AzureDevOps, null);
  }

  async getProjects() {}
}

export async function logIn() {
  const accessCode = await authorize();
  const tokens = await getTokens(accessCode);
  console.log('tokens', tokens);
}

// client_assertion_type=&client_assertion=&grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion={1}&redirect_uri={2}

// https://mmkiihpjlhniddmelfelebdkccpfjcpp.chromiumapp.org/oauth?code=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJhdWkiOiIzMDhiYzNkNi1kNzRiLTRkZmYtYWVkMS1jMTI2MzkyNTU2YzQiLCJuYW1laWQiOiJlZGZlNjkyNS1jZWVjLTQ1MGItYTQzNS0zMWJhZjcyYzY5NjMiLCJzY3AiOiJ2c28uYW5hbHl0aWNzIHZzby5jb2RlIHZzby5kYXNoYm9hcmRzIHZzby5pZGVudGl0eSB2c28ubm90aWZpY2F0aW9uIHZzby5wcm9qZWN0IHZzby50aHJlYWRzX2Z1bGwgdnNvLndvcmsgdnNvLmF1dGhvcml6YXRpb25fZ3JhbnQiLCJpc3MiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwiYXVkIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsIm5iZiI6MTY0MDQ2MTYzMiwiZXhwIjoxNjQwNDYyNTMyfQ.tcRxY88sjoDQDxJg-bYw7G8f7ePpvGTfwfeHw9npgoMdB5cQRucfo5dtKYWCTo6UMaVsXP3_Kv-VQa86186Q-Qwo1dTc3PeU2-BNBVqH0ParR_mRJO6xV57N-BVOeZNcS6800o9sI68OJpK3MoqGjlXRuxLHA0lsA9dyRPO5UIAMI1CyWdumZRKuabXeUyBtwuktqPrjyWr5x26RmlNkRAwJd16NMS_1pG5WPZMu0smzuc62S7uEZ5b2ZqjF_YOVV4xtBblfpF5YuCGB01ydY-4V6n62w8mRI9YxL4TmM9m_BTbVvI3m7YJkTQVGH72CZ58yUpm-_UHITu2vJ3gJgw&state=SomeState12345
// https://mmkiihpjlhniddmelfelebdkccpfjcpp.chromiumapp.org/oauth?code=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJhdWkiOiIzMDhiYzNkNi1kNzRiLTRkZmYtYWVkMS1jMTI2MzkyNTU2YzQiLCJuYW1laWQiOiJlZGZlNjkyNS1jZWVjLTQ1MGItYTQzNS0zMWJhZjcyYzY5NjMiLCJzY3AiOiJ2c28uYW5hbHl0aWNzIHZzby5jb2RlIHZzby5kYXNoYm9hcmRzIHZzby5pZGVudGl0eSB2c28ubm90aWZpY2F0aW9uIHZzby5wcm9qZWN0IHZzby50aHJlYWRzX2Z1bGwgdnNvLndvcmsgdnNvLmF1dGhvcml6YXRpb25fZ3JhbnQiLCJpc3MiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwiYXVkIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsIm5iZiI6MTY0MDQ2MTYzMiwiZXhwIjoxNjQwNDYyNTMyfQ.tcRxY88sjoDQDxJg-bYw7G8f7ePpvGTfwfeHw9npgoMdB5cQRucfo5dtKYWCTo6UMaVsXP3_Kv-VQa86186Q-Qwo1dTc3PeU2-BNBVqH0ParR_mRJO6xV57N-BVOeZNcS6800o9sI68OJpK3MoqGjlXRuxLHA0lsA9dyRPO5UIAMI1CyWdumZRKuabXeUyBtwuktqPrjyWr5x26RmlNkRAwJd16NMS_1pG5asdasdasdaszuc62S7uEZ5b2ZqjF_YOVV4xtBblfpF5YuCGB01ydY-4V6n62w8mRI9YxL4TmM9m_BTbVvI3m7YJkTQVGH72CZ58yUpm-_UHITu2vJ3gJgw&state=SomeState12345
