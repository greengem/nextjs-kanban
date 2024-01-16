'use client';
import { useState } from 'react';
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconX } from "@tabler/icons-react";
import { handleCreateChecklistItem } from "@/actions/ChecklistServerActions";

interface ChecklistItemFormProps {
    checklistId: string;
    taskId: string;
}

export default function ChecklistItemForm({ checklistId, taskId }: ChecklistItemFormProps) {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState("");

    const toggleInput = () => setShowInput(!showInput);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (error) setError('');
    };

    return(
        <div>
            {!showInput && (
                <Button size="sm" onClick={toggleInput}>Add an item</Button>
            )}
            {showInput && (
                <form action={async (data) => {
                    data.append('checklistId', checklistId);
                    data.append('taskId', taskId);
                
                    const response = await handleCreateChecklistItem(data);
                    if (response.success) {
                        setInputValue("");
                        toggleInput();
                    } else { 
                        setError(response.message);
                    }
                }}>
                    <Input 
                        autoComplete="off"
                        variant="bordered" 
                        placeholder="Add an item..." 
                        name="content"
                        value={inputValue}
                        onChange={handleInputChange}
                        label="Checklist Item" 
                        size="sm" 
                        className="w-full mb-2" 
                        autoFocus 
                        isInvalid={!!error}
                        errorMessage={error}
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
