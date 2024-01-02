import TaskDetail from "@/ui/TaskDetail/TaskDetail";

interface BoardProps {
  params: { id: string };
}

export default async function Task({ params }: BoardProps) {

  return (
    <>
      <div className="flex flex-col grow bg-zinc-100 backdrop-blur-sm py-5">
        <TaskDetail taskId={params.id} />
      </div>
    </>
  );
}
