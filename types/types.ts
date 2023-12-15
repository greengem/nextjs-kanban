import { Board, Column, Task, Activity, User, Label as PrismaLabel } from "@prisma/client";

export type BoardSummary = Pick<Board, 'id' | 'title'> & {
    tasksCount: number;
    isFavorited: boolean;
};

export type BoardDetails = BoardSummary & {
    columns: ColumnWithTasks[];
};

export type ColumnWithTasks = Pick<Column, 'id' | 'title' | 'order'> & {
    tasks: TaskSummary[];
};

export type TaskSummary = Pick<Task, 'id' | 'order' | 'title' | 'columnId'> & {
    labels: Label[];
};

export type ExpandedTask = Pick<Task, 'id' | 'order' | 'title' | 'description' | 'dueDate' | 'createdAt' | 'updatedAt' | 'columnId'> & {
    activities: ActivityWithUser[];
    column: Pick<Column, 'title' | 'boardId'>;
    labels: Label[];
};

export type ActivityWithUser = Pick<Activity, 'id' | 'type' | 'content' | 'createdAt'> & {
    user: Pick<User, 'id' | 'name' | 'image'>,
    oldColumn: Pick<Column, 'title'> | null,
    newColumn: Pick<Column, 'title'> | null,
    originalColumn: Pick<Column, 'title'> | null
};

// Custom type for Label that includes isSelected
export type Label = PrismaLabel & {
    isSelected: boolean;
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
