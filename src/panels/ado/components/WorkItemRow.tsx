import React, { useContext, useState } from 'react';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';
import { PanelContext } from '../../../contexts/PanelContext';
import { DisplayDensity } from '../../../enums/displayDensity';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { openUrl } from '../../../services/browser';
import { IconButton } from '../../../ui-components/button';
import { ifClass, joinClasses } from '../../../utilities/classes';
import { WorkItem } from '../models';
import styles from './WorkItemRow.module.css';

type Props = ComponentBaseProps & {
  level?: number;
  levelOffset?: number;
  workItem: WorkItem;
  onClick: () => void;
};

export function WorkItemRow({ level = 0, levelOffset = 20, workItem, onClick, ...props }: Props) {
  const [open, setOpen] = useState(true);

  const { settings } = useContext(PanelContext);

  return (
    <>
      <div
        className={joinClasses(
          styles.root,
          ifClass(settings.showSiteDividers, styles.divider),
          ifClass(settings.displayDensity === DisplayDensity.Compact, styles.compact),
          ifClass(settings.displayDensity === DisplayDensity.Spacious, styles.spacious),
          props.className
        )}
        style={{ paddingLeft: `${level * levelOffset}px` }}
        onClick={onClick}
      >
        <IconButton
          className={ifClass(workItem.children.length === 0, styles.hidden)}
          title="Toggle child items"
          size={24}
          icon={open ? <MdChevronRight /> : <MdExpandMore />}
          onClick={() => setOpen(!open)}
        />
        <img
          className={styles.workItemIcon}
          src={workItem.icon?.url}
          alt=""
          title={workItem.type?.name}
        />
        <div className={styles.title}>{workItem.title}</div>
        {workItem.assignedTo ? (
          <img
            className={styles.assignedAvatar}
            src={workItem.assignedTo.avatarUrl}
            alt=""
            title={workItem.assignedTo.name}
          />
        ) : null}
        <div
          className={styles.stateIcon}
          style={{ backgroundColor: `#${workItem.state?.color}` }}
          title={workItem.state?.name}
        />
      </div>
      {open &&
        workItem.children.map((a) => (
          <WorkItemRow
            key={a.id}
            level={level + 1}
            className={styles.childItem}
            workItem={a}
            onClick={() => openUrl(a.url)}
          />
        ))}
    </>
  );
}
