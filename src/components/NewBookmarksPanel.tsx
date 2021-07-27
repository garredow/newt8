import React, { useState, useEffect } from 'react';
import { Card } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/list/SiteRow';
import { formatDistance } from 'date-fns';
import { getRecentBookmarks, openUrl } from '../services/browser';
import { ComponentBaseProps } from '../models/ComponentBaseProps';
import { Bookmark } from '../models/Bookmark';
import { PanelSettings } from '../contexts/PanelContext';
import { PanelBaseProps } from '../models/PanelBaseProps';

type NewBookmarksPanelOptions = PanelSettings;

type NewBookmarksPanelProps = ComponentBaseProps &
  PanelBaseProps<NewBookmarksPanelOptions>;

export function NewBookmarksPanel(props: NewBookmarksPanelProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    getRecentBookmarks().then((res) => {
      setBookmarks(res);
    });
  }, []);

  return (
    <Panel
      panel={props.panel}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
    >
      <PanelContent>
        <Card>
          {bookmarks.map((bookmark) => (
            <SiteRow
              key={bookmark.id}
              primaryText={bookmark.title}
              url={bookmark.url}
              secondaryText={bookmark.url}
              accentText={formatDistance(
                new Date(bookmark.dateAdded as number),
                new Date(),
                {
                  addSuffix: true,
                  includeSeconds: true,
                }
              )}
              onClick={openUrl}
            />
          ))}
        </Card>
      </PanelContent>
    </Panel>
  );
}
