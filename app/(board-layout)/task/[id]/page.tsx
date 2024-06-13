import TaskDetail from "@/ui/TaskDetail/TaskDetail";
import TaskDetailWrapper from "./ui/TaskDetailWrapper";
import FetchTask from "@/app/(board-layout)/task/[id]/FetchTask";
import TaskBackButton from "./ui/TaskBackButton";

interface BoardProps {
  params: { id: string };
}

export default async function Task({ params }: BoardProps) {
  const taskId = params.id;
  const task = await FetchTask({ taskId });

  if (!task) {
    return (
      <main className="flex flex-col grow bg-zinc-900">
        <div className="p-3 md:p-5 flex flex-col grow relative">
          <div>Task not found or access denied.</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col grow bg-zinc-900">
      <div className="p-3 md:p-5 flex flex-col grow relative">
        <TaskDetailWrapper>
          <TaskBackButton boardId={task.column.boardId} />
          <TaskDetail task={task} />
        </TaskDetailWrapper>
      </div>
    </main>
  );
}
