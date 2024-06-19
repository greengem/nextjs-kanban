"use client";
import { useState } from "react";
import { toast } from "sonner";
import { handleCreateTask } from "@/server-actions/TaskServerActions";
import { TaskCreationData } from "@/types/types";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" isIconOnly aria-label="Close form" onClick={onClick}>
      <IconX size={16} />
    </Button>
  );
}

export default function CreateTaskForm({
  boardId,
  columnId,
}: {
  boardId: string;
  columnId: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TaskCreationData>({
    boardId,
    columnId,
    taskTitle: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await handleCreateTask(formData);

    if (response.success) {
      toast.success("Task Created");
      setFormData({ ...formData, taskTitle: "" });
      setIsEditing(false);
      setError(null);
    } else {
      toast.error(response.message);
      setError(response.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <hr className="border-zinc-800 mb-3" />
          <div className="mb-2">
            <Input
              autoFocus
              autoComplete="off"
              type="text"
              id={`taskTitle_${boardId}_${columnId}`}
              placeholder="Enter a name for your task..."
              name="taskTitle"
              value={formData.taskTitle}
              onChange={handleChange}
              isInvalid={!!error}
              errorMessage={error}
              isRequired
              size="sm"
              label="Task Title"
            />
          </div>

          <input type="hidden" name="boardId" value={formData.boardId} />
          <input type="hidden" name="columnId" value={formData.columnId} />

          <div className="flex justify-between items-center gap-2">
            <Button type="submit" isLoading={isSubmitting} className="grow">
              <IconPlus size={14} />
              <span>Create Task</span>
            </Button>

            <CloseButton onClick={toggleEdit} />
          </div>
        </form>
      ) : (
        <button
          onClick={toggleEdit}
          className="text-sm flex items-center gap-2 w-full"
        >
          <IconPlus size={16} />
          Add a task
        </button>
      )}
    </div>
  );
}
