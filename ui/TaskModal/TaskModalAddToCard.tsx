import { IconCalendar, IconCheckbox, IconPaint, IconPaperclip, IconTag, IconUser } from '@tabler/icons-react';

export default function TaskModalAddToCard() {
    return (
        <>
            <h4 className='text-sm text-zinc-500'>Add to card</h4>
            <ul className='text-sm space-y-2'>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconUser size={14} /> Members</li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconTag size={14} /> Labels</li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconCheckbox size={14} /> Checklist</li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconCalendar size={14} /> Dates</li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconPaperclip size={14} /> Attachement</li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconPaint size={14} /> Cover</li>
            </ul>
        </>
    )
}