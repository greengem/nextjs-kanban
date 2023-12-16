'use client'
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { IconCalendar } from '@tabler/icons-react';
import AddToCardDatesCalendar from "./AddToCardDatesCalendar";

export default function AddToCardDates({
    taskId, boardId, dueDate
} : {
    taskId: string; boardId: string; dueDate: Date | null;
}) {
    return (
        <>
            <li className='bg-zinc-800 rounded-md'>
                <Popover placement="bottom-start" triggerScaleOnOpen={false}>
                    <PopoverTrigger>
                        <button className='flex items-center gap-2 px-2 py-2 w-full'>
                            <IconCalendar size={14} /> Due Date
                        </button>
                    </PopoverTrigger>
                    
                    <PopoverContent>
                        <AddToCardDatesCalendar taskId={taskId} boardId={boardId} dueDate={dueDate} />
                    </PopoverContent>
                </Popover>
            </li>
        </>
    );
}
