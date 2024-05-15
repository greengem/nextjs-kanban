import TaskDetail from "@/ui/TaskDetail/TaskDetail";

interface BoardProps {
  params: { id: string };
}

export default async function Task({ params }: BoardProps) {
  return (
    <main className="flex flex-col grow bg-zinc-900">
      <div className='p-3 md:p-5 flex flex-col grow relative'>
        <TaskDetail taskId={params.id} />
      </div>
    </main>
    );
}
