"use server";
import prisma from "@/prisma/prisma";
import { auth } from "@/auth";
import { z } from "zod";
import { MESSAGES } from "@/utils/messages";
import { revalidatePath } from "next/cache";
import {
  TaskCreationData,
  TaskEditData,
  TaskDeletionData,
} from "@/types/types";
import { ActivityType } from "@prisma/client";

// Add/update a date
export async function handleAddDate(data: {
  taskId: string;
  date: string;
  boardId: string;
  dateType: "startDate" | "dueDate";
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const AddDateSchema = z.object({
    taskId: z.string().min(1, MESSAGES.COMMON.TASK_ID_REQUIRED),
    date: z.string().min(1, MESSAGES.COMMON.DATE_REQUIRED),
    boardId: z.string().min(1, MESSAGES.COMMON.BOARD_ID_REQUIRED),
    dateType: z.enum(["startDate", "dueDate"]),
  });

  const parse = AddDateSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const dateObject = new Date(data.date);

    const existingTask = await prisma.task.findUnique({
      where: { id: data.taskId },
      select: { [data.dateType]: true },
    });

    await prisma.task.update({
      where: { id: data.taskId },
      data: { [data.dateType]: dateObject },
    });

    const activityType =
      existingTask && existingTask[data.dateType]
        ? data.dateType === "dueDate"
          ? ActivityType.DUE_DATE_UPDATED
          : ActivityType.START_DATE_UPDATED
        : data.dateType === "dueDate"
          ? ActivityType.DUE_DATE_ADDED
          : ActivityType.START_DATE_ADDED;

    await prisma.activity.create({
      data: {
        type: activityType,
        taskId: data.taskId,
        userId: userId,
        [data.dateType]: dateObject,
      },
    });

    revalidatePath(`/board/${data.boardId}`);
    return {
      success: true,
      message: MESSAGES.DATE.CREATE_SUCCESS,
    };
  } catch (e) {
    return {
      success: false,
      message: MESSAGES.DATE.CREATE_FAILURE,
    };
  }
}

// Remove a date
export async function handleRemoveDate(data: {
  taskId: string;
  boardId: string;
  dateType: "startDate" | "dueDate";
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  try {
    await prisma.task.update({
      where: { id: data.taskId },
      data: { [data.dateType]: null },
    });

    const activityType =
      data.dateType === "dueDate"
        ? ActivityType.DUE_DATE_REMOVED
        : ActivityType.START_DATE_REMOVED;

    await prisma.activity.create({
      data: {
        type: activityType,
        taskId: data.taskId,
        userId: userId,
      },
    });

    revalidatePath(`/board/${data.boardId}`);
    return {
      success: true,
      message: MESSAGES.DATE.DELETE_SUCCESS,
    };
  } catch (e) {
    return {
      success: false,
      message: MESSAGES.DATE.DELETE_FAILURE,
    };
  }
}
