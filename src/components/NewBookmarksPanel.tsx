import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/list/SiteRow';
import { formatDistance } from 'date-fns';
import { getRecentBookmarks, openUrl } from '../services/browser';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig } from '../services/panels';
import { PanelKind } from '../enums/panelKind';
import { Bookmark } from '../models/Bookmark';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import { PanelSettings } from '../ui-components/panel/PanelContext';

type NewBookmarksPanelOptions = PanelSettings;

type NewBookmarksPanelProps = ComponentBase &
  DraggablePanelProps & {
    options: NewBookmarksPanelOptions;
    onOptionsChanged: (options: NewBookmarksPanelOptions) => void;
    onDeletePanel: () => void;
  };

export function NewBookmarksPanel(props: NewBookmarksPanelProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const options: NewBookmarksPanelOptions = useMemo(
    () =>
      Object.assign(
        getPanelConfig(PanelKind.NewBookmarks).defaultOptions,
        props.options
      ),
    [props.options]
  );

  useEffect(() => {
    getRecentBookmarks().then((res) => {
      setBookmarks(res);
    });
  }, []);

  return (
    <Panel
      panelId={props.panelId}
      panelIndex={props.panelIndex}
      options={options}
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
