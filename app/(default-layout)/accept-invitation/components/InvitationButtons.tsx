'use client'
import { useRouter } from 'next/navigation';
import { handleAcceptInvitation, handleRejectInvitation } from '@/actions/InvitationActions';
import { Button } from '@nextui-org/button';
import toast from 'react-hot-toast';

export default function InvitationButtons({ token, userId, boardId } : { token: string; userId: string, boardId: string }) {
    const router = useRouter();

    const handleAccept = async () => {
        try {
            const response = await handleAcceptInvitation({ token, userId });
            if (response.success) {   
                toast.success(response.message);
                router.push(`/board/${boardId}`);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to accept the invitation.');
            console.error('Error accepting invitation:', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await handleRejectInvitation({ token });
            if (response.success) {
                toast.success(response.message);
                router.push(`/board`);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to reject the invitation.');
            console.error('Error rejecting invitation:', error);
        }
    };

    return (
        <div className='flex justify-center items-center gap-2 my-5'>
            <Button color='primary' onClick={handleAccept}>Accept</Button>
            <Button onClick={handleReject}>Reject</Button>
        </div>
    );
}
