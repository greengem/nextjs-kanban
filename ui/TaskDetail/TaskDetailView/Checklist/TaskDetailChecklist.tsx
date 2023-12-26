'use client'
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { 
    handleCreateChecklistItem, 
    handleDeleteChecklistItem, 
    handleDeleteChecklist,
    handleToggleCheckedItem 
} from "@/actions/ChecklistServerActions";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { IconCheckbox, IconTrash } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { ExpandedTask } from "@/types/types";

interface TaskDetailChecklistProps {
    task: ExpandedTask;
    boardId: string;
}

export default function TaskDetailChecklist({
    task, boardId,
}: TaskDetailChecklistProps) {
    const [showInput, setShowInput] = useState<Record<string, boolean>>({});
    const [newItemContent, setNewItemContent] = useState<string>("");
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    useEffect(() => {
        const initialCheckedIds = task.checklists.flatMap(checklist =>
            checklist.items.filter(item => item.isChecked).map(item => item.id)
        );
        setCheckedValues(initialCheckedIds);
    }, [task]);

    const handleCheckboxChange = (newCheckedValues: string[]) => {
        setCheckedValues(newCheckedValues);
    };
    
    const toggleInput = (checklistId: string): void => {
        setShowInput(prev => ({ ...prev, [checklistId]: !prev[checklistId] }));
        setNewItemContent("");
    };

    const handleAddItem = async (checklistId: string): Promise<void> => {
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

    const handleDeleteChecklistClick = async (checklistId: string): Promise<void> => {
        if (window.confirm("Are you sure you want to delete this checklist?")) {
            try {
                const result = await handleDeleteChecklist({ checklistId, boardId });
                if (result.success) {
                    toast.success(result.message);
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                console.error('Error deleting checklist:', error);
                toast.error('Error occurred while deleting the checklist');
            }
        }
    };

    const handleToggleChecked = async (checklistItemId: string, isChecked: boolean) => {
        try {
            await handleToggleCheckedItem({
                checklistItemId,
                isChecked,
                boardId
            });
    
            setCheckedValues(prev => isChecked 
                ? [...prev, checklistItemId] 
                : prev.filter(id => id !== checklistItemId));
        } catch (error) {
            console.error('Error toggling checklist item:', error);
        }
    };
    

    return (
        <div>
            {task.checklists.map(checklist => (
                <div key={checklist.id} className="mb-5">
                    <div className="flex items-center mb-3 justify-between">
                        <div className="flex gap-3">
                            <IconCheckbox size={32} className="shrink-0 grow-0" />
                            <h4 className='text-large font-semibold'>{checklist.title}</h4>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm">Hide checked items</Button>
                            <Button size="sm" onClick={() => handleDeleteChecklistClick(checklist.id)}>Delete</Button>
                        </div>
                    </div>
                    <CheckboxGroup 
                        className="mb-3"
                        value={checkedValues}
                        onValueChange={handleCheckboxChange}
                    >
                        {checklist.items.map(item => (
                            <div className="flex justify-between gap-5 hover:bg-zinc-800 py-1 px-2 rounded-md" key={item.id}>
                                <Checkbox 
                                    value={item.id}
                                    className="w-full max-w-full"
                                    onChange={() => handleToggleChecked(item.id, !checkedValues.includes(item.id))}
                                >
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
            ))}
        </div>
    );
}
