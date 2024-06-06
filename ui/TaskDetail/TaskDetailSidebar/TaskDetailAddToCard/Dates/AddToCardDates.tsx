'use client'
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { IconCalendar } from '@tabler/icons-react';
import AddToCardDatesCalendar from "./AddToCardDatesCalendar";

export default function AddToCardDates({ task } : { task: any }) {
    return (
        <li className='bg-zinc-900 hover:bg-zinc-800 ring-zinc-800 rounded-md ring-2  hover:ring-primary'>
            <Popover placement="left-start" triggerScaleOnOpen={false}>
                <PopoverTrigger>
                    <button className='flex items-center gap-2 px-2 py-2 w-full'>
                        <IconCalendar size={14} /> Dates
                    </button>
                </PopoverTrigger>
                <PopoverContent>
                    <AddToCardDatesCalendar task={task} />
                </PopoverContent>
            </Popover>
        </li>
    );
}
