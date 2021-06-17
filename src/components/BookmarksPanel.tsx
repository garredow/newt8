import React, { useState, useEffect } from 'react';
import { Bookmark } from '../models/Bookmark';
import { getBookmarks, openUrl } from '../services/chromeService';
import { Card, CardHeader } from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent, PanelOptions } from '../ui-components/panel';

type BookmarksPanelOptions = PanelOptions;

type BookmarksPanelProps = {
  options?: BookmarksPanelOptions;
  onOptionsChanged: (options: BookmarksPanelOptions) => void;
  onDeletePanel: () => void;
};

export function BookmarksPanel(props: BookmarksPanelProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const options: BookmarksPanelOptions = Object.assign(
    {
      columns: 0,
      width: 3,
      title: 'Bookmarks',
    },
    props.options
  );

  useEffect(() => {
    getBookmarks().then((res) => setBookmarks(res));
  }, []);

  function openSite(url: string) {
    openUrl(url, false);
  }

  return (
    <Panel
      options={options as any}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
    >
      <PanelContent columns={options.columns}>
        {bookmarks.map((group) => (
          <Card key={group.id}>
            <CardHeader text={group.title} />
            {group.children!.map((site) => (
              <SiteRow
                key={site.id}
                title={site.title}
                iconUrl={`chrome://favicon/size/32@1x/${site.url}`}
                onClick={() => openSite(site.url as string)}
              />
            ))}
          </Card>
        ))}
      </PanelContent>
    </Panel>
  );
}
