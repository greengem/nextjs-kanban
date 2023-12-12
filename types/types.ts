import { Board, Column, Task, Activity, User } from "@prisma/client";

export type BoardSummary = Pick<Board, 'id' | 'title'>;

export type BoardDetails = BoardSummary & {
    columns: ColumnWithTasks[];
};

export type ColumnWithTasks = Pick<Column, 'id' | 'title' | 'order'> & {
    tasks: TaskSummary[];
};

export type TaskSummary = Pick<Task, 'id' | 'order' | 'title' | 'columnId'>;

export type ExpandedTask = Pick<Task, 'id' | 'order' | 'title' | 'description' | 'dueDate' | 'createdAt' | 'updatedAt' | 'columnId'> & {
    activities: ActivityWithUser[];
    column: Pick<Column, 'title'>;
};

export type ActivityWithUser = Pick<Activity, 'id' | 'type' | 'content' | 'createdAt'> & {
    user: Pick<User, 'id' | 'name' | 'image'>
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

export type ActivityCreationData = {
    type?: Activity['type'];
    content: Activity['content'];
    boardId: Board['id'];
    taskId: Task['id'];
};

export type ActivityDeletionData = {
    boardId: Board['id'];
    activityId: Activity['id'];
};
