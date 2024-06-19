"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconActivity, IconX } from "@tabler/icons-react";
import TaskDetailActivityItem from "./TaskDetailActivityItem";
import { handleCreateActivity } from "@/server-actions/ActivityServerActions";
import TaskDetailItemHeading from "../ui/TaskDetailItemHeading";
import TaskDetailItemContent from "../ui/TaskDetailItemContent";
import { ActivityWithRelations } from "@/types/types";

interface TaskDetailActivityProps {
  taskId: string;
  boardId: string;
  activities: ActivityWithRelations[];
  columnTitle: string;
  userName: string | null;
  userImage: string | null;
}

export default function TaskDetailActivity({
  taskId,
  boardId,
  activities,
  columnTitle,
  userName,
  userImage,
}: TaskDetailActivityProps) {
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setContent("");
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await handleCreateActivity(taskId, boardId, content);
      if (response.success) {
        toast.success(response.message);
        handleToggleForm();
      } else {
        toast.error(response.message);
        setError(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form");
      setError("An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TaskDetailItemHeading
        title="Activity"
        icon={<IconActivity size={32} />}
      />

      <TaskDetailItemContent indented>
        <div className="flex items-start mb-5 mt-4">
          <div className="w-[40px]">
            <Avatar
              showFallback
              size="sm"
              name={userName ?? "Unknown"}
              src={userImage ?? undefined}
              className="shrink-0"
            />
          </div>
          <div className="w-full">
            {!showForm ? (
              <div className="flex items-center h-[32px]">
                <p
                  onClick={handleToggleForm}
                  className="cursor-pointer text-primary pl-4"
                >
                  Add a comment
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmitForm} className="w-full">
                <Input
                  autoComplete="off"
                  className="mb-2"
                  placeholder="Add a comment..."
                  label="Activity"
                  size="sm"
                  autoFocus
                  name="content"
                  value={content}
                  onChange={handleChange}
                  isInvalid={!!error}
                  errorMessage={error}
                  isRequired
                />

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                  <Button size="sm" onClick={handleToggleForm} isIconOnly>
                    <IconX size={20} />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        <ul className="space-y-3">
          {activities &&
            activities.map((activity: any) => (
              <TaskDetailActivityItem
                key={activity.id}
                activity={activity}
                columnTitle={columnTitle}
                boardId={boardId}
              />
            ))}
        </ul>
      </TaskDetailItemContent>
    </>
  );
}
