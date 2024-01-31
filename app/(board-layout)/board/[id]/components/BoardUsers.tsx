import { auth } from "@/auth";
import prisma from '@/db/prisma';
import BoardUsersList from './BoardUsersList';
import BoardAddUsers from './AddUsers/BoardAddUsers';
import { BoardMember } from "@prisma/client";

export default async function BoardUsers({ boardId }: { boardId: string }) {
    const session = await auth();
    const userId = session?.user?.id;
  
    if (!userId) {
      return <div>User not authenticated</div>;
    }

    // Assuming 'boardMembers' is an array of BoardMember (including the user relation)
    const boardMembers = await prisma.boardMember.findMany({
        where: { boardId: boardId },
        include: { user: true }
    });

    // Explicitly type 'member' as 'BoardMember' to fix the TypeScript error
    const owner = boardMembers.find((member: BoardMember) => member.role === 'owner')?.user ?? null;
    const isOwner = owner?.id === userId;

    // Similarly, explicitly type 'member' in the filter and map functions
    const members = boardMembers.filter((member: BoardMember) => member.role === 'member').map((member: BoardMember) => member.user);
  
    return (
        <>
            <BoardUsersList owner={owner} members={members} />
            <BoardAddUsers boardId={boardId} owner={owner} members={members} isOwner={isOwner} loggedInUserId={userId} />
        </>
    );
}

