import { auth } from "@/auth";
import prisma from '@/db/prisma';
import BoardAddUsers from './AddUsers/BoardAddUsers';
import { BoardMember, User } from "@prisma/client";

type BoardMemberWithUser = BoardMember & {
    user: User;
  };

export default async function BoardUsers({ boardId }: { boardId: string }) {
    const session = await auth();
    const userId = session?.user?.id;
  
    if (!userId) {
      return <div>User not authenticated</div>;
    }

    const boardMembers = await prisma.boardMember.findMany({
      where: { boardId: boardId },
      include: { user: true }
    }) as BoardMemberWithUser[];

    const owner = boardMembers.find((member) => member.role === 'owner')?.user ?? null;
    const isOwner = owner?.id === userId;
    
    const members = boardMembers.filter((member) => member.role === 'member').map((member) => member.user);
  
    return <BoardAddUsers boardId={boardId} owner={owner} members={members} isOwner={isOwner} loggedInUserId={userId} />;
}

