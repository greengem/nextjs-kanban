import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { BoardMemberSummary } from "@/types/types";

interface BoardUsersProps {
    boardId: string;
    boardMembers: BoardMemberSummary[];
}

export default function BoardUsers({ boardId, boardMembers }: BoardUsersProps) {

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
