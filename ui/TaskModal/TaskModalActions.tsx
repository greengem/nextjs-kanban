import DeleteTaskForm from '@/ui/Forms/DeleteTaskForm';
import { IconArrowRight, IconTrash } from '@tabler/icons-react';

export default function TaskModalActions({
    selectedTask, boardId,
} : {
    selectedTask: any, boardId: string,
}) {
    return (
        <>
              <h4 className='text-sm text-zinc-500'>Actions</h4>
              <ul className='text-sm space-y-2'>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconArrowRight size={14} /> Move</li>
                <li className='bg-zinc-800 px-2 py-1 rounded-md'>
                  <DeleteTaskForm 
                    taskId={selectedTask.id} 
                    boardId={boardId} 
                    columnId={selectedTask.columnId}
                  />
                </li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconTrash size={14} /> Make Template</li>
              </ul>
        </>
    )
}