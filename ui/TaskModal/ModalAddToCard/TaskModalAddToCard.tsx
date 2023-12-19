import AddToCardLabels from '@/ui/TaskModal/ModalAddToCard/Labels/AddToCardLabels';
import { getLabelsForBoard } from "@/lib/FetchData";
import AddToCardDates from './AddToCardDates';
import { ExpandedTask } from '@/types/types';
import AddChecklist from './AddChecklist';

export default async function TaskModalAddToCard({ task } : { task: ExpandedTask }) {
    const labels = await getLabelsForBoard(task?.column.boardId);

    return (
        <>
            <h4 className='text-sm text-zinc-500'>Add to card</h4>
            <ul className='text-sm space-y-2'>
                {/*<li className='flex items-center gap-2 bg-zinc-800 px-2 py-2 rounded-md'><IconUser size={14} /> Members</li>*/}
                <AddToCardLabels labels={labels} task={task} boardId={task.column.boardId} />
                <AddChecklist taskId={task.id} boardId={task.column.boardId} />
                <AddToCardDates task={task} dateType="startDate" />
                <AddToCardDates task={task} dateType="dueDate" />
                {/*
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-2 rounded-md'><IconPaperclip size={14} /> Attachement</li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-2 rounded-md'><IconPaint size={14} /> Cover</li>
                */}
            </ul>
        </>
    )
}
