import { getTask } from "@/lib/FetchData";
import { ExpandedTask } from "@/types/types";
import TaskDetailTitle from "./TaskDetailTitle/TaskModalTitle";
import TaskDetailSidebar from "./TaskDetailSidebar/TaskDetailSidebar";
import TaskDetailView from "./TaskDetailView/TaskDetailView";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";

export default async function TaskDetail({ taskId } : { taskId: string }) {
  const task: ExpandedTask | null = await getTask(taskId);

  if (!task) {
    return <div>Task not found or loading error</div>;
  }

  return (
    <>
      <div className="mx-5">
        <Button 
          as={Link} 
          href={`/board/${task.column?.boardId}`} 
          size="sm" 
          startContent={<IconArrowLeft size={18} />}
        >
          Back to board
        </Button>
      </div>

      <TaskDetailTitle selectedTask={task} boardId={task?.column.boardId} />
      
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 p-5'>
        <TaskDetailView task={task} />
        <TaskDetailSidebar task={task} />
      </div>
    </>
  );
}
