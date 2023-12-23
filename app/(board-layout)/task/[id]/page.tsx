import TaskDetail from "@/ui/TaskDetail/TaskDetail";

interface BoardProps {
  params: { id: string };
}

export default async function Task({ params }: BoardProps) {

  return (
    <div className="bg-zinc-950">
      <TaskDetail taskId={params.id} />
    </div>
  );
}
