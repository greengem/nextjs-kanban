'use client'
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { IconCalendar } from '@tabler/icons-react';
import AddToCardDatesCalendar from "./AddToCardDatesCalendar";

export default function AddToCardDates({
    task, dateType
} : {
    task: any; dateType: 'startDate' | 'dueDate';
}) {
    return (
        <li className='bg-zinc-200 rounded-md'>
            <Popover placement="bottom-start" triggerScaleOnOpen={false} backdrop='blur'>
                <PopoverTrigger>
                    <button className='flex items-center gap-2 px-2 py-2 w-full'>
                        <IconCalendar size={14} /> {dateType === 'dueDate' ? 'Due Date' : 'Start Date'}
                    </button>
                </PopoverTrigger>
                <PopoverContent>
                    <AddToCardDatesCalendar task={task} dateType={dateType} />
                </PopoverContent>
            </Popover>
        </li>
    );
}
