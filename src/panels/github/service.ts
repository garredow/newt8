import { Octokit } from 'octokit';
import { Mapper } from './mapper';
import { Notification, RawNotification, User } from './models';

export class GitHub {
  private octokit;

  constructor(token: string) {
    this.octokit = new Octokit({
      auth: token,
    });
  }
  async getCurrentUser(): Promise<User> {
    const res = await this.octokit.rest.users.getAuthenticated();
    // console.log('user', res);

    return Mapper.toUser(res.data);
  }

  async getNotifications(): Promise<Notification[]> {
    const res =
      await this.octokit.rest.activity.listNotificationsForAuthenticatedUser({
        all: true,
      });
    // console.log('notifications', res);

    return res.data.map((a) => Mapper.toNotification(a as RawNotification));
  }

  async getActivity(username: string) {
    const res = await this.octokit.rest.activity.listEventsForAuthenticatedUser(
      {
        username,
      }
    );
    // console.log('events', res);

    return res; // TODO: Use mapper
  }

  // static async getFeed() {
  //   const user = await octokit.rest.users.getAuthenticated();
  //   console.log('user', user);

  //   const feeds = await octokit.rest.activity.getFeeds();
  //   console.log('feeds', feeds);

  //   if (!feeds.data.current_user_url) return;

  //   // const xmlString = await fetch(feeds.data.current_user_url).then((res) => {
  //   //   console.log('res', res);
  //   //   return res.text();
  //   // });
  //   const xmlString = await Browser.fetchUrl(feeds.data.current_user_url);
  //   console.log('xml string', xmlString);

  //   const xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml');
  //   console.log('doc', xmlDoc);
  // }
}
