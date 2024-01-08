import prisma from '@/db/prisma';
import BoardUsersList from './BoardUsersList';
import BoardAddUsers from './AddUsers/BoardAddUsers';
import { BoardMemberSummary } from "@/types/types";

export default async function BoardUsers({ boardId }: { boardId: string }) {
    const boardMembers = await prisma.boardMember.findMany({
        where: { boardId: boardId },
        include: { user: true }
    });

    const owner = boardMembers.find(member => member.role === 'owner')?.user ?? null;
    const members = boardMembers.filter(member => member.role === 'member').map(member => member.user);

    return (
        <>
            <BoardUsersList owner={owner} members={members} />
            <BoardAddUsers boardId={boardId} owner={owner} members={members} />
        </>
    );
}
