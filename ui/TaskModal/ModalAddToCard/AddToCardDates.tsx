'use client'
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { IconCalendar } from '@tabler/icons-react';
import AddToCardDatesCalendar from "./AddToCardDatesCalendar";

export default function AddToCardDates({
    taskId, boardId, startDate, dueDate, dateType
} : {
    taskId: string; boardId: string; startDate: Date | null; dueDate: Date | null; dateType: 'startDate' | 'dueDate';
}) {
    return (
        <li className='bg-zinc-800 rounded-md'>
            <Popover placement="bottom-start" triggerScaleOnOpen={false}>
                <PopoverTrigger>
                    <button className='flex items-center gap-2 px-2 py-2 w-full'>
                        <IconCalendar size={14} /> {dateType === 'dueDate' ? 'Due Date' : 'Start Date'}
                    </button>
                </PopoverTrigger>
                <PopoverContent>
                    <AddToCardDatesCalendar taskId={taskId} boardId={boardId} startDate={startDate} dueDate={dueDate} dateType={dateType} />
                </PopoverContent>
            </Popover>
        </li>
    );
}
