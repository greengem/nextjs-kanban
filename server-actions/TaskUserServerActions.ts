"use server";
import prisma from "@/prisma/prisma";
import { auth } from "@/auth";
import { z } from "zod";
import { MESSAGES } from "@/utils/messages";
import { revalidatePath } from "next/cache";
import { ActivityType } from "@prisma/client";

// Add User to Task
export async function handleAddUserToTask(
  targetUserId: string,
  taskId: string,
  boardId: string
) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const AddUserToTaskSchema = z.object({
    targetUserId: z.string().min(1, MESSAGES.COMMON.USER_ID_REQUIRED),
    taskId: z.string().min(1, MESSAGES.COMMON.TASK_ID_REQUIRED),
    boardId: z.string().min(1, MESSAGES.COMMON.BOARD_ID_REQUIRED),
  });

  const parse = AddUserToTaskSchema.safeParse({
    targetUserId,
    taskId,
    boardId,
  });

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.taskAssignment.create({
      data: {
        userId: parse.data.targetUserId,
        taskId: parse.data.taskId,
      },
    });

    await prisma.activity.create({
      data: {
        type: ActivityType.TASK_ASSIGNED,
        userId: userId,
        taskId: parse.data.taskId,
        boardId: parse.data.boardId,
        targetUserId: parse.data.targetUserId,
      },
    });

    revalidatePath(`/board/${parse.data.boardId}`);

    return {
      success: true,
      message: MESSAGES.USER_TO_TASK.CREATE_SUCCESS,
    };
  } catch (e) {
    return { success: false, message: MESSAGES.USER_TO_TASK.CREATE_FAILURE };
  }
}

// Remove User from Task
export async function handleRemoveUserFromTask(
  targetUserId: string,
  taskId: string,
  boardId: string
) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const RemoveUserFromTaskSchema = z.object({
    targetUserId: z.string().min(1, MESSAGES.COMMON.USER_ID_REQUIRED),
    taskId: z.string().min(1, MESSAGES.COMMON.TASK_ID_REQUIRED),
    boardId: z.string().min(1, MESSAGES.COMMON.BOARD_ID_REQUIRED),
  });

  const parse = RemoveUserFromTaskSchema.safeParse({
    targetUserId,
    taskId,
    boardId,
  });

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.taskAssignment.delete({
      where: {
        userId_taskId: {
          userId: parse.data.targetUserId,
          taskId: parse.data.taskId,
        },
      },
    });

    await prisma.activity.create({
      data: {
        type: ActivityType.TASK_UNASSIGNED,
        userId: userId,
        taskId: parse.data.taskId,
        boardId: parse.data.boardId,
        targetUserId: parse.data.targetUserId,
      },
    });

    revalidatePath(`/board/${parse.data.boardId}`);

    return {
      success: true,
      message: MESSAGES.USER_TO_TASK.DELETE_SUCCESS,
    };
  } catch (e) {
    return { success: false, message: MESSAGES.USER_TO_TASK.DELETE_FAILURE };
  }
}
