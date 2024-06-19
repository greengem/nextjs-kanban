"use client";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { handleDeleteChecklist } from "@/server-actions/ChecklistServerActions";
import { toast } from "sonner";

export default function DeleteChecklistButton({
  checklistId,
  taskId,
}: {
  checklistId: string;
  taskId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this checklist?")) {
      setIsLoading(true);
      try {
        const response = await handleDeleteChecklist({ checklistId, taskId });
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (e) {
        toast.error("An error occurred while deleting the checklist.");
      }
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="shrink-0 grow-0"
      size="sm"
      onClick={handleDelete}
      isLoading={isLoading}
    >
      Delete
    </Button>
  );
}
