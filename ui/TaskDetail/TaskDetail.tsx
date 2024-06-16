import TaskDetailTitle from "./TaskDetailTitle/TaskModalTitle";
import TaskDetailSidebar from "./TaskDetailSidebar/TaskDetailSidebar";
import TaskDetailView from "./TaskDetailView/TaskDetailView";
import { DetailedTask } from "@/types/types";

export default async function TaskDetail({ task }: { task: DetailedTask }) {
  return (
    <>
      <TaskDetailTitle
        taskId={task.id}
        taskTitle={task.title}
        columnTitle={task.column.title}
        boardId={task.column.boardId}
        taskCreatedAt={task.createdAt}
        taskUpdatedAt={task.updatedAt}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:p-5 gap-x-5">
        <TaskDetailView task={task} />
        <TaskDetailSidebar task={task} />
      </div>
    </>
  );
}
