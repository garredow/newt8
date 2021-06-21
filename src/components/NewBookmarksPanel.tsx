import React, { useState, useEffect } from 'react';
import { Card } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/card/SiteRow';
import { formatDistance } from 'date-fns';
import { getRecentBookmarks, openUrl } from '../services/chromeService';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig, PanelOptions } from '../services/panels';
import { PanelType } from '../enums/panelType';
import { Bookmark } from '../models/Bookmark';

type NewBookmarksPanelOptions = PanelOptions;

type NewBookmarksPanelProps = ComponentBase & {
  options: NewBookmarksPanelOptions;
  onOptionsChanged: (options: NewBookmarksPanelOptions) => void;
  onDeletePanel: () => void;
};

export function NewBookmarksPanel(props: NewBookmarksPanelProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const options: NewBookmarksPanelOptions = Object.assign(
    getPanelConfig(PanelType.NewBookmarks).defaultOptions,
    props.options
  );

  useEffect(() => {
    getRecentBookmarks().then((res) => {
      console.log('bookmarks', res);
      setBookmarks(res);
    });
  }, []);

  return (
    <Panel
      options={options}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
    >
      <PanelContent columns={options.columns}>
        <Card>
          {bookmarks.map((bookmark) => (
            <SiteRow
              key={bookmark.id}
              title={bookmark.title}
              iconUrl={`chrome://favicon/size/32@1x/${bookmark.url}`}
              url={bookmark.url}
              line3={formatDistance(
                new Date(bookmark.dateAdded as number),
                new Date(),
                {
                  addSuffix: true,
                  includeSeconds: true,
                }
              )}
              onClick={() => openUrl(bookmark.url as string)}
            />
          ))}
        </Card>
      </PanelContent>
    </Panel>
  );
}
