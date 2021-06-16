import React, { useState, useEffect } from 'react';
import { MdSettings } from 'react-icons/md';
import { ButtonType } from '../enums/buttonType';
import { Bookmark } from '../models/Bookmark';
import { getBookmarks, openUrl } from '../services/chromeService';
import { IconButton } from '../ui-components/button';
import { Card, CardButton, CardHeader } from '../ui-components/card';
import { SiteRow } from '../ui-components/card/SiteRow';
import { Panel, PanelContent, PanelHeader } from '../ui-components/panel';
import { PanelSettings } from '../ui-components/panel/PanelSettings';
import { SettingsRow } from '../ui-components/panel/SettingsRow';
import styles from './BookmarksPanel.module.css';

type BookmarksPanelOptions = {
  columns: number;
  width: 'half' | 'full';
};

type BookmarksPanelProps = {
  options: BookmarksPanelOptions;
  onOptionsChanged: (options: BookmarksPanelOptions) => void;
  onDeletePanel: () => void;
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

  function setOptionValue(key: string, val: any) {
    const newOpts = { ...props.options, [key]: val };
    props.onOptionsChanged(newOpts);
  }

  return (
    <div
      className={styles.root}
      style={
        props.options.width === 'half'
          ? { gridColumn: 'span 1' }
          : { gridColumn: 'span 2' }
      }
    >
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
        {showSettings ? (
          <PanelSettings>
            <SettingsRow label="Columns">
              <select
                defaultValue={props.options.columns}
                onChange={(ev) =>
                  setOptionValue('columns', parseInt(ev.target.value, 10))
                }
              >
                <option value={0}>Auto</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            </SettingsRow>
            <SettingsRow label="Width">
              <select
                defaultValue={props.options.width}
                onChange={(ev) => setOptionValue('width', ev.target.value)}
              >
                <option value="half">Half</option>
                <option value="full">Full</option>
              </select>
            </SettingsRow>
            <CardButton
              text="Delete"
              type={ButtonType.Danger}
              onClick={props.onDeletePanel}
            ></CardButton>
          </PanelSettings>
        ) : null}
        <PanelContent columns={props.options.columns}>
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
