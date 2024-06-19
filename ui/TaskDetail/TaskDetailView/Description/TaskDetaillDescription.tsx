"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconTextPlus } from "@tabler/icons-react";
import {
  handleEditTaskDescription,
  handleDeleteTaskDescription,
} from "@/server-actions/DescriptionServerActions";
import TaskDetailItemHeading from "../ui/TaskDetailItemHeading";
import TaskDetailItemContent from "../ui/TaskDetailItemContent";

export default function TaskDetailDescription({
  taskId,
  taskDescription,
  boardId,
}: {
  taskId: string;
  taskDescription: string | null;
  boardId: string;
}) {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [formData, setFormData] = useState({
    id: taskId,
    boardId,
    description: taskDescription || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleEditDescription = () =>
    setIsEditingDescription(!isEditingDescription);

  const handleValueChange = (value: string) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await handleEditTaskDescription(
      formData.id,
      formData.boardId,
      formData.description,
    );

    if (response.success) {
      toast.success("Description Updated");
      setIsEditingDescription(false);
      setError(null);
    } else {
      toast.error(response.message);
      setError(response.message);
    }

    setIsSubmitting(false);
  };

  const handleDeleteDescription = async () => {
    setIsDeleting(true);

    const response = await handleDeleteTaskDescription(taskId, boardId);

    if (response.success) {
      toast.success(response.message);
      setIsEditingDescription(false);
      setFormData({ id: taskId, boardId, description: "" });
      setError(null);
    } else {
      toast.error(response.message);
      setError(response.message);
    }

    setIsDeleting(false);
  };

  return (
    <>
      <TaskDetailItemHeading
        title="Description"
        icon={<IconTextPlus size={32} />}
      />
      <TaskDetailItemContent indented>
        {!isEditingDescription ? (
          <p onClick={toggleEditDescription} className="cursor-pointer">
            {taskDescription ? (
              taskDescription
            ) : (
              <span className="text-primary">Add a description</span>
            )}
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={formData.id} />
            <input type="hidden" name="boardId" value={formData.boardId} />
            <Textarea
              placeholder="Enter your description"
              autoFocus
              label="Description"
              value={formData.description}
              onValueChange={handleValueChange}
              isInvalid={!!error}
              errorMessage={error}
              className="w-full mb-2 mt-1 border-none focus:outline-none"
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                isLoading={isSubmitting}
                size="sm"
                color="primary"
                className="flex justify-center items-center"
              >
                Save
              </Button>
              <Button size="sm" onClick={toggleEditDescription} type="button">
                Cancel
              </Button>
              {taskDescription && (
                <Button
                  size="sm"
                  isLoading={isDeleting}
                  onClick={handleDeleteDescription}
                  type="button"
                  color="danger"
                >
                  Delete
                </Button>
              )}
            </div>
          </form>
        )}
      </TaskDetailItemContent>
    </>
  );
}
