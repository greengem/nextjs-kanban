import { DetailedTask } from "@/types/types";
import DeleteTaskForm from "@/ui/Forms/DeleteTaskForm";

export default function TaskDetailActions({ task }: { task: DetailedTask }) {
  return (
    <>
      <h4 className="text-sm text-zinc-700 font-semibold mb-1">Actions</h4>
      <ul className="text-sm space-y-2">
        <li className="px-2 py-2 rounded-md bg-danger text-white">
          <DeleteTaskForm
            taskId={task.id}
            boardId={task.column.boardId}
            columnId={task.columnId}
          />
        </li>
      </ul>
    </>
  );
}
