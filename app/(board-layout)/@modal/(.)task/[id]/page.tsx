import TaskPage from "@/ui/TaskPage/TaskPage";
import TaskModal from "@/ui//TaskModal/TaskModal";

interface BoardProps {
  params: { id: string };
}

export default async function Task({ params }: BoardProps) {

  return <TaskModal><TaskPage taskId={params.id} /></TaskModal>;
}
