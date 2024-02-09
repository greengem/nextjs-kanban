import { Board as BoardType, Column, Task, Label } from '@prisma/client';
import prisma from '@/db/prisma';
import { auth } from "@/auth";
import Board from "./components/Board";
import BoardNavbar from "./components/BoardNavbar";
import Image from 'next/image';
import { redirect } from 'next/navigation'

type ExtendedTask = Task & {
  labels: Label[];
};

type ExtendedColumn = Column & {
  tasks: ExtendedTask[];
};

type ExtendedBoard = BoardType & {
  columns: ExtendedColumn[];
};

export default async function BoardPage({ params, searchParams }: { params: { id: string }; searchParams: { labels?: string };}) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) { return <div>User not authenticated</div> };
  
  const isMember = await prisma.boardMember.findFirst({
    where: {
      boardId: params.id,
      userId: userId,
    }
  });
  if (!isMember) { redirect('/board')};

  const board: ExtendedBoard | null = await prisma.board.findUnique({
    where: { id: params.id },
    include: {
      columns: {
        orderBy: { order: 'asc' },
        include: {
          tasks: {
            orderBy: { order: 'asc' },
            include: {
              labels: true,
            },
          },
        },
      },
    },
  });

  if (!board) { return <div>Board not found</div> };

  return (
    <main className="flex flex-col grow min-w-0 bg-cover bg-center bg-zinc-200 relative">
      {board.backgroundUrl && (
          <Image 
          className='object-cover object-center z-0'
          src={board.backgroundUrl} 
          alt='Board Wallpaper' 
          fill
      />
      )}
      <BoardNavbar board={board} />
      <Board board={board} />
    </main>
  );
}
