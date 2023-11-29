import { Board, Column, Task } from "@prisma/client";

export type BoardSummary = Pick<Board, 'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'>;

export type ColumnWithTasks = Pick<Column, 'id' | 'title' | 'order' | 'createdAt' | 'updatedAt'> & {
    tasks: TaskSummary[];
};

export type TaskSummary = Pick<Task, 'id' | 'order' | 'title' | 'description' | 'priority' | 'dueDate' | 'createdAt' | 'updatedAt'>;

export type BoardDetails = BoardSummary & {
    columns: ColumnWithTasks[];
};
