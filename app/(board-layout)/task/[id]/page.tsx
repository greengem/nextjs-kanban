import TaskPage from "@/ui/TaskPage/TaskPage";

interface BoardProps {
  params: { id: string };
}

export default async function Task({ params }: BoardProps) {

  return (
    <div className="bg-zinc-900">
      <TaskPage taskId={params.id} />
    </div>
  );
}
