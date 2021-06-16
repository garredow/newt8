import React, { useState, useEffect } from 'react';
import { MdSettings } from 'react-icons/md';
import { Bookmark } from '../models/Bookmark';
import { getBookmarks, openUrl } from '../services/chromeService';
import { IconButton } from '../ui-components/button';
import { Card, CardHeader } from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import styles from './BookmarksPanel.module.css';

type BookmarksPanelOptions = {};

type BookmarksPanelProps = {
  options: BookmarksPanelOptions;
  onOptionsChanged: (options: BookmarksPanelOptions) => void;
};

export function BookmarksPanel(props: BookmarksPanelProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    getBookmarks().then((res) => setBookmarks(res));
  }, []);

  function openSite(url: string) {
    openUrl(url, false);
  }

  return (
    <div className={styles.root}>
      <Panel>
        <PanelHeader
          text="Bookmarks"
          actions={
            <>
              <IconButton onClick={() => setShowSettings(!showSettings)}>
                <MdSettings />
              </IconButton>
            </>
          }
        />
        {showSettings ? <PanelContent>Settings</PanelContent> : null}
        <PanelContent>
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
    </div>
  );
}
