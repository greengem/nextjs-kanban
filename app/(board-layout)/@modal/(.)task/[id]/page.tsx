import TaskBackButtonModal from "@/app/(board-layout)/task/[id]/ui/TaskBackButtonModal";
import TaskDetailWrapper from "@/app/(board-layout)/task/[id]/ui/TaskDetailWrapper";
import TaskDetail from "@/ui/TaskDetail/TaskDetail";
import TaskModal from "@/ui/TaskModal";
import FetchTask from "@/app/(board-layout)/task/[id]/FetchTask";

interface BoardProps {
  params: { id: string };
}

export default async function Task({ params }: BoardProps) {
  const taskId = params.id;
  const task = await FetchTask({ taskId });

  if (!task) {
    return (
      <TaskModal>
        <TaskDetailWrapper>
          <div>Task not found or access denied.</div>
        </TaskDetailWrapper>
      </TaskModal>
    );
  }

  return (
    <TaskModal>
      <TaskDetailWrapper>
        <TaskBackButtonModal />
        <TaskDetail task={task} />
      </TaskDetailWrapper>
    </TaskModal>
  );
}
