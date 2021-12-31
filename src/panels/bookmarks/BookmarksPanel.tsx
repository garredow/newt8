import React, { useEffect, useState } from 'react';
import { PanelSettings } from '../../contexts/PanelContext';
import { Status } from '../../enums/status';
import { Bookmark } from '../../models/Browser';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import {
  getAllBookmarks,
  getBookmarks,
  OpenSiteOption,
  openUrl,
  updateBookmark,
} from '../../services/browser';
import { Button } from '../../ui-components/button';
import { Card } from '../../ui-components/card';
import { SiteRow } from '../../ui-components/list';
import { Panel, PanelContent } from '../../ui-components/panel';
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

type BookmarksPanelProps = ComponentBaseProps &
  PanelBaseProps<BookmarksPanelOptions>;

export function BookmarksPanel(props: BookmarksPanelProps) {
  const [showFinder, setShowFinder] = useState(false);
  const [allBookmarks, setAllBookmarks] = useState<Bookmark[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [status, setStatus] = useState<Status>(Status.Idle);

  useEffect(() => {
    if (!props.panel.options.bookmarkFolderId) {
      showFolderPicker();
      return;
    }
    setShowFinder(false);
    getBookmarks(props.panel.options.bookmarkFolderId).then((res) => {
      setBookmarks(res.filter((a) => a.children));
      setStatus(Status.Loaded);
    });
  }, [props.panel.options.bookmarkFolderId]);

  function handleChooseFolder(id: string) {
    const newOpts: BookmarksPanelOptions = {
      ...props.panel.options,
      bookmarkFolderId: id,
    };
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
      `chrome://bookmarks/?id=${props.panel.options.bookmarkFolderId}`,
      OpenSiteOption.NewTab
    );
  }

  return (
    <Panel
      panel={props.panel}
      settings={[
        {
          id: 'sites',
          title: 'Sites',
          items: [
            {
              type: 'checkbox',
              key: 'showSecondaryText',
              label: 'Show Url',
              helpText: "Show the site's URL.",
              testId: 'check-secondary-text',
            },
          ],
        },
        {
          id: 'actions',
          items: [
            {
              type: 'button',
              key: 'editBookmarks',
              label: 'Edit Bookmarks',
              testId: 'btn-edit-bookmarks',
              onClick: editBookmarks,
            },
            {
              type: 'button',
              key: 'choosefolder',
              label: 'Choose New Folder',
              testId: 'btn-choose-folder',
              onClick: showFolderPicker,
            },
          ],
        },
      ]}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      data-testid={props['data-testid']}
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
              <Button text="Sure" fullWidth={true} onClick={showFolderPicker} />
            </div>
          ) : null}
          {bookmarks.map((node) => (
            <Card
              key={node.id}
              cardId={`bookmarks_${node.id}`}
              title={node.title}
              enableSettings
              onTitleChanged={(title) => updateBookmark(node.id, { title })}
            >
              {node
                .children!.filter((a) => !a.children)
                .map((site) => (
                  <SiteRow
                    key={site.id}
                    primaryText={site.title}
                    secondaryText={site.url}
                    url={site.url}
                    editable={true}
                    onClick={(action) => openUrl(site.url!, action)}
                    onEdit={(title) => updateBookmark(site.id, { title })}
                  />
                ))}
            </Card>
          ))}
        </PanelContent>
      )}
    </Panel>
  );
}
