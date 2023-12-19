'use client'
import { useState } from "react";
import toast from "react-hot-toast";
import { handleCreateChecklistItem, handleDeleteChecklistItem } from "@/actions/ChecklistServerActions";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { IconCheckbox, IconTrash } from "@tabler/icons-react";
import { Button } from "@nextui-org/react";
import { ExpandedTask } from "@/types/types";

interface TaskModalChecklistProps {
    task: ExpandedTask;
    boardId: string;
}

export default function TaskModalChecklist({
    task, boardId,
}: TaskModalChecklistProps) {
    const [showInput, setShowInput] = useState<Record<string, boolean>>({});
    const [newItemContent, setNewItemContent] = useState<string>("");

    const toggleInput = (checklistId: string): void => {
        setShowInput(prev => ({ ...prev, [checklistId]: !prev[checklistId] }));
        setNewItemContent("");
    };

    const handleAddItem = async (checklistId: string): Promise<void> => {
        console.log("Adding new item with data:", {
            content: newItemContent,
            checklistId: checklistId,
            boardId: boardId
        });

        try {
            const result = await handleCreateChecklistItem({
                content: newItemContent,
                checklistId: checklistId,
                boardId: boardId
            });
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error adding checklist item:', error);
        }
        setShowInput(prev => ({ ...prev, [checklistId]: false }));
    };

    const handleDeleteItem = async (checklistItemId: string): Promise<void> => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                const result = await handleDeleteChecklistItem({
                    checklistItemId: checklistItemId,
                    boardId: boardId
                });
                if (result.success) {
                    toast.success(result.message);
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                console.error('Error deleting checklist item:', error);
            }
        }
    };
    
    

    return (
        <div>
            {task.checklists.map(checklist => (
                <div key={checklist.id}>
                    <div className="flex gap-3 items-center mb-3">
                        <IconCheckbox size={32} />
                        <h4 className='text-large font-semibold'>Checklist: {checklist.title}</h4>
                    </div>
                    <div>
                        <CheckboxGroup className="mb-3">
                            {checklist.items.map(item => (
                                <div className="flex justify-between gap-5 hover:bg-zinc-800 py-1 px-2 rounded-md" key={item.id}>
                                    <Checkbox value={item.id} checked={item.isChecked} className="w-full max-w-full">
                                        {item.content}
                                    </Checkbox>
                                    <button 
                                        className="shrink-0 grow-0"
                                        onClick={() => handleDeleteItem(item.id)}
                                    >
                                        <IconTrash className="text-zinc-500 hover:text-danger" size={18} />
                                    </button>
                                </div>
                            ))}
                        </CheckboxGroup>
                        {!showInput[checklist.id] && (
                            <Button size="sm" onClick={() => toggleInput(checklist.id)}>Add an item</Button>
                        )}
                        {showInput[checklist.id] && (
                            <div>
                                <Input 
                                    labelPlacement="outside" 
                                    placeholder="Add an item" 
                                    size="sm" 
                                    className="w-full mb-2" 
                                    autoFocus 
                                    value={newItemContent}
                                    onChange={(e) => setNewItemContent(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <Button size="sm" color="primary" onClick={() => handleAddItem(checklist.id)}>Add</Button>
                                    <Button size="sm" onClick={() => toggleInput(checklist.id)}>Cancel</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
