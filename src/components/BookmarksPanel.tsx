import React, { useState, useEffect } from 'react';
import { Bookmark } from '../models/Bookmark';
import { getBookmarks, openUrl } from '../services/chromeService';
import { Card, CardHeader } from '../ui-components/card';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import './BookmarksPanel.css';

type BookmarkRowProps = {
  bookmark: chrome.bookmarks.BookmarkTreeNode;
  onClick: Function;
};
function BookmarkRow({ bookmark, onClick }: BookmarkRowProps) {
  return (
    <div
      className="BookmarkRow"
      key={bookmark.id}
      onClick={() => onClick(bookmark.url!)}
    >
      <div>
        <img
          className="BookmarkRow__icon"
          src={`chrome://favicon/size/32@1x/${bookmark.url}`}
          alt=""
        />
      </div>
      <div className="BookmarkRow__title">{bookmark.title}</div>
    </div>
  );
}

type BookmarksPanelProps = {};

export function BookmarksPanel(props: BookmarksPanelProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    getBookmarks().then((res) => setBookmarks(res));
  }, []);

  function openSite(url: string) {
    openUrl(url, false);
  }

  return (
    <Panel className="BookmarksPanel">
      <PanelHeader text="Bookmarks" />
      <PanelContent>
        {bookmarks.map((group) => (
          <Card key={group.id}>
            <CardHeader text={group.title} />
            <div>
              {group.children!.map((site) => (
                <BookmarkRow
                  key={site.id}
                  bookmark={site}
                  onClick={(url: string) => openSite(url)}
                />
              ))}
            </div>
          </Card>
        ))}
      </PanelContent>
    </Panel>
  );
}
