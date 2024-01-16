'use client'
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/button"
import { Avatar } from "@nextui-org/avatar";
import { IconMinus } from "@tabler/icons-react";
import { BoardMemberSummary } from "@/types/types";
import { handleRemoveUserFromBoard } from "@/actions/InvitationActions";
import toast from 'react-hot-toast';

type UserSummary = BoardMemberSummary['user'];

interface BoardAddUsersListProps {
    owner: UserSummary | null;
    members: UserSummary[];
    boardId: string;
    isOwner: boolean;
    loggedInUserId: string;
}

export default function BoardAddUsersList({ owner, members, boardId, isOwner, loggedInUserId }: BoardAddUsersListProps) {
    const router = useRouter();

    const handleRemoveUser = async (userId: string) => {
        if (!confirm("Are you sure you want to remove this user?")) return;
        
        try {
            const response = await handleRemoveUserFromBoard({ boardId, userId });
            if (response.success) {
                //router.push('/board/');
                toast.success('User removed successfully');
            } else {
                toast.error(response.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error removing user:', error);
            toast.error('An error occurred while removing the user.');
        }
    };

    return (
        <ul className='mb-5'>
            {owner && (
                <li className='flex gap-2 items-center border-b-1 border-zinc-300 last:border-b-0 py-2'>
                    <Avatar className='shrink-0 grow-0' showFallback name={owner.name || ''}  src={owner.image || undefined}  />
                    <div className='grow'>
                        <p>{owner.name || ''}</p>
                        <p className='text-xs'>Owner</p>
                    </div>
                </li>
            )}
            {members.map(member => (
                <li key={member.id}  className='flex gap-2 items-center border-b-1 border-zinc-300 last:border-b-0 py-2'>
                    <Avatar className='shrink-0 grow-0' showFallback name={member.name || ''}  src={member.image || undefined}  />
                    <div className='grow'>
                        <p>{member.name || ''}</p>
                        <p className='text-xs'>Member</p>
                    </div>
                    {(isOwner || member.id === loggedInUserId) && (
                        <Button size='sm' isIconOnly onClick={() => handleRemoveUser(member.id)}>
                            <IconMinus size={16} />
                        </Button>
                    )}
                </li>
            ))}
        </ul>
    )
}
