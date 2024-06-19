"use client";
import { useState } from "react";
import { handleDeleteChecklistItem } from "@/server-actions/ChecklistServerActions";
import { IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";

export default function DeleteChecklistItemButton({
  checklistItemId,
  taskId,
}: {
  checklistItemId: string;
  taskId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setIsLoading(true);
      try {
        const response = await handleDeleteChecklistItem({
          checklistItemId,
          taskId,
        });
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (e) {
        toast.error("An error occurred while deleting the checklist item.");
      }
      setIsLoading(false);
    }
  };

  return (
    <button
      className="shrink-0 grow-0"
      onClick={handleDelete}
      disabled={isLoading}
    >
      {isLoading ? (
        <Spinner size="sm" color="danger" />
      ) : (
        <IconTrash className="text-zinc-500 hover:text-danger" size={18} />
      )}
    </button>
  );
}
