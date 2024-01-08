import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import toast from 'react-hot-toast';
import { IconCopy } from "@tabler/icons-react";

const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.success('Link copied to clipboard');
    } catch (error) {
        toast.error('Failed to copy link');
    }
};

export default function BoardAddUsersLink({ invitationLink } : { invitationLink: string }) {
    return (
        <div className='mt-5'>
            <div className='flex gap-2'>
                <Input variant='bordered' className='grow' labelPlacement='outside' size='sm' isReadOnly value={invitationLink} />
                <Button size='sm' isIconOnly color='primary' onClick={() => copyToClipboard(invitationLink)}><IconCopy size={16} /></Button>
            </div>
        </div>
    )
}