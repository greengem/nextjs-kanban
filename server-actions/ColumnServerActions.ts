"use server";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { MESSAGES } from "@/utils/messages";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Create Column
export async function handleCreateColumn(data: {
  boardId: string;
  title: string;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const CreateColumnSchema = z.object({
    boardId: z.string().min(1, MESSAGES.COLUMN.ID_REQUIRED),
    title: z.string().min(3, MESSAGES.COLUMN.TITLE_TOO_SHORT),
  });

  const parse = CreateColumnSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const maxOrderColumn = await prisma.column.findFirst({
      where: { boardId: parse.data.boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newOrder = (maxOrderColumn?.order || 0) + 1;

    await prisma.column.create({
      data: {
        title: parse.data.title,
        boardId: parse.data.boardId,
        order: newOrder,
      },
    });

    revalidatePath(`/board/${parse.data.boardId}`);

    return { success: true, message: MESSAGES.COLUMN.CREATE_SUCCESS };
  } catch (e) {
    console.error("Error creating column:", e);
    return { success: false, message: MESSAGES.COLUMN.CREATE_FAILURE };
  }
}

// Edit Column
export async function handleEditColumn(data: {
  columnId: string;
  boardId: string;
  title: string;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const EditColumnSchema = z.object({
    columnId: z.string().min(1, MESSAGES.COLUMN.COLUMN_ID_REQUIRED),
    boardId: z.string().min(1, MESSAGES.COLUMN.BOARD_ID_REQUIRED),
    title: z.string().min(3, MESSAGES.COLUMN.TITLE_TOO_SHORT),
  });

  const parse = EditColumnSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.column.update({
      where: { id: parse.data.columnId },
      data: { title: parse.data.title },
    });

    revalidatePath(`/board/${parse.data.boardId}`);

    return { success: true, message: MESSAGES.COLUMN.UPDATE_SUCCESS };
  } catch (e) {
    console.error("Error updating column:", e);
    return { success: false, message: MESSAGES.COLUMN.UPDATE_FAILURE };
  }
}

// Delete Column
export async function handleDeleteColumn(data: {
  columnId: string;
  boardId: string;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const DeleteColumnSchema = z.object({
    columnId: z.string().min(1, MESSAGES.COLUMN.COLUMN_ID_REQUIRED),
    boardId: z.string().min(1, MESSAGES.COLUMN.BOARD_ID_REQUIRED),
  });

  const parse = DeleteColumnSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const deletedColumn = await prisma.column.delete({
      where: { id: parse.data.columnId },
      select: { order: true },
    });

    if (deletedColumn) {
      await prisma.column.updateMany({
        where: {
          boardId: parse.data.boardId,
          order: { gt: deletedColumn.order },
        },
        data: { order: { decrement: 1 } },
      });
    }

    revalidatePath(`/board/${parse.data.boardId}`);

    return { success: true, message: MESSAGES.COLUMN.DELETE_SUCCESS };
  } catch (e) {
    console.error("Error deleting column:", e);
    return { success: false, message: MESSAGES.COLUMN.DELETE_FAILURE };
  }
}

// Delete Tasks Within a Column
export async function handleDeleteColumnTasks(data: {
  columnId: string;
  boardId: string;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const DeleteColumnTasksSchema = z.object({
    columnId: z.string().min(1, MESSAGES.COLUMN.COLUMN_ID_REQUIRED),
    boardId: z.string().min(1, MESSAGES.COLUMN.BOARD_ID_REQUIRED),
  });

  const parse = DeleteColumnTasksSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.task.deleteMany({
      where: { columnId: parse.data.columnId },
    });

    revalidatePath(`/board/${parse.data.boardId}`);

    return {
      success: true,
      message: MESSAGES.COLUMN.DELETE_COLUMN_TASKS_SUCCESS,
    };
  } catch (e) {
    console.error("Error deleting tasks within column:", e);
    return {
      success: false,
      message: MESSAGES.COLUMN.DELETE_COLUMN_TASKS_FAILURE,
    };
  }
}
