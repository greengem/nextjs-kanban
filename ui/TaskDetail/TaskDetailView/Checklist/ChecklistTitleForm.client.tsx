'use client'
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

export default function ChecklistTitleForm({ checklistTitle, checklistId, taskId }: ChecklistTitleFormProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [inputValue, setInputValue] = useState(checklistTitle || "Checklist");

    const toggleEditState = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (error) setError('');
    };

    return (
        <>
            {isEditing ? (
                <form 
                    className='flex grow justify-between gap-2 items-center'
                    action={async (data) => {
                        data.append('checklistId', checklistId);
                        data.append('taskId', taskId);
                    
                        const response = await handleEditChecklistName(data);
                        if (response.success) {
                            toggleEditState();
                        } else { 
                            setError(response.message);
                        }
                    }}
                >
                    <Input 
                        autoComplete="off"
                        type="text" 
                        name="title" 
                        value={inputValue}
                        onChange={handleInputChange}
                        labelPlacement="outside"
                        placeholder="Enter a name for your checklist..."
                        autoFocus 
                        isInvalid={!!error}
                        errorMessage={error}
                        size="sm"
                    />
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
