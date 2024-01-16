'use client'
import { useFormState } from 'react-dom'
import { useState, useEffect } from 'react';
import { handleEditChecklistName } from "@/actions/ChecklistServerActions";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconX } from "@tabler/icons-react";

interface ChecklistTitleFormProps {
    checklistTitle: string | null;
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

export default function ChecklistTitleForm({ checklistTitle, checklistId, taskId }: ChecklistTitleFormProps) {
    const [state, formAction] = useFormState(handleEditChecklistName, initialState);

    const [isEditing, setIsEditing] = useState(false);

    const toggleEditState = () => {
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        if (state.success) {
            toggleEditState();
        }
    }, [state.success]);

    return (
        <>
            {isEditing ? (
                <form action={formAction} className="flex grow justify-between gap-2 items-center">
                    <Input 
                        type="text" 
                        name="title" 
                        defaultValue={checklistTitle || "Checklist"} 
                        labelPlacement="outside"
                        placeholder="Enter a name for your checklist..."
                        autoFocus
                        size="sm"
                    />
                    <input type="hidden" name="checklistId" value={checklistId} />
                    <input type="hidden" name="taskId" value={taskId} />
                    <Button size="sm" color="primary" type="submit">Submit</Button>
                    <button type="button" onClick={toggleEditState}><IconX size={16} /></button>
                </form>
            ) : (
                <h4 className='text-xl font-semibold grow' onClick={toggleEditState}>
                    {checklistTitle || "Checklist"}
                </h4>
            )}
        </>
    );
}
