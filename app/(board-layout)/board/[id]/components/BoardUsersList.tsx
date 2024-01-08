import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { BoardMemberSummary } from "@/types/types";

type UserSummary = BoardMemberSummary['user'];

interface BoardUsersListProps {
    owner: UserSummary | null;
    members: UserSummary[];
}

export default function BoardUsersList({ owner, members }: BoardUsersListProps) {

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
