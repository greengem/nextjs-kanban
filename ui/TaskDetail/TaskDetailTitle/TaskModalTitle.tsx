import EditTaskNameForm from "@/ui/Forms/EditTaskNameForm";
import { IconCards } from "@tabler/icons-react";
import { format } from "date-fns";

export default function TaskDetailTitle({
  taskId,
  taskTitle,
  columnTitle,
  boardId,
  taskCreatedAt,
  taskUpdatedAt,
}: {
  taskId: string;
  taskTitle: string;
  columnTitle: string;
  boardId: string;
  taskCreatedAt: Date;
  taskUpdatedAt: Date;
}) {
  return (
    <div className="flex gap-3 p-5">
      <IconCards size={32} />

      <div className="flex-col w-full pr-5">
        <EditTaskNameForm taskId={taskId} title={taskTitle} boardId={boardId} />

        <div className="text-sm font-normal">
          <p>
            Created on {format(new Date(taskCreatedAt), "MMMM d, yyyy")} |
            Updated on {format(new Date(taskUpdatedAt), "MMMM d, yyyy")}
          </p>
          <p>
            In column <span className="text-primary">{columnTitle}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
