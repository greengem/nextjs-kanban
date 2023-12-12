import { ExpandedTask } from '@/types/types';
import EditTaskNameForm from '@/ui/Forms/EditTaskNameForm';
import { IconCards } from '@tabler/icons-react';
import { format } from 'date-fns';

export default function TaskModalTitle( {
    selectedTask, boardId
} : {
    selectedTask: ExpandedTask; boardId: string;
}) {
    return (
       <>
        <IconCards size={20} className='mt-1 w-5' />
            <div className='flex-col w-full pr-5'>
                <EditTaskNameForm taskId={selectedTask.id} title={selectedTask.title} boardId={boardId} />
                <div className='text-xs text-zinc-100 font-normal'>
                    <p>In list Col Name</p>
                    <p>Created on {format(new Date(selectedTask.createdAt), 'MMMM d, yyyy')} | Updated on {format(new Date(selectedTask.updatedAt), 'MMMM d, yyyy')}</p>
                    <p></p>
                </div>
            </div>
        </>
    )
}