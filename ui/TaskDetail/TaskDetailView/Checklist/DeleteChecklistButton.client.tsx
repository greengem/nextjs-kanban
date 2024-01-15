'use client'
import { Button } from "@nextui-org/button";
import { handleDeleteChecklist } from "@/actions/ChecklistServerActions";

export default function DeleteChecklistButton({ checklistId, taskId} : { checklistId: string, taskId: string }) {
    return (
        <Button 
            className="shrink-0 grow-0" 
            size="sm" 
            onClick={() => {
                if (window.confirm('Are you sure you want to delete this checklist?')) {
                handleDeleteChecklist({ checklistId: checklistId, taskId: taskId });
                }
            }}
        >
            Delete
        </Button>
    )
}
