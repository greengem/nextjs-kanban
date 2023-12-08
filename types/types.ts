import { Board, Column, Task } from "@prisma/client";

export type BoardSummary = Pick<Board, 'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'>;

export type ColumnWithTasks = Pick<Column, 'id' | 'title' | 'order' | 'createdAt' | 'updatedAt'> & {
    tasks: TaskSummary[];
};

export type TaskSummary = Pick<Task, 'id' | 'order' | 'title' | 'description' | 'dueDate' | 'createdAt' | 'updatedAt' | 'columnId'>;


export type BoardDetails = BoardSummary & {
    columns: ColumnWithTasks[];
};

// Form validation

export type BoardCreationData = Pick<Board, 'title' | 'description'>;

export type BoardDeletionData = Pick<Board, 'id'>;

export type ColumnCreationData = {
    boardId: Board['id'];
    title: Column['title'];
};

export type ColumnDeletionData = {
    boardId: Board['id'];
    id: Column['id'];
};

export type TaskCreationData = {
    title: Task['title'];
    description?: Task['description'];
    boardId: Board['id'];
    columnId: Column['id'];
};

export type TaskEditData = {
    id: Task['id'];
    title: Task['title'];
    description?: Task['description'];
    boardId: Board['id'];
};

export type TaskDeletionData = {
    id: Task['id'];
    boardId: Board['id'];
    columnId: Column['id'];
};
