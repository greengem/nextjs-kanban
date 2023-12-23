import { ExpandedTask } from '@/types/types';
import EditTaskNameForm from '@/ui/Forms/EditTaskNameForm';
import { IconCards } from '@tabler/icons-react';
import { format } from 'date-fns';

export default function TaskDetailTitle( {
    selectedTask, boardId
} : {
    selectedTask: ExpandedTask; boardId: string;
}) {
    return (
    <div className='flex gap-3 p-5 border-b-1 border-zinc-800'>

        <IconCards size={32} />

        <div className='flex-col w-full pr-5'>

            <EditTaskNameForm taskId={selectedTask.id} title={selectedTask.title} boardId={boardId} />
            
            <div className='text-xs text-zinc-100 font-normal'>
                <p>In list <span className='text-primary'>{selectedTask.column.title}</span></p>
                <p className='text-zinc-500'>Created on {format(new Date(selectedTask.createdAt), 'MMMM d, yyyy')} | Updated on {format(new Date(selectedTask.updatedAt), 'MMMM d, yyyy')}</p>
            </div>

        </div>

    </div>
    )
}