export type Task = {
  id: number;
  title: string;
  body?: string;
  dueDate: number;
  completedDate?: number;
  deletedDate?: number;
  priority: 1 | 2 | 3;
};
