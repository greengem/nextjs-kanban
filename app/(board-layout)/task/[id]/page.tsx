import TaskDetail from "@/ui/TaskDetail/TaskDetail";

interface BoardProps {
  params: { id: string };
}

export default async function Task({ params }: BoardProps) {

  return (
    <>
      <div className="bg-zinc-900/80 backdrop-blur-sm h-full">
        <TaskDetail taskId={params.id} />
      </div>
    </>
  );
}
