import TaskDetail from "@/ui/TaskDetail/TaskDetail";

interface BoardProps {
  params: { id: string };
}

export default async function Task({ params }: BoardProps) {

  return (
    <>
      <div className="bg-zinc-100 backdrop-blur-sm h-full py-5">
        <TaskDetail taskId={params.id} />
      </div>
    </>
  );
}
