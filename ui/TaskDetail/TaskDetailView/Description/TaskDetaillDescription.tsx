"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { EditTaskSchema } from "@/types/zodTypes";
import { TaskEditData } from "@/types/types";

import {
  handleEditTask,
  handleDeleteTaskDescription,
} from "@/actions/TaskServerActions";

import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconTextPlus, IconLoader2 } from "@tabler/icons-react";
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

  const toggleEditDescription = () =>
    setIsEditingDescription(!isEditingDescription);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TaskEditData>({
    resolver: zodResolver(EditTaskSchema),
    defaultValues: {
      id: taskId,
      boardId,
      description: taskDescription,
    },
  });

  const onSubmit: SubmitHandler<TaskEditData> = async (data) => {
    const response = await handleEditTask(data);

    if (response.success) {
      toast.success("Description Updated");
      reset({ ...data, description: data.description });
      setIsEditingDescription(false);
    } else {
      toast.error(response.message);
    }
  };

  const handleDeleteDescription = async () => {
    const response = await handleDeleteTaskDescription(taskId, boardId);

    if (response.success) {
      toast.success(response.message);
      setIsEditingDescription(false);
      reset({ id: taskId, boardId, description: null }); // Only reset relevant fields
    } else {
      toast.error(response.message);
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id")} />
            <input type="hidden" {...register("boardId")} />
            <Textarea
              placeholder="Enter your description"
              autoFocus
              label="Description"
              defaultValue={taskDescription || ""}
              className="w-full mb-2 mt-1 border-none focus:outline-none"
              {...register("description")}
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="sm"
                color="primary"
                className="flex justify-center items-center"
              >
                {isSubmitting ? (
                  <>
                    <IconLoader2 size={16} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
              <Button size="sm" onClick={toggleEditDescription} type="button">
                Cancel
              </Button>
              {taskDescription && (
                <Button
                  size="sm"
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
