import React, { useState, useEffect } from 'react';
import { Card } from '../ui-components/card';
import { Panel, PanelContent } from '../ui-components/panel';
import { SiteRow } from '../ui-components/card/SiteRow';
import { formatDistance } from 'date-fns';
import { getRecentBookmarks, openUrl } from '../services/browser';
import { ComponentBase } from '../models/ComponentBase';
import { getPanelConfig, PanelOptions } from '../services/panels';
import { PanelType } from '../enums/panelType';
import { Bookmark } from '../models/Bookmark';
import { DraggablePanelProps } from '../models/DraggablePanelProps';

type NewBookmarksPanelOptions = PanelOptions;

type NewBookmarksPanelProps = ComponentBase &
  DraggablePanelProps & {
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
      <PanelContent columns={options.columns} display={options.display}>
        <Card display={options.display}>
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
              onClick={openUrl}
            />
          ))}
        </Card>
      </PanelContent>
    </Panel>
  );
}
