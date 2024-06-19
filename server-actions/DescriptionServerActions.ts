"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import prisma from "@/prisma/prisma";
import { auth } from "@/auth";
import { MESSAGES } from "@/utils/messages";

// Edit Task Description
export async function handleEditTaskDescription(
  taskId: string,
  boardId: string,
  description: string
) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const EditTaskDescriptionSchema = z.object({
    taskId: z.string().min(1, MESSAGES.COMMON.TASK_ID_REQUIRED),
    boardId: z.string().min(1, MESSAGES.COMMON.BOARD_ID_REQUIRED),
    description: z.string().min(1, MESSAGES.DESCRIPTION.DESCRIPTION_TOO_SHORT),
  });

  const parse = EditTaskDescriptionSchema.safeParse({
    taskId,
    boardId,
    description,
  });

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.task.update({
      where: { id: parse.data.taskId },
      data: { description: parse.data.description },
    });

    revalidatePath(`/board/${parse.data.boardId}`);

    return { success: true, message: MESSAGES.DESCRIPTION.UPDATE_SUCCESS };
  } catch (e) {
    return { success: false, message: MESSAGES.DESCRIPTION.UPDATE_FAILURE };
  }
}

// Delete Task Description
export async function handleDeleteTaskDescription(
  taskId: string,
  boardId: string
) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const DeleteTaskDescriptionSchema = z.object({
    taskId: z.string().min(1, MESSAGES.COMMON.TASK_ID_REQUIRED),
    boardId: z.string().min(1, MESSAGES.COMMON.BOARD_ID_REQUIRED),
  });

  const parse = DeleteTaskDescriptionSchema.safeParse({ taskId, boardId });

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.task.update({
      where: { id: parse.data.taskId },
      data: { description: null },
    });

    revalidatePath(`/board/${parse.data.boardId}`);

    return { success: true, message: MESSAGES.DESCRIPTION.DELETE_SUCCESS };
  } catch (e) {
    return { success: false, message: MESSAGES.DESCRIPTION.DELETE_FAILURE };
  }
}
