import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { PanelSettings } from '../../contexts/PanelContext';
import { Bookmark } from '../../models/Bookmark';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { getRecentBookmarks, openUrl } from '../../services/browser';
import { Card, CardContent } from '../../ui-components/card';
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
      settings={[
        {
          id: 'sites',
          title: 'Sites',
          items: [
            {
              type: 'checkbox',
              key: 'showSecondaryText',
              label: 'Show Url',
              helpText: 'Display the URL for each tab.',
              testId: 'check-show-url',
            },
            {
              type: 'checkbox',
              key: 'showAccentText',
              label: 'Show Date',
              helpText: 'Display when the bookmark was added.',
              testId: 'check-show-accessed',
            },
          ],
        },
      ]}
    >
      <PanelContent>
        <Card cardId="sites" defaultTitle="Bookmarks">
          <CardContent>
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
          </CardContent>
        </Card>
      </PanelContent>
    </Panel>
  );
}
