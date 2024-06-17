import BoardFilter from "./BoardFilter.client";
import prisma from "@/prisma/prisma";

export default async function BoardFilterFetch({
  boardId,
}: {
  boardId: string;
}) {
  const labels = await prisma.label.findMany({
    where: {
      boardId: boardId,
    },
  });

  return <BoardFilter labels={labels} />;
}
