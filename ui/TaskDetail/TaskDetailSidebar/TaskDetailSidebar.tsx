import { ExpandedTask } from "@/types/types";
import TaskModalAddToCard from "./TaskDetailAddToCard/TaskModalAddToCard";
import TaskModalActions from "@/ui/TaskModal/TaskModalActions";

export default function TaskDetailSidebar({ 
  task 
} : { 
  task: ExpandedTask 
}) {

  return (
    <div className='col-span-1 space-y-2'>
        <TaskModalAddToCard task={task} />
        <TaskModalActions selectedTask={task} boardId={task.column.boardId} />
    </div>
  );
}
