import TaskPage from "@/ui/TaskPage/TaskPage";

interface BoardProps {
  params: { id: string };
}

export default async function Task({ params }: BoardProps) {

  return <TaskPage taskId={params.id} />;
}
