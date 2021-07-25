import React, { useState, useEffect, useMemo } from 'react';
import { ControlLocation } from '../enums/controlLocation';
import { PanelKind } from '../enums/panelKind';
import { Status } from '../enums/status';
import { Bookmark } from '../models/Bookmark';
import { ComponentBase } from '../models/ComponentBase';
import { DraggablePanelProps } from '../models/DraggablePanelProps';
import {
  getAllBookmarks,
  getBookmarks,
  openUrl,
  OpenSiteOption,
} from '../services/browser';
import { getPanelConfig } from '../services/panels';
import { Button } from '../ui-components/button/Button';
import { Card, CardHeader } from '../ui-components/card';
import { SiteRow } from '../ui-components/list/SiteRow';
import { Panel, PanelContent } from '../ui-components/panel';
import { PanelSettings } from '../ui-components/panel/PanelContext';
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
type BookmarksPanelOptions = PanelSettings & {
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

  const options: BookmarksPanelOptions = useMemo(
    () =>
      Object.assign(
        getPanelConfig(PanelKind.Bookmarks).defaultOptions,
        props.options
      ),
    [props.options]
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

  function handleChooseFolder(id: string) {
    const newOpts: BookmarksPanelOptions = { ...options, bookmarkFolderId: id };
    props.onOptionsChanged(newOpts);
  }

  function showFolderPicker() {
    setShowFinder(true);
    getAllBookmarks().then((res) => {
      setAllBookmarks(res);
    });
  }

  function editBookmarks() {
    openUrl(
      `chrome://bookmarks/?id=${options.bookmarkFolderId}`,
      OpenSiteOption.NewTab
    );
  }

  return (
    <Panel
      panelId={props.panelId}
      panelIndex={props.panelIndex}
      options={options as any}
      enableColumns={true}
      enableOrientation={true}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
      extraButtons={
        <>
          <Button
            text="Edit Bookmarks"
            location={ControlLocation.Panel}
            fullWidth
            onClick={editBookmarks}
          />
          <Button
            text="Choose New Folder"
            location={ControlLocation.Panel}
            fullWidth
            onClick={showFolderPicker}
          />
        </>
      }
    >
      {showFinder ? (
        <PanelContent columns={1}>
          <Card title="Choose a folder">
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
        <PanelContent>
          {status === Status.Loaded && bookmarks.length === 0 ? (
            <div>
              <p>
                No sub folders found. Would you like to choose a different
                folder?
              </p>
              <Button
                location={ControlLocation.Card}
                text="Sure"
                fullWidth={true}
                onClick={showFolderPicker}
              />
            </div>
          ) : null}
          {bookmarks.map((group) => (
            <Card key={group.id} title={group.title}>
              {group
                .children!.filter((a) => !a.children)
                .map((site) => (
                  <SiteRow
                    key={site.id}
                    primaryText={site.title}
                    secondaryText={site.url}
                    url={site.url}
                    onClick={(action) => openUrl(site.url!, action)}
                  />
                ))}
            </Card>
          ))}
        </PanelContent>
      )}
    </Panel>
  );
}
