import TaskDetailTitle from "./TaskDetailTitle/TaskModalTitle";
import TaskDetailSidebar from "./TaskDetailSidebar/TaskDetailSidebar";
import TaskDetailView from "./TaskDetailView/TaskDetailView";

export default async function TaskDetail({ task }: { task: any }) {
  return (
    <>
      <TaskDetailTitle selectedTask={task} boardId={task?.column.boardId} />

      <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:p-5 gap-x-5">
        <TaskDetailView task={task} />
        <TaskDetailSidebar task={task} />
      </div>
    </>
  );
}
