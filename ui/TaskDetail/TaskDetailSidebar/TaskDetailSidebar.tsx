import { DetailedTask } from "@/types/types";
import TaskDetailAddToCard from "./TaskDetailAddToCard/TaskDetailAddToCard";
import TaskDetailActions from "./TaskDetailActions/TaskDetailActions";

export default function TaskDetailSidebar({ task }: { task: DetailedTask }) {
  return (
    <div className="col-span-1">
      <TaskDetailAddToCard task={task} />
      <TaskDetailActions task={task} />
    </div>
  );
}
