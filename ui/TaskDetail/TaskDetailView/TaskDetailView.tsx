import { auth } from "@/auth";
import { DetailedTask } from "@/types/types";
import TaskDetailDescription from "./Description/TaskDetaillDescription";
import TaskDetailActivity from "./Activity/TaskDetailActivity";
import TaskDetailChecklist from "./Checklist/TaskDetailChecklist";
import TaskDetailDates from "./Dates/TaskDetailDates";
import TaskDetailLabels from "./Labels/TaskDetailLabels";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";

export default async function TaskDetailView({ task }: { task: DetailedTask }) {
  const session = await auth();

  return (
    <div className="col-span-3">
      {/* 
      todo: add AvatarGroup component
      <AvatarGroup isBordered>
        {task.assignedUsers.map((assignment) => (
          <Avatar
            key={assignment.user.id}
            showFallback
            name={assignment.user.name || "Unknown"}
            src={assignment.user.image || undefined}
            isBordered
          />
        ))}
      </AvatarGroup> */}

      <TaskDetailLabels labels={task.labels} />
      <TaskDetailDates startDate={task.startDate} dueDate={task.dueDate} />
      <TaskDetailDescription
        taskDescription={task.description}
        taskId={task.id}
        boardId={task.column.boardId}
      />
      <TaskDetailChecklist taskId={task.id} checklists={task.checklists} />
      <TaskDetailActivity
        taskId={task.id}
        boardId={task.column.boardId}
        activities={task.activities}
        columnTitle={task.column.title}
        userName={session?.user?.name ?? null}
        userImage={session?.user?.image ?? null}
      />
    </div>
  );
}
