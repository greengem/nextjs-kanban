'use client'
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconX } from "@tabler/icons-react";
import { handleCreateChecklistItem } from "@/actions/ChecklistServerActions";

interface TaskDetailChecklistItemFormProps {
    checklistId: string;
    taskId: string;
}

export default function TaskDetailChecklistItemForm({ checklistId, taskId }: TaskDetailChecklistItemFormProps) {
    const [showInput, setShowInput] = useState(false);
    const toggleInput = () => setShowInput(!showInput);

    return(
        <div>
            {!showInput && (
                <Button size="sm" onClick={toggleInput}>Add an item</Button>
            )}
            {showInput && (
                <form action={handleCreateChecklistItem}>
                    <input type="hidden" name="checklistId" value={checklistId} />
                    <input type="hidden" name="taskId" value={taskId} />
                    <Input 
                        variant="bordered" 
                        placeholder="Add an item..." 
                        name="content"  
                        label="Checklist Item" 
                        size="sm" 
                        className="w-full mb-2" 
                        autoFocus 
                    />
                    <div className="flex gap-2">
                        <Button type="submit" size="sm" color="primary">Add Item</Button>
                        <button type="button" onClick={toggleInput}><IconX size={16} /></button>
                    </div>
                </form>
            )}
        </div>
    );
}
