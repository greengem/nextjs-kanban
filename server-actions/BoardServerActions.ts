"use server";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { MESSAGES } from "@/utils/messages";
import { ActivityType } from "@prisma/client";

// Enums
enum LabelColor {
  GREEN = "green",
  YELLOW = "yellow",
  ORANGE = "orange",
  RED = "red",
  PURPLE = "purple",
  BLUE = "blue",
}

const DEFAULT_LABEL_COLORS: LabelColor[] = [
  LabelColor.GREEN,
  LabelColor.YELLOW,
  LabelColor.ORANGE,
  LabelColor.RED,
  LabelColor.PURPLE,
  LabelColor.BLUE,
];

// Create Board
export async function handleCreateBoard(data: { title: string }) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const CreateBoardSchema = z.object({
    title: z.string().min(3, MESSAGES.BOARD.TITLE_TOO_SHORT),
  });

  const parse = CreateBoardSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    const createdBoard = await prisma.board.create({
      data: {
        title: parse.data.title,
      },
    });

    await prisma.boardMember.create({
      data: {
        boardId: createdBoard.id,
        userId: userId,
        role: "owner",
      },
    });

    await createDefaultLabelsForBoard(createdBoard.id, userId);

    revalidatePath("/board/");

    return {
      success: true,
      message: MESSAGES.BOARD.CREATE_SUCCESS,
      boardId: createdBoard.id,
    };
  } catch (e) {
    console.error("Error creating board:", e);
    return { success: false, message: MESSAGES.BOARD.CREATE_FAILURE };
  }
}

// Function to create default labels for a board
async function createDefaultLabelsForBoard(boardId: string, userId: string) {
  const labelCreations = DEFAULT_LABEL_COLORS.map((color) => {
    return prisma.label.create({
      data: {
        color: color,
        title: null,
        boardId: boardId,
        isDefault: true,
        userId: userId,
      },
    });
  });

  await Promise.all(labelCreations);
}

// Edit Board
export async function handleEditBoard(data: {
  boardId: string;
  title: string;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const EditBoardSchema = z.object({
    boardId: z.string().min(1, MESSAGES.BOARD.BOARD_ID_REQUIRED),
    title: z.string().min(3, MESSAGES.BOARD.TITLE_TOO_SHORT),
  });

  const parse = EditBoardSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.board.update({
      where: {
        id: parse.data.boardId,
      },
      data: {
        title: parse.data.title,
      },
    });

    revalidatePath(`/board/${parse.data.boardId}`);

    return { success: true, message: MESSAGES.BOARD.UPDATE_SUCCESS };
  } catch (e) {
    console.error("Error editing board:", e);
    return { success: false, message: MESSAGES.BOARD.UPDATE_FAILURE };
  }
}

// Delete Board
export async function handleDeleteBoard(data: { boardId: string }) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const DeleteBoardSchema = z.object({
    boardId: z.string().min(1, MESSAGES.BOARD.BOARD_ID_REQUIRED),
  });

  const parse = DeleteBoardSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const owner = await tx.boardMember.findFirst({
        where: {
          boardId: parse.data.boardId,
          userId: userId,
          role: "owner",
        },
      });

      if (!owner) {
        throw new Error(MESSAGES.BOARD.OWNER_ONLY_DELETE);
      }

      await tx.boardMember.deleteMany({
        where: { boardId: parse.data.boardId },
      });

      await tx.board.delete({
        where: { id: parse.data.boardId },
      });
    });

    revalidatePath(`/board/`);

    return { success: true, message: MESSAGES.BOARD.DELETE_SUCCESS };
  } catch (e) {
    console.error("Error deleting board:", e);
    const error = e as Error;
    return {
      success: false,
      message: error.message || MESSAGES.BOARD.DELETE_FAILURE,
    };
  }
}

// Edit Background Image
export async function handleEditBoardImage(data: {
  url: string;
  boardId: string;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const EditBoardImageSchema = z.object({
    url: z.string().min(1, MESSAGES.BOARD.IMAGE_URL_REQUIRED),
    boardId: z.string().min(1, MESSAGES.BOARD.BOARD_ID_REQUIRED),
  });

  const parse = EditBoardImageSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.board.update({
      where: {
        id: parse.data.boardId,
      },
      data: {
        backgroundUrl: parse.data.url,
      },
    });

    revalidatePath(`/board/${parse.data.boardId}`);

    return { success: true, message: MESSAGES.BOARD.IMAGE_SAVE_SUCCESS };
  } catch (e) {
    console.error("Error updating board image:", e);
    return { success: false, message: MESSAGES.BOARD.IMAGE_SAVE_FAILURE };
  }
}

// Remove Background Image
export async function handleRemoveBoardImage(data: { boardId: string }) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const RemoveBoardImageSchema = z.object({
    boardId: z.string().min(1, MESSAGES.BOARD.BOARD_ID_REQUIRED),
  });

  const parse = RemoveBoardImageSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.board.update({
      where: {
        id: parse.data.boardId,
      },
      data: {
        backgroundUrl: null,
      },
    });

    revalidatePath(`/board/${parse.data.boardId}`);

    return { success: true, message: MESSAGES.BOARD.IMAGE_REMOVE_SUCCESS };
  } catch (e) {
    console.error("Error removing board image:", e);
    return { success: false, message: MESSAGES.BOARD.IMAGE_REMOVE_FAILURE };
  }
}

// Server action for saving board and task positions.

interface TaskData {
  id: string;
  order: number;
  columnId: string;
}

interface ColumnData {
  id: string;
  order: number;
  tasks: TaskData[];
}

interface BoardData {
  columns: ColumnData[];
}

export async function handleUpdateBoard(data: {
  boardId: string;
  boardData: BoardData;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: MESSAGES.AUTH.REQUIRED };
  }

  const UpdateBoardSchema = z.object({
    boardId: z.string().min(1, MESSAGES.BOARD.BOARD_ID_REQUIRED),
    boardData: z.object({
      columns: z.array(
        z.object({
          id: z.string().min(1, MESSAGES.BOARD.COLUMN_ID_REQUIRED),
          order: z.number(),
          tasks: z.array(
            z.object({
              id: z.string().min(1, MESSAGES.BOARD.TASK_ID_REQUIRED),
              order: z.number(),
              columnId: z.string().min(1, MESSAGES.BOARD.COLUMN_ID_REQUIRED),
            })
          ),
        })
      ),
    }),
  });

  const parse = UpdateBoardSchema.safeParse(data);

  if (!parse.success) {
    return {
      success: false,
      message: parse.error.errors.map((e) => e.message).join(", "),
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      for (const column of parse.data.boardData.columns) {
        await tx.column.update({
          where: { id: column.id },
          data: { order: column.order },
        });

        for (const task of column.tasks) {
          const originalTask = await tx.task.findUnique({
            where: { id: task.id },
          });

          await tx.task.update({
            where: { id: task.id },
            data: {
              order: task.order,
              columnId: column.id,
            },
          });

          if (originalTask && originalTask.columnId !== column.id) {
            await tx.activity.create({
              data: {
                type: ActivityType.TASK_MOVED,
                userId: userId,
                taskId: task.id,
                boardId: parse.data.boardId,
                oldColumnId: originalTask.columnId,
                newColumnId: column.id,
              },
            });
          }
        }
      }
    });

    revalidatePath(`/board/${parse.data.boardId}`);

    return { success: true, message: MESSAGES.BOARD.UPDATE_SUCCESS };
  } catch (e) {
    console.error("Error updating board:", e);
    return { success: false, message: MESSAGES.BOARD.UPDATE_FAILURE };
  }
}
