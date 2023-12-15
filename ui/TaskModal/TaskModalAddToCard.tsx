import { IconCalendar, IconCheckbox, IconPaint, IconPaperclip, IconTag, IconUser } from '@tabler/icons-react';
import TaskModalLabelAddToCard from './ModalAddToCard/TaskModalLabelAddToCard';
import { getLabelsForBoard } from "@/lib/FetchData";

export default async function TaskModalAddToCard({ 
    task 
} : {
    task: any;
}) {
    const labels = await getLabelsForBoard(task?.column.boardId);

    return (
        <>
            <h4 className='text-sm text-zinc-500'>Add to card</h4>
            <ul className='text-sm space-y-2'>
                {/*<li className='flex items-center gap-2 bg-zinc-800 px-2 py-2 rounded-md'><IconUser size={14} /> Members</li>*/}
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-2 rounded-md'>
                    <TaskModalLabelAddToCard 
                        labels={labels} 
                        taskId={task.id}
                        boardId={task.column.boardId}
                    />
                </li>
                {/*<li className='flex items-center gap-2 bg-zinc-800 px-2 py-2 rounded-md'><IconCheckbox size={14} /> Checklist</li>*/}
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-2 rounded-md'><IconCalendar size={14} /> Dates</li>
                {/*
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-2 rounded-md'><IconPaperclip size={14} /> Attachement</li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-2 rounded-md'><IconPaint size={14} /> Cover</li>
                */}
            </ul>
        </>
    )
}