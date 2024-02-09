import { auth } from "@/auth";
import prisma from '@/db/prisma';
import BoardFavouriteClient from "./BoardFavourite.client";

export default async function BoardFavourite({ boardId } : { boardId: string }) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) { return <div>User not authenticated</div> };

  const board = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
      include: {
        favoritedBy: true,
      },
  });

  const isFavorite = board?.favoritedBy.some(user => user.id === userId) || false;

  return <BoardFavouriteClient isFavorite={isFavorite} boardId={boardId} />;
}