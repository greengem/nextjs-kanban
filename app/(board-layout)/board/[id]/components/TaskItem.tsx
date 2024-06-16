"use client";
import { format } from "date-fns";
import {
  IconClock,
  IconFileDescription,
  IconGripVertical,
} from "@tabler/icons-react";
import Link from "next/link";
import { useMemo } from "react";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { BoardTask } from "@/types/types";

interface TaskItemProps {
  task: BoardTask;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
}

export default function TaskItem({ task, dragHandleProps }: TaskItemProps) {
  const renderDateInfo = useMemo(() => {
    const startDate = task.startDate
      ? format(new Date(task.startDate), "d MMM")
      : null;
    const dueDate = task.dueDate
      ? format(new Date(task.dueDate), "d MMM")
      : null;

    if (startDate && dueDate) {
      return `${startDate} - ${dueDate}`;
    } else if (startDate) {
      return `Started: ${startDate}`;
    } else if (dueDate) {
      return dueDate;
    } else {
      return null;
    }
  }, [task.startDate, task.dueDate]);

  const showInfo = useMemo(() => {
    return (
      task.description ||
      task.startDate ||
      task.dueDate ||
      task.assignedUsers.length > 0
    );
  }, [
    task.description,
    task.startDate,
    task.dueDate,
    task.assignedUsers.length,
  ]);

  return (
    <div className="bg-zinc-900 text-white flex select-none rounded-md hover:shadow-md hover:ring-2 hover:ring-primary">
      <div
        className="pl-1 pr-1 flex items-center cursor-grab touch-none"
        {...dragHandleProps}
      >
        <IconGripVertical className="text-primary" size={24} />
      </div>

      <Link className="flex-grow pr-3 py-2" href={`/task/${task.id}`}>
        {task.labels.length > 0 && (
          <div className="grid grid-cols-5 gap-1 w-full mb-1">
            {task.labels.map((label) => (
              <span
                key={label.id}
                className={`bg-${label.color}-500 text-xs h-2 w-full rounded-full`}
              />
            ))}
          </div>
        )}

        <div className="text-sm cursor-pointer">{task.title}</div>

        {showInfo && (
          <div className="flex gap-3 items-center justify-between mt-1">
            <div className="flex gap-3 items-center">
              {renderDateInfo && (
                <div className="flex items-center gap-1 text-xs text-zinc-400">
                  <IconClock size={14} /> {renderDateInfo}
                </div>
              )}

              {task.description && (
                <div className="text-zinc-500">
                  <IconFileDescription size={14} />
                </div>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mt-3">
          {task.assignedUsers.length > 0 ? (
            <AvatarGroup size="sm">
              {task.assignedUsers.map((assignment) => (
                <Avatar
                  key={assignment.user.id}
                  showFallback
                  name={assignment.user.name || "Unknown"}
                  src={assignment.user.image || undefined}
                />
              ))}
            </AvatarGroup>
          ) : (
            <div />
          )}
          <div className="flex gap-x-1">
            <Chip color="primary" size="sm">
              Hi!
            </Chip>
            <Chip size="sm">Hi!</Chip>
          </div>
        </div>
      </Link>
    </div>
  );
}
