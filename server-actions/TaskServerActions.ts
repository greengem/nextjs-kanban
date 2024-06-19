"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { ActivityType } from "@prisma/client";
import prisma from "@/prisma/prisma";
import { auth } from "@/auth";
import {
  TaskCreationData,
  TaskEditData,
  TaskDeletionData,
} from "@/types/types";
import { MESSAGES } from "@/utils/messages";

// Create Task
export async function handleCreateTask(data: TaskCreationData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const CreateTaskSchema = z.object({
    taskTitle: z.string().min(1, MESSAGES.TASK.TITLE_TOO_SHORT),
    columnId: z.string().min(1, MESSAGES.COMMON.COLUMN_ID_REQUIRED),
    boardId: z.string().min(1, MESSAGES.COMMON.BOARD_ID_REQUIRED),
  });

  const parse = CreateTaskSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const maxOrderTask = await prisma.task.findFirst({
      where: { columnId: parse.data.columnId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = (maxOrderTask?.order || 0) + 1;

    const createdTask = await prisma.task.create({
      data: {
        title: parse.data.taskTitle,
        columnId: parse.data.columnId,
        order: newOrder,
        createdByUserId: userId,
      },
    });

    if (createdTask) {
      await prisma.activity.create({
        data: {
          type: ActivityType.TASK_CREATED,
          userId: userId,
          taskId: createdTask.id,
          boardId: parse.data.boardId,
          originalColumnId: parse.data.columnId,
        },
      });
    }

    revalidatePath(`/board/${parse.data.boardId}`);

    return {
      success: true,
      message: MESSAGES.TASK.CREATE_SUCCESS,
    };
  } catch (e) {
    return { success: false, message: MESSAGES.TASK.CREATE_FAILURE };
  }
}

// Edit Task
export async function handleEditTask(data: TaskEditData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const EditTaskSchema = z.object({
    id: z.string().min(1, MESSAGES.COMMON.TASK_ID_REQUIRED),
    boardId: z.string().min(1, MESSAGES.COMMON.BOARD_ID_REQUIRED),
    title: z.string().min(1, MESSAGES.TASK.TITLE_TOO_SHORT),
    description: z.union([z.string(), z.null()]).optional(),
  });

  const parse = EditTaskSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.task.update({
      where: { id: parse.data.id },
      data: {
        title: parse.data.title,
        description: parse.data.description,
      },
    });

    revalidatePath(`/board/${parse.data.boardId}`);

    return { success: true, message: MESSAGES.TASK.UPDATE_SUCCESS };
  } catch (e) {
    return { success: false, message: MESSAGES.TASK.UPDATE_FAILURE };
  }
}

// Delete Task
export async function handleDeleteTask(data: TaskDeletionData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const DeleteTaskSchema = z.object({
    id: z.string().min(1, MESSAGES.COMMON.TASK_ID_REQUIRED),
    columnId: z.string().min(1, MESSAGES.COMMON.COLUMN_ID_REQUIRED),
    boardId: z.string().min(1, MESSAGES.COMMON.BOARD_ID_REQUIRED),
  });

  const parse = DeleteTaskSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const deletedTask = await prisma.task.delete({
      where: { id: parse.data.id },
      select: { order: true },
    });

    if (deletedTask) {
      await prisma.task.updateMany({
        where: {
          columnId: parse.data.columnId,
          order: { gt: deletedTask.order },
        },
        data: {
          order: { decrement: 1 },
        },
      });
    }

    revalidatePath(`/board/${parse.data.boardId}`);
    return { success: true, message: MESSAGES.TASK.DELETE_SUCCESS };
  } catch (e) {
    return { success: false, message: MESSAGES.TASK.DELETE_FAILURE };
  }
}
