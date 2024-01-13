import DeleteTaskForm from '@/ui/Forms/DeleteTaskForm';

export default function TaskDetailActions({
    selectedTask, boardId,
} : {
    selectedTask: any, boardId: string,
}) {
    return (
        <>
          <h4 className='text-sm text-zinc-700 font-semibold mb-1'>Actions</h4>
          <ul className='text-sm space-y-2'>
            <li className='px-2 py-2 rounded-md bg-danger text-white'>
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