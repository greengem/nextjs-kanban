import { Board, Task } from "@prisma/client";

export type BoardSummary = Pick<Board, 'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'>;

export type ColumnWithTasks = {
    id: string;
    title: string;
    tasks: TaskSummary[];
};

export type TaskSummary = Pick<Task, 'id' | 'order' | 'title' | 'description' | 'priority' | 'dueDate' | 'createdAt' | 'updatedAt'>;

export type BoardDetails = Pick<Board, 'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'> & {
    columns: ColumnWithTasks[];
};
