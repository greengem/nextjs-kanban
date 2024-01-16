'use client'
import { useFormState } from 'react-dom'
import { useState, useEffect } from 'react';
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconX } from "@tabler/icons-react";
import { handleCreateChecklistItem } from "@/actions/ChecklistServerActions";

interface ChecklistItemFormProps {
    checklistId: string;
    taskId: string;
}

interface StateType {
    success?: boolean;
    message: string;
}

const initialState: StateType = {
    message: '',
    success: undefined,
}

export default function ChecklistItemForm({ checklistId, taskId }: ChecklistItemFormProps) {
    const [state, formAction] = useFormState(handleCreateChecklistItem, initialState);

    const [showInput, setShowInput] = useState(false);

    const toggleInput = () => setShowInput(!showInput);

    useEffect(() => {
        if (state.success) {
            toggleInput();
        }
    }, [state.success]);

    return(
        <div>
            {!showInput && (
                <Button size="sm" onClick={toggleInput}>Add an item</Button>
            )}
            {showInput && (
                <form action={formAction}>
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
