'use client'
import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Input } from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import { handleSendBoardInvitation } from "@/actions/InvitationActions";
import toast from 'react-hot-toast';

export default function BoardAddUsers({ boardId } : {boardId: string}) {
    const [email, setEmail] = useState('');

    const handleInvite = async (e: any) => {
        e.preventDefault();
        if (!email) return;

        try {
            const response = await handleSendBoardInvitation({ boardId, userEmail: email });
            if (response.success) {
                toast.success(response.message);
                setEmail('');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Error sending invitation:', error);
            toast.error('An error occurred while sending the invitation.');
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
                </div>
            </PopoverContent>
        </Popover>
    )
}
