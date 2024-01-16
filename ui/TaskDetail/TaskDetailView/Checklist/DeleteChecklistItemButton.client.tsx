'use client'
import { handleDeleteChecklistItem } from "@/actions/ChecklistServerActions";
import { IconTrash } from "@tabler/icons-react";

export default function DeleteChecklistItemButton({ checklistItemId, taskId} : { checklistItemId: string, taskId: string }) {
    return (
        <button className="shrink-0 grow-0" onClick={() => {
            if (window.confirm('Are you sure you want to delete this item?')) {
                handleDeleteChecklistItem({ checklistItemId: checklistItemId, taskId: taskId });
            }
            }}>
                <IconTrash className="text-zinc-500 hover:text-danger" size={18} />
        </button>
    )
}
