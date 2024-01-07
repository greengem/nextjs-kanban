'use client'
import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Input } from "@nextui-org/react";
import { IconCopy, IconMinus, IconUser } from "@tabler/icons-react";
import { handleSendBoardInvitation, handleRemoveUserFromBoard } from "@/actions/InvitationActions";
import toast from 'react-hot-toast';
import { Avatar } from "@nextui-org/avatar";
import { BoardMemberSummary } from "@/types/types";

interface BoardUsersProps {
    boardId: string;
    boardMembers: BoardMemberSummary[];
}

export default function BoardAddUsers({ boardId, boardMembers } : BoardUsersProps) {
    const owner = boardMembers.find(member => member.role === 'owner')?.user;
    const members = boardMembers.filter(member => member.role === 'member').map(member => member.user);

    const [email, setEmail] = useState('');
    const [invitationLink, setInvitationLink] = useState('');

    const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return;
    
        try {
            const response = await handleSendBoardInvitation({ boardId, userEmail: email });
            if (response.success && response.invitationLink) {
                setInvitationLink(response.invitationLink);
                toast.success('Invitation link created');
            } else {
                toast.error(response.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error creating invitation:', error);
            toast.error('An error occurred while creating the invitation.');
        }
    };

    const handleRemoveUser = async (userId: string) => {
        if (!confirm("Are you sure you want to remove this user?")) return;
        
        try {
            const response = await handleRemoveUserFromBoard({ boardId, userId });
            if (response.success) {
                toast.success('User removed successfully');
                // Optionally, update the boardMembers state to reflect the change
            } else {
                toast.error(response.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error removing user:', error);
            toast.error('An error occurred while removing the user.');
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Link copied to clipboard');
        } catch (error) {
            toast.error('Failed to copy link');
        }
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

                    <ul className='mb-5'>
                    {owner && (
                        <li className='flex gap-2 items-center border-b-1 border-zinc-300 last:border-b-0 py-1'>
                            <Avatar className='shrink-0 grow-0' showFallback name={owner.name || ''}  src={owner.image || undefined}  />
                            <div className='grow'>
                                <p>{owner.name || ''}</p>
                                <p className='text-xs'>Owner</p>
                            </div>
                        </li>
                    )}
                    {members.map(member => (
                        <li key={member.id}  className='flex gap-2 items-center border-b-1 border-zinc-300 last:border-b-0 py-1'>
                            <Avatar className='shrink-0 grow-0' showFallback name={member.name || ''}  src={member.image || undefined}  />
                            <div className='grow'>
                                <p>{member.name || ''}</p>
                                <p className='text-xs'>Member</p>
                            </div>
                            <Button size='sm' isIconOnly onClick={() => handleRemoveUser(member.id)}><IconMinus size={16} /></Button>
                        </li>
                    ))}
                    </ul>

                    <form className="space-y-2" onSubmit={handleInvite}>
                        <Input 
                            type="email" 
                            variant='bordered'
                            size="sm" 
                            label="Email" 
                            placeholder="Invite by email address" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <Button className='w-full' size="sm" type="submit" color='primary'>Send invite</Button>
                    </form>
                    {invitationLink && (
                        <div className='mt-5'>
                            <div className='flex gap-2'>
                                <Input variant='bordered' className='grow' labelPlacement='outside' size='sm' isReadOnly value={invitationLink} />
                                <Button size='sm' isIconOnly color='primary' onClick={() => copyToClipboard(invitationLink)}><IconCopy size={16} /></Button>
                            </div>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
