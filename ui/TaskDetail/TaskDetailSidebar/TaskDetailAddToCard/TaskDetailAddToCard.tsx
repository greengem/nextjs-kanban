import { ExpandedTask } from '@/types/types';
import { getLabelsForBoard } from "@/lib/FetchData";
import AddToCardLabels from "./Labels/AddToCardLabels";
import AddToCardDates from "./Dates/AddToCardDates";
import AddChecklist from "./Checklist/AddChecklist";

export default async function TaskDetailAddToCard({ task } : { task: ExpandedTask }) {
    const labels = await getLabelsForBoard(task?.column.boardId);

    return (
        <div className='mb-5'>
            <h4 className='text-sm text-zinc-700 font-semibold mb-1'>Add to card</h4>
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
        </div>
    )
}
