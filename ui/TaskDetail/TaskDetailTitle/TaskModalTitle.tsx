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
    <div className='flex gap-3 p-5'>

        <IconCards size={32} />

        <div className='flex-col w-full pr-5'>

            <EditTaskNameForm taskId={selectedTask.id} title={selectedTask.title} boardId={boardId} />
            
            <div className='text-sm font-normal'>
                <p>Created on {format(new Date(selectedTask.createdAt), 'MMMM d, yyyy')} | Updated on {format(new Date(selectedTask.updatedAt), 'MMMM d, yyyy')}</p>
                <p>In column <span className='text-primary'>{selectedTask.column.title}</span></p>
            </div>

        </div>

    </div>
    )
}