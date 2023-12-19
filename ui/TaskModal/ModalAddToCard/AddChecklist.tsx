import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { IconArrowLeft, IconCheckbox, IconX } from '@tabler/icons-react';

export default function AddChecklist() {
    return (
        <li className='flex items-center gap-2'>
            <Popover placement="bottom-start" triggerScaleOnOpen={false} backdrop='blur'>
                <PopoverTrigger>
                    <button className="px-2 py-2 bg-zinc-800 rounded-md flex w-full items-center gap-2"><IconCheckbox size={14} /> Checklist</button>
                </PopoverTrigger>
                <PopoverContent className='w-64'>
                    Coming soon
                </PopoverContent>
            </Popover>
        </li>
    )
}