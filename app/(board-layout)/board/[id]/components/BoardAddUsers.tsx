'use client'
import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Input } from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import { handleSendBoardInvitation } from "@/actions/InvitationActions";
import toast from 'react-hot-toast';

export default function BoardAddUsers({ boardId } : { boardId: string }) {
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

    return (
        <Popover placement="bottom" backdrop="blur">
            <PopoverTrigger>
                <Button size="sm" isIconOnly>
                    <IconPlus size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <h4 className="text-small font-bold mb-2">Invite users to this board</h4>
                    <form className="space-y-2" onSubmit={handleInvite}>
                        <Input 
                            type="email" 
                            size="sm" 
                            label="Email" 
                            placeholder="Enter an email address" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <Button size="sm" color="primary" type="submit">Send invite</Button>
                    </form>
                    {invitationLink && (
                        <div>
                            <p>Copy this invitation link:</p>
                            <Input readOnly value={invitationLink} />
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
