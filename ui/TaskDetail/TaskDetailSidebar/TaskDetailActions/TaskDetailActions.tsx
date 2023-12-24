import DeleteTaskForm from '@/ui/Forms/DeleteTaskForm';

export default function TaskDetailActions({
    selectedTask, boardId,
} : {
    selectedTask: any, boardId: string,
}) {
    return (
        <>
          <h4 className='text-sm text-zinc-500'>Actions</h4>
          <ul className='text-sm space-y-2'>
            <li className='bg-zinc-800 px-2 py-1 rounded-md'>
              <DeleteTaskForm 
                taskId={selectedTask.id} 
                boardId={boardId} 
                columnId={selectedTask.columnId}
              />
            </li>
          </ul>
        </>
    )
}