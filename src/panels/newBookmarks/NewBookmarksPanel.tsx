import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { PanelSettings } from '../../contexts/PanelContext';
import { Bookmark } from '../../models/Bookmark';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { getRecentBookmarks, openUrl } from '../../services/browser';
import { Card } from '../../ui-components/card';
import { SiteRow } from '../../ui-components/list/SiteRow';
import { Panel, PanelContent } from '../../ui-components/panel';

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
