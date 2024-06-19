"use client";
import { useState } from "react";
import { toast } from "sonner";
import { handleEditTask } from "@/server-actions/TaskServerActions";
import { TaskEditData } from "@/types/types";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function EditTaskNameForm({
  title,
  taskId,
  boardId,
}: {
  title: string;
  taskId: string;
  boardId: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TaskEditData>({
    id: taskId,
    boardId,
    title,
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

    const response = await handleEditTask(formData);

    if (response.success) {
      toast.success(response.message);
      setIsEditing(false);
      setError(null);
    } else {
      toast.error(response.message);
      setError(response.message);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={formData.id} />
      <input type="hidden" name="boardId" value={formData.boardId} />

      {!isEditing ? (
        <div className="flex justify-between">
          <span
            onClick={toggleEdit}
            className="cursor-pointer w-full text-3xl font-semibold"
          >
            {title}
          </span>
        </div>
      ) : (
        <div>
          <Input
            autoComplete="off"
            autoFocus
            isRequired
            label="Task Name"
            placeholder="Enter a name for your task"
            type="text"
            className="mb-2"
            name="title"
            value={formData.title}
            onChange={handleChange}
            isInvalid={!!error}
            errorMessage={error}
          />
          <div className="flex gap-1">
            <Button
              type="submit"
              size="sm"
              isLoading={isSubmitting}
              className="shrink-0 grow-0"
            >
              <IconDeviceFloppy size={16} />
              Save Title
            </Button>

            <Button
              isIconOnly
              size="sm"
              color="danger"
              onClick={toggleEdit}
              type="button"
            >
              <IconX size={20} />
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
