'use client'
import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { IconUser } from "@tabler/icons-react";
import BoardAddUsersList from './BoardAddUsersList';
import BoardAddUsersLink from './BoardAddUsersLink';
import BoardAddUsersForm from './BoardAddUsersForm';
import { BoardMemberSummary } from "@/types/types";

type UserSummary = BoardMemberSummary['user'];

interface BoardAddUsersProps {
    boardId: string;
    owner: UserSummary | null;
    members: UserSummary[];
    isOwner: boolean;
    loggedInUserId: string;
}

export default function BoardAddUsers({ boardId, owner, members, isOwner, loggedInUserId }: BoardAddUsersProps) {
    const [invitationLink, setInvitationLink] = useState('');

    const handleInvitationLinkChange = (newLink: string) => {
        setInvitationLink(newLink);
    };

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <Button size="sm" isIconOnly>
                    <IconUser size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2 w-64">
                    <h3 className='text-large font-semibold text-center mb-2'>Manage Users</h3>
                    <h4 className='font-semibold mb-1'>Current Users</h4>
                    <BoardAddUsersList owner={owner} members={members} boardId={boardId} isOwner={isOwner} loggedInUserId={loggedInUserId} />
                    <h4 className='font-semibold mb-1'>Add Users</h4>
                    <BoardAddUsersForm boardId={boardId} onInvitationLinkChange={handleInvitationLinkChange} isOwner={isOwner} />
                    {invitationLink && (
                        <>
                            <BoardAddUsersLink invitationLink={invitationLink} />
                            <p className='mt-1 text-xs text-red-500'>Note: emails are not currently sending, please share this link with the recipient.</p>
                        </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
