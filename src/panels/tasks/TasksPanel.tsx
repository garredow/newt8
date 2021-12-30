import {
  addHours,
  differenceInMinutes,
  format,
  formatDistanceStrict,
} from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { MdAdd, MdDelete, MdDeleteSweep } from 'react-icons/md';
import { PanelSettings } from '../../contexts/PanelContext';
import { ControlLocation } from '../../enums/controlLocation';
import { PanelKind } from '../../enums/panelKind';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';
import { PanelBaseProps } from '../../models/PanelBaseProps';
import { Task } from '../../models/Task';
import { getPanelConfig } from '../../services/panels';
import { IconButton } from '../../ui-components/button';
import { Card } from '../../ui-components/card';
import { DynamicText } from '../../ui-components/DynamicText';
import { EditableDate } from '../../ui-components/EditableDate';
import { Checkbox } from '../../ui-components/input';
import { SettingsRow } from '../../ui-components/list';
import { Panel, PanelContent } from '../../ui-components/panel';
import { ifClass, joinClasses } from '../../utilities/classes';
import taskService from './service';
import styles from './TasksPanel.module.css';

type TasksPanelOptions = PanelSettings & {
  showCompleted: boolean;
  showDeleted: boolean;
  dateFormat: 'relative' | 'exact';
};

type TasksPanelProps = ComponentBaseProps & PanelBaseProps<TasksPanelOptions>;

export function TasksPanel(props: TasksPanelProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const options: TasksPanelOptions = useMemo(
    () =>
      Object.assign(
        getPanelConfig(PanelKind.Tasks).defaultOptions,
        props.panel.options
      ),
    [props.panel.options]
  );

  useEffect(() => {
    setTasks(taskService.getAll());
  }, []);

  function updateTask(task: Task) {
    const index = tasks.findIndex((a) => a.id === task.id);
    if (index === -1) return;

    const newTasks = [...tasks];
    newTasks[index] = task;

    taskService.save(newTasks);
    setTasks(newTasks);
  }

  function addTask() {
    const newTasks: Task[] = [
      ...tasks,
      {
        id: new Date().valueOf(),
        title: 'New task',
        dueDate: addHours(new Date(), 3).valueOf(),
        completedDate: undefined,
        priority: 3,
      },
    ];

    taskService.save(newTasks);
    setTasks(newTasks);
  }

  function deleteTask(id: number) {
    const newTasks: Task[] = tasks.filter((a) => a.id !== id);

    taskService.save(newTasks);
    setTasks(newTasks);
  }

  function deleteDeletedTasks() {
    const newTasks: Task[] = tasks.filter((a) => !a.deletedDate);

    taskService.save(newTasks);
    setTasks(newTasks);
  }

  function handleOptionChanged(key: string, val: any) {
    const newOpts: TasksPanelOptions = {
      ...options,
      [key]: val,
    };
    props.onOptionsChanged(newOpts);
  }

  return (
    <Panel
      panel={props.panel}
      onOptionsChanged={props.onOptionsChanged as any}
      onDeletePanel={props.onDeletePanel}
      enableSecondaryText={false}
      enableAccentText={false}
      extraSettings={
        <>
          <SettingsRow label="Date format" helpText="How to display task dates">
            <select
              defaultValue={options.dateFormat}
              onChange={(ev) =>
                handleOptionChanged('dateFormat', ev.target.value)
              }
              data-testid="select-dateFormat"
            >
              <option value="relative">Relative</option>
              <option value="exact">Exact</option>
            </select>
          </SettingsRow>
          <SettingsRow label="Show completed tasks" helpText="">
            <Checkbox
              location={ControlLocation.Panel}
              checked={options.showCompleted}
              onChange={(checked) =>
                handleOptionChanged('showCompleted', checked)
              }
            />
          </SettingsRow>
          <SettingsRow label="Show deleted tasks" helpText="">
            <Checkbox
              location={ControlLocation.Panel}
              checked={options.showDeleted}
              onChange={(checked) =>
                handleOptionChanged('showDeleted', checked)
              }
            />
          </SettingsRow>
        </>
      }
      data-testid={props['data-testid']}
    >
      <PanelContent>
        <Card
          cardId="tasks_current"
          defaultTitle="Current"
          enableSettings={true}
          actions={
            <IconButton
              icon={<MdAdd />}
              title="Add a task"
              onClick={addTask}
              size={32}
              data-testid="btn-settings"
            />
          }
        >
          {tasks
            .filter((a) => !a.completedDate && !a.deletedDate)
            .sort((a, b) => {
              if (!a.dueDate) return 1;
              if (!b.dueDate) return -1;
              if (a.dueDate < b.dueDate) return -1;
              if (a.dueDate > b.dueDate) return 1;
              return 0;
            })
            .map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                dateFormat={options.dateFormat}
                onUpdate={(a) => updateTask(a)}
                onDelete={() =>
                  updateTask({ ...task, deletedDate: new Date().valueOf() })
                }
              />
            ))}
        </Card>
        {options.showCompleted && (
          <Card cardId="tasks_complete" defaultTitle="Completed">
            {tasks
              .filter((a) => a.completedDate && !a.deletedDate)
              .sort((a, b) => {
                if ((a.completedDate as number) < (b.completedDate as number))
                  return 1;
                if ((a.completedDate as number) > (b.completedDate as number))
                  return -1;
                return 0;
              })
              .map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  dateFormat={options.dateFormat}
                  onUpdate={(a) => updateTask(a)}
                  onDelete={() =>
                    updateTask({ ...task, deletedDate: new Date().valueOf() })
                  }
                />
              ))}
          </Card>
        )}
        {options.showDeleted && (
          <Card
            cardId="tasks_trash"
            defaultTitle="Trash"
            actions={
              <IconButton
                icon={<MdDeleteSweep />}
                title="Permanently delete all"
                onClick={deleteDeletedTasks}
                size={32}
                data-testid="btn-delete-all"
              />
            }
          >
            {tasks
              .filter((a) => a.deletedDate)
              .sort((a, b) => {
                if ((a.deletedDate as number) < (b.deletedDate as number))
                  return 1;
                if ((a.deletedDate as number) > (b.deletedDate as number))
                  return -1;
                return 0;
              })
              .map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  dateFormat={options.dateFormat}
                  onUpdate={(a) => updateTask(a)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
          </Card>
        )}
      </PanelContent>
    </Panel>
  );
}

type TaskRowProps = {
  task: Task;
  dateFormat: 'relative' | 'exact';
  onUpdate: (task: Task) => void;
  onDelete: () => void;
};
function TaskRow(props: TaskRowProps) {
  const minutesLeft = differenceInMinutes(
    props.task.dueDate,
    new Date().valueOf()
  );

  function updateTask(key: keyof Task, val: any) {
    props.onUpdate({
      ...props.task,
      [key]: val,
    });
  }

  function formatDate(): string {
    switch (props.dateFormat) {
      case 'relative':
        return formatDistanceStrict(props.task.dueDate, new Date().valueOf(), {
          addSuffix: minutesLeft < 0,
        });
      case 'exact':
        return format(props.task.dueDate, 'MM-dd h:mm aaa');
    }
  }

  return (
    <div className={joinClasses(styles.row)}>
      <Checkbox
        className={styles.checkbox}
        checked={!!props.task.completedDate}
        location={ControlLocation.Card}
        onChange={() =>
          updateTask(
            'completedDate',
            props.task.completedDate ? undefined : new Date().valueOf()
          )
        }
      />
      <DynamicText
        text={props.task.title}
        editable={true}
        onEdit={(val) => updateTask('title', val)}
      />
      <div className={styles.spacer} />
      <EditableDate
        className={joinClasses(
          styles.dueDate,
          ifClass(minutesLeft < 60, styles.dueSoon),
          ifClass(minutesLeft < 0, styles.overdue)
        )}
        value={props.task.dueDate}
        label={formatDate()}
        onChange={(val) => updateTask('dueDate', val)}
      />

      <div className={styles.actions}>
        <IconButton
          icon={<MdDelete />}
          title="Delete task"
          onClick={props.onDelete}
          size={28}
          data-testid="btn-delete"
        />
      </div>
    </div>
  );
}
