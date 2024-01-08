'use client'
import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { IconUser } from "@tabler/icons-react";
import { BoardMemberSummary } from "@/types/types";
import BoardAddUsersList from './BoardAddUsersList';
import BoardAddUsersLink from './BoardAddUsersLink';
import BoardAddUsersForm from './BoardAddUsersForm';

interface BoardUsersProps {
    boardId: string;
    boardMembers: BoardMemberSummary[];
}

export default function BoardAddUsers({ boardId, boardMembers } : BoardUsersProps) {
    const [invitationLink, setInvitationLink] = useState('');

    const handleInvitationLinkChange = (newLink: string) => {
        setInvitationLink(newLink);
    };

    return (
        <Popover placement="bottom" backdrop="blur">
            <PopoverTrigger>
                <Button size="sm" isIconOnly>
                    <IconUser size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2 min-w-64">
                    <h3 className='text-large font-semibold text-center mb-2'>Board Users</h3>
                    <BoardAddUsersList boardMembers={boardMembers} boardId={boardId} />
                    <BoardAddUsersForm boardId={boardId} onInvitationLinkChange={handleInvitationLinkChange} />
                    {invitationLink && (
                        <BoardAddUsersLink invitationLink={invitationLink} />
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
