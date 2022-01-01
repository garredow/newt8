import React, { useContext } from 'react';
import { PanelContext } from '../../../contexts/PanelContext';
import { DisplayDensity } from '../../../enums/displayDensity';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { ifClass, joinClasses } from '../../../utilities/classes';
import { WorkItem } from '../models';
import styles from './WorkItemRow.module.css';

type Props = ComponentBaseProps & {
  workItem: WorkItem;
  onClick: () => void;
};

export function WorkItemRow({ workItem, onClick, ...props }: Props) {
  const { settings } = useContext(PanelContext);

  return (
    <div
      className={joinClasses(
        styles.root,
        ifClass(settings.showSiteDividers, styles.divider),
        ifClass(
          settings.displayDensity === DisplayDensity.Compact,
          styles.compact
        ),
        ifClass(
          settings.displayDensity === DisplayDensity.Spacious,
          styles.spacious
        ),
        props.className
      )}
      onClick={onClick}
    >
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
  );
}
