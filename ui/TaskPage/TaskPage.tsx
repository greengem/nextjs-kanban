import { auth } from "@/auth";
import { getTask } from "@/lib/FetchData";
import { ExpandedTask } from "@/types/types";

import TaskModalTitle from "@/ui/TaskModal/TaskModalTitle";
import TaskModalDescription from "@/ui/TaskModal/TaskModalDescription";
import TaskModalActivity from "@/ui/TaskModal/TaskModalActivity";
import TaskModalAddToCard from "@/ui/TaskModal/TaskModalAddToCard";
import TaskModalActions from "@/ui/TaskModal/TaskModalActions";
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
      <div className='flex gap-2 bg-primary p-5'>
        <TaskModalTitle selectedTask={task} boardId={task?.column.boardId} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 p-5'>
        <div className='col-span-3 space-y-5'>
          <TaskModalDescription selectedTask={task} boardId={task.column.boardId} />
          <TaskModalActivity
            activities={task.activities} 
            taskId={task.id}
            boardId={task.column.boardId}
            columnTitle={task.column.title}
            session={session} 
          />
        </div>

        <div className='col-span-1 space-y-2'>
          <TaskModalAddToCard />
          <TaskModalActions selectedTask={task} boardId={task.column.boardId} />
        </div>

      </div>
    </>
  );
}
