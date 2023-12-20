'use client'
import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Input } from "@nextui-org/input";
import { IconArrowLeft, IconCheckbox, IconPlus, IconX } from '@tabler/icons-react';
import { Button } from "@nextui-org/button";
import { handleCreateChecklist } from "@/actions/ChecklistServerActions";
import toast from 'react-hot-toast';

export default function AddChecklist({
    taskId, boardId
} : {
    taskId: string, boardId: string;
}) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleSubmit = async () => {
        if (!title) {
            setError('Please provide a title.');
            return;
        }

        try {
            const response = await handleCreateChecklist({ title, taskId, boardId });
            if (response.success) {
                toast.success(response.message);
                closePopover();
            } else {
                toast.error(response.message);
            }
        } catch (e) {
            setError('An error occurred while creating the checklist.');
        }
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    return (
        <li className='flex items-center gap-2'>
            <Popover placement="bottom-start" triggerScaleOnOpen={false} backdrop='blur' isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger>
                    <button className="px-2 py-2 bg-zinc-800 rounded-md flex w-full items-center gap-2"><IconCheckbox size={14} /> Checklist</button>
                </PopoverTrigger>
                <PopoverContent className='w-64'>
                    <div className="px-1 py-2 w-full space-y-3">
                        <Input 
                            labelPlacement="outside" 
                            placeholder="Checklist title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                        <div className="flex gap-2">
                            <Button size="sm" color="primary" className="flex items-center" onClick={handleSubmit}><IconPlus size={16} />Create Checklist</Button>
                            <Button size="sm" onClick={closePopover}><IconX size={16} className="flex items-center" />Cancel</Button>
                        </div>
                        {error && <div className="text-red-500">{error}</div>}
                    </div>
                </PopoverContent>
            </Popover>
        </li>
    )
}
