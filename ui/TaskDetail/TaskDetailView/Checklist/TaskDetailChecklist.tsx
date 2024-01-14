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
import { IconCheckbox, IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { ExpandedTask } from "@/types/types";
import TaskDetailItemContent from "../ui/TaskDetailItemContent";
import {Progress} from "@nextui-org/progress";
import { ChecklistSummary } from "@/types/types";

interface TaskDetailChecklistProps {
    task: ExpandedTask;
    boardId: string;
}

export default function TaskDetailChecklist({
    task, boardId,
}: TaskDetailChecklistProps) {
    
    // State to manage visibility of input fields for new checklist items. 
    // Keyed by checklist ID, value is boolean indicating if input should be shown.
    const [showInput, setShowInput] = useState<Record<string, boolean>>({}); 

    // State for the content of a new checklist item being added.
    const [newItemContent, setNewItemContent] = useState<string>(""); 

    // State to track the IDs of checked (completed) checklist items.
    const [checkedValues, setCheckedValues] = useState<string[]>([]); 

    // Effect to initialize the checkedValues state based on the task's current checklist items.
    useEffect(() => {
        const initialCheckedIds = task.checklists.flatMap(checklist =>
            checklist.items.filter(item => item.isChecked).map(item => item.id)
        );
        setCheckedValues(initialCheckedIds);
    }, [task]);


    // Function to calculate progress of a checklist as a percentage.
    const calculateProgress = (checklist: ChecklistSummary) => {
        const totalItems = checklist.items.length;
        const checkedItems = checklist.items.filter(item => checkedValues.includes(item.id)).length;
        return (checkedItems / totalItems) * 100;
    };

    // Toggle visibility of the input field to add a new checklist item.
    const toggleInput = (checklistId: string): void => {
        setShowInput(prev => ({ ...prev, [checklistId]: !prev[checklistId] }));
        setNewItemContent("");
    };


    // Handle addition of a new checklist item. Calls the action to create the item and shows a toast notification.
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


    // Handles deletion of a checklist item after user confirmation.
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


    // Handles deletion of the entire checklist after user confirmation.
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


    // Updates the checked (completed) items' state when a checklist item's checkbox is toggled.
    const handleCheckboxChange = (newCheckedValues: string[]) => {
        setCheckedValues(newCheckedValues);
    };
    

    // Handles the toggling of the checked state for a checklist item.
    const handleToggleChecked = async (checklistItemId: string, isChecked: boolean) => {
        try {
            await handleToggleCheckedItem({
                checklistItemId,
                isChecked,
                boardId
            });

            // Update the checkedValues state to reflect the change in the item's checked state.
            setCheckedValues(prev => isChecked 
                ? [...prev, checklistItemId] 
                : prev.filter(id => id !== checklistItemId));
        } catch (error) {
            console.error('Error toggling checklist item:', error);
        }
    };
    
    return (
        <>
            {task.checklists.map(checklist => (
                <div key={checklist.id}>
                    <div className="flex w-full items-center justify-between mb-1">
                        <div className="flex items-center">
                            <div className='w-[40px] grow-0 shrink-0 justify-center'><IconCheckbox size={32} /></div>
                            <h4 className='text-xl font-semibold'>{checklist.title || "Untitled Checklist"} </h4>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleDeleteChecklistClick(checklist.id)}>Delete</Button>
                        </div>
                    </div>

                    <TaskDetailItemContent indented>
                        <Progress 
                            aria-label="Completion progress" 
                            value={calculateProgress(checklist)} 
                            className="w-full mb-3"
                        />
                        <CheckboxGroup 
                            className="mb-3"
                            value={checkedValues}
                            onValueChange={handleCheckboxChange}
                        >
                            {checklist.items.map(item => (
                                <div className="flex justify-between gap-5 hover:bg-zinc-300 py-1 px-2 rounded-md" key={item.id}>
                                    <Checkbox 
                                        value={item.id}
                                        className="grow"
                                        onChange={() => handleToggleChecked(item.id, !checkedValues.includes(item.id))}
                                    >
                                        {item.content}
                                    </Checkbox>
                                    <div className="flex gap-2">
                                        <button className="shrink-0 grow-0"><IconEdit className="text-zinc-500 hover:text-primary" size={18} /></button>
                                        <button className="shrink-0 grow-0" onClick={() => handleDeleteItem(item.id)}><IconTrash className="text-zinc-500 hover:text-danger" size={18} /></button>
                                    </div>
                                </div>
                            ))}
                        </CheckboxGroup>
                        {!showInput[checklist.id] && (
                            <Button size="sm" onClick={() => toggleInput(checklist.id)}>Add an item</Button>
                        )}
                        {showInput[checklist.id] && (
                            <div>
                                <Input placeholder="Add an item..."  label="Checklist Item" size="sm" className="w-full mb-2" autoFocus value={newItemContent}onChange={(e) => setNewItemContent(e.target.value)} />
                                <div className="flex gap-2">
                                    <Button size="sm" color="primary" onClick={() => handleAddItem(checklist.id)}>Add Item</Button>
                                    <button onClick={() => toggleInput(checklist.id)}><IconX size={16} /></button>
                                </div>
                            </div>
                        )}
                    </TaskDetailItemContent>
                </div>
            ))}
        </>
    );
}
