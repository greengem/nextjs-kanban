import { getTask } from "@/lib/FetchData";
import { ExpandedTask } from "@/types/types";
import TaskDetailTitle from "./TaskDetailTitle/TaskModalTitle";
import TaskDetailSidebar from "./TaskDetailSidebar/TaskDetailSidebar";
import TaskDetailView from "./TaskDetailView/TaskDetailView";

export default async function TaskDetail({ taskId } : { taskId: string }) {
  const task: ExpandedTask | null = await getTask(taskId);

  if (!task) {
    return <div>Task not found or loading error</div>;
  }

  return (
    <>
      <TaskDetailTitle selectedTask={task} boardId={task?.column.boardId} />
      
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 p-5'>
        <TaskDetailView task={task} />
        <TaskDetailSidebar task={task} />
      </div>
    </>
  );
}
