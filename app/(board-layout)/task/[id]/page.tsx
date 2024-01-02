import TaskDetail from "@/ui/TaskDetail/TaskDetail";

interface BoardProps {
  params: { id: string };
}

export default async function Task({ params }: BoardProps) {
  return (<TaskDetail taskId={params.id} />);
}
