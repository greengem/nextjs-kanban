import prisma from "@/prisma/prisma";
import { Label } from "@prisma/client";

// Fetch labels
export async function getLabelsForBoard(boardId: string): Promise<Label[]> {
  const labels = await prisma.label.findMany({
    where: {
      boardId: boardId,
    },
  });

  return labels;
}
