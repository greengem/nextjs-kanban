import prisma from '@/db/prisma';
import { Avatar, AvatarGroup } from "@nextui-org/avatar";

export default async function BoardUsers({ boardId } : { boardId: string }) {
    const boardMembers = await prisma.boardMember.findMany({
        where: { boardId: boardId },
        include: { user: true }
    });

    const owner = boardMembers.find(member => member.role === 'owner')?.user;
    const members = boardMembers.filter(member => member.role === 'member').map(member => member.user);

    return (
        <>
            <AvatarGroup isBordered size="sm" color="primary">
                {owner && (
                    <Avatar 
                        showFallback 
                        name={owner.name || ''} 
                        src={owner.image || undefined} 
                    />
                )}

                {members.map(member => (
                    <Avatar 
                        key={member.id} 
                        showFallback 
                        name={member.name || ''} 
                        src={member.image || undefined} 
                    />
                ))}
            </AvatarGroup>
        </>
    )
}
