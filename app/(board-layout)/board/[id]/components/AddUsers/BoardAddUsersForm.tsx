import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import toast from 'react-hot-toast';
import { handleSendBoardInvitation } from "@/actions/InvitationActions";

export default function BoardAddUsersForm({ boardId, isOwner, onInvitationLinkChange }: { boardId: string, isOwner: boolean, onInvitationLinkChange: (link: string) => void }) {
    const [email, setEmail] = useState('');

    const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return;
    
        try {
            const response = await handleSendBoardInvitation({ boardId, userEmail: email });
            if (response.success && response.invitationLink) {
                onInvitationLinkChange(response.invitationLink);
                toast.success('Invitation link created');
            } else {
                toast.error(response.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error creating invitation:', error);
            toast.error('An error occurred while creating the invitation.');
        }
    };

    if (isOwner) {
        return (
            <form className="space-y-2" onSubmit={handleInvite}>
                <Input 
                    autoComplete="off"
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
        );
    } else {
        return <p className='text-danger'>Only board owners can invite new users.</p>;
    }
}
