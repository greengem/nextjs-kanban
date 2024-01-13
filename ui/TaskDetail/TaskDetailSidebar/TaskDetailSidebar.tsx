import { ExpandedTask } from "@/types/types";
import TaskDetailAddToCard from "./TaskDetailAddToCard/TaskDetailAddToCard";
import TaskDetailActions from "./TaskDetailActions/TaskDetailActions";

export default function TaskDetailSidebar({ 
  task 
} : { 
  task: ExpandedTask 
}) {

  return (
    <div className='col-span-1'>
        <TaskDetailAddToCard task={task} />
        <TaskDetailActions selectedTask={task} boardId={task.column.boardId} />
    </div>
  );
}
