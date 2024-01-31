import TaskDetail from "@/ui/TaskDetail/TaskDetail";
import TaskModal from "@/ui/TaskModal";

interface BoardProps {
  params: { id: string };
}

export default async function Task({ params }: BoardProps) {

  return <TaskModal><TaskDetail taskId={params.id} /></TaskModal>;
}
