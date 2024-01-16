import { z } from 'zod';

// Boards
export const CreateBoardSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
});

export const EditBoardSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    id: z.string().min(1, "ID is required"),
});

export const DeleteBoardSchema = z.object({
    id: z.string().min(1, "ID is required"),
});


// Columns
export const CreateColumnSchema = z.object({
    boardId: z.string().min(1, "ID is required"),
    title: z.string().min(3),
});

export const EditColumnSchema = z.object({
    title: z.string().min(3),
    columnId: z.string().min(1, "ID is required"),
    boardId: z.string().min(1, "ID is required"),
});

export const DeleteColumnSchema = z.object({
    id: z.string().min(1, "ID is required"),
    boardId: z.string().min(1, "ID is required"),
});


// Tasks
export const CreateTaskSchema = z.object({
    taskTitle: z.string().min(1), 
    description: z.union([z.string(), z.null()]).optional(),
    columnId: z.string().min(1),
    boardId: z.string().min(1),
});

export const EditTaskSchema = z.object({
    id: z.string().min(1),
    boardId: z.string().min(1),
    title: z.string().min(1).optional(), 
    description: z.union([z.string(), z.null()]).optional(),
});

export const DeleteTaskSchema = z.object({
    id: z.string().min(1),
    columnId: z.string().min(1),
    boardId: z.string().min(1),
});


// Activity
export const CreateActivitySchema = z.object({
    content: z.string().min(1), 
    taskId: z.string().min(1),
    boardId: z.string().min(1),
});

export const DeleteActivitySchema = z.object({
    activityId: z.string().min(1),
    boardId: z.string().min(1),
});
