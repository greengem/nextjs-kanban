import { auth } from "@/auth";
import { getTask } from "@/lib/FetchData";
import { ExpandedTask } from "@/types/types";
import TaskModalTitle from "@/ui/TaskModal/TaskModalTitle";
import TaskModalDescription from "@/ui/TaskModal/TaskModalDescription";
import TaskModalActivity from "@/ui/TaskModal/TaskModalActivity";
import TaskModalAddToCard from "../TaskModal/TaskModalAddToCard";
import TaskModalActions from "@/ui/TaskModal/TaskModalActions";
import { format } from 'date-fns';

export default async function TaskPage({ 
    taskId 
} : {
    taskId: string
}) {
  const task: ExpandedTask | null = await getTask(taskId);

  if (!task) {
    return <div>Task not found or loading error</div>;
  }
  
  const session = await auth();

  return (
    <>
      <div className='flex gap-3 p-5 border-b-1 border-zinc-800'>
        <TaskModalTitle selectedTask={task} boardId={task?.column.boardId} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 p-5'>
        <div className='col-span-3 space-y-5'>
          <div>Start date: {task.startDate ? format(new Date(task.startDate), 'MMMM dd, yyyy') : 'No start date'}</div>
          <div>Due date: {task.dueDate ? format(new Date(task.dueDate), 'MMMM dd, yyyy') : 'No due date'}</div>
          <TaskModalDescription selectedTask={task} boardId={task.column.boardId} />
          <TaskModalActivity task={task} session={session} />
        </div>

        <div className='col-span-1 space-y-2'>
          <TaskModalAddToCard task={task} />
          <TaskModalActions selectedTask={task} boardId={task.column.boardId} />
        </div>

      </div>
    </>
  );
}
