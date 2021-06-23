import React, { useState, useEffect } from 'react';
import { ButtonKind } from '../enums/buttonKind';
import { PanelType } from '../enums/panelType';
import { Status } from '../enums/status';
import { Bookmark } from '../models/Bookmark';
import { ComponentBase } from '../models/ComponentBase';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import {
  getAllBookmarks,
  getBookmarks,
  openUrl,
} from '../services/chromeService';
import { getPanelConfig, PanelOptions } from '../services/panels';
import { Button } from '../ui-components/button/Button';
import { Card, CardHeader } from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent } from '../ui-components/panel';
import styles from './BookmarksPanel.module.css';

type BookmarkFolderItemProps = {
  node: Bookmark;
  onChooseFolder: (nodeId: string) => void;
};
function BookmarkFolderItem({ node, onChooseFolder }: BookmarkFolderItemProps) {
  return (
    <div className={styles.folderRoot}>
      <div
        className={styles.folderTitle}
        role="button"
        onClick={() => onChooseFolder(node.id)}
      >
        {node.title}
      </div>
      {node.children
        ? node.children
            .filter((a) => a.children)
            .map((a) => (
              <BookmarkFolderItem
                key={a.id}
                node={a}
                onChooseFolder={onChooseFolder}
              />
            ))
        : null}
    </div>
  );
}
type BookmarksPanelOptions = PanelOptions & {
  bookmarkFolderId: string;
};

type BookmarksPanelProps = ComponentBase &
  DraggablePanelProps & {
    options?: BookmarksPanelOptions;
    onOptionsChanged: (options: BookmarksPanelOptions) => void;
    onDeletePanel: () => void;
  };

export function BookmarksPanel(props: BookmarksPanelProps) {
  const [showFinder, setShowFinder] = useState(false);
  const [allBookmarks, setAllBookmarks] = useState<Bookmark[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [status, setStatus] = useState<Status>(Status.Idle);

  const options: BookmarksPanelOptions = Object.assign(
    getPanelConfig(PanelType.Bookmarks).defaultOptions,
    props.options
  );

  useEffect(() => {
    if (!options.bookmarkFolderId) {
      showFolderPicker();
      return;
    }
    setShowFinder(false);
    getBookmarks(options.bookmarkFolderId).then((res) => {
      setBookmarks(res.filter((a) => a.children));
      setStatus(Status.Loaded);
    });
  }, [options.bookmarkFolderId]);

  function openSite(url: string) {
    openUrl(url, false);
  }

  function handleChooseFolder(id: string) {
    console.log('folder', id);
    const newOpts: BookmarksPanelOptions = { ...options, bookmarkFolderId: id };
    props.onOptionsChanged(newOpts);
  }

  function showFolderPicker() {
    setShowFinder(true);
    getAllBookmarks().then((res) => {
      setAllBookmarks(res);
    });
  }

  return (
    <Panel
      panelId={props.panelId}
      panelIndex={props.panelIndex}
      options={options as any}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
      extraSettings={
        <Button
          text="Choose New Folder"
          kind={ButtonKind.Panel}
          onClick={showFolderPicker}
        />
      }
    >
      {showFinder ? (
        <PanelContent columns={1}>
          <Card>
            <CardHeader text="Choose a folder" />
            <p className={styles.message}>
              Each folder in the folder you choose will become a card and list
              the sites inside.
            </p>
            {allBookmarks.map((node) => (
              <BookmarkFolderItem
                key={node.id}
                node={node}
                onChooseFolder={handleChooseFolder}
              />
            ))}
          </Card>
        </PanelContent>
      ) : (
        <PanelContent columns={options.columns}>
          {status === Status.Loaded && bookmarks.length === 0 ? (
            <div>
              <p>
                No sub folders found. Would you like to choose a different
                folder?
              </p>
              <Button
                kind={ButtonKind.Card}
                text="Sure"
                fullWidth={true}
                onClick={showFolderPicker}
              />
            </div>
          ) : null}
          {bookmarks.map((group) => (
            <Card key={group.id}>
              <CardHeader text={group.title} />
              {group
                .children!.filter((a) => !a.children)
                .map((site) => (
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
      )}
    </Panel>
  );
}
