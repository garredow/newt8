import { Task } from '../models/Task';

const tasksStorageKey = 'tasks';

export function getAll(): Task[] {
  const tasks = JSON.parse(localStorage.getItem(tasksStorageKey) || '[]');
  return tasks;
}

export function save(tasks: Task[]): void {
  localStorage.setItem(tasksStorageKey, JSON.stringify(tasks));
}

const service = {
  getAll,
  save,
};
export default service;
