'use client'
import { useState } from "react";
import { 
    handleCreateChecklistItem, 
    handleDeleteChecklistItem, 
    handleDeleteChecklist,
    handleToggleCheckedItem,
    handleEditChecklistName 
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
    const [showInput, setShowInput] = useState<Record<string, boolean>>({});

    // Toggle the visibility of the input field for a given checklist
    const toggleInput = (checklistId: string) => {
        setShowInput(prevShowInput => ({
            ...prevShowInput,
            [checklistId]: !prevShowInput[checklistId]
        }));
    };

    return (
        <>
            {task.checklists.map(checklist => {
                const totalItems = checklist.items.length;
                const completedItems = checklist.items.filter(item => item.isChecked).length;
                const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

                const checkedItemIds = checklist.items
                    .filter(item => item.isChecked)
                    .map(item => item.id);

                return (
                <div key={checklist.id}>
                    <div className="flex w-full items-center justify-between mb-1">
                        <div className="flex items-center grow">
                            <div className='w-[40px] grow-0 shrink-0 justify-center'><IconCheckbox size={32} /></div>
                            <h4 className='text-xl font-semibold grow'>
                                {checklist.title || "Untitled Checklist"}
                            </h4>
                        </div>
                        <Button 
                            className="shrink-0 grow-0" 
                            size="sm" 
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete this checklist?')) {
                                handleDeleteChecklist({ checklistId: checklist.id, taskId: task.id });
                                }
                            }}
                        >
                            Delete
                        </Button>

                    </div>

                    <TaskDetailItemContent indented>
                        <Progress 
                            aria-label="Completion progress" 
                            value={completionPercentage}
                            className="w-full mb-3"
                        />
                        
                        <CheckboxGroup className="mb-3"
                            defaultValue={checkedItemIds} 
                        >
                            {checklist.items.map(item => (
                                <div className="flex justify-between gap-5 hover:bg-zinc-300 py-1 px-2 rounded-md" key={item.id}>
                                    <Checkbox className="grow" value={item.id}
                                        onChange={(event) => handleToggleCheckedItem({ 
                                            checklistItemId: item.id, 
                                            isChecked: event.target.checked, 
                                            taskId: task.id 
                                        })}
                                    >
                                        {item.content}
                                    </Checkbox>
                                    <div className="flex gap-2">
                                        <button className="shrink-0 grow-0"><IconEdit className="text-zinc-500 hover:text-primary" size={18} /></button>
                                        <button className="shrink-0 grow-0" onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this item?')) {
                                                handleDeleteChecklistItem({ checklistItemId: item.id, taskId: task.id });
                                            }
                                            }}>
                                                <IconTrash className="text-zinc-500 hover:text-danger" size={18} />
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </CheckboxGroup>
                        
                        {!showInput[checklist.id] && (
                            <Button size="sm" onClick={() => toggleInput(checklist.id)}>Add an item</Button>
                        )}
                        {showInput[checklist.id] && (
                            <form action={handleCreateChecklistItem}>
                                <input type="hidden" name="checklistId" value={checklist.id} />
                                <input type="hidden" name="taskId" value={task.id} />
                                <Input variant="bordered" placeholder="Add an item..." name="content"  label="Checklist Item" size="sm" className="w-full mb-2" autoFocus />
                                <div className="flex gap-2">
                                    <Button type="submit" size="sm" color="primary">Add Item</Button>
                                    <button onClick={() => toggleInput(checklist.id)}><IconX size={16} /></button>
                                </div>
                            </form>
                        )}
                    </TaskDetailItemContent>
                </div>
            );
        })}
    </>
);
}
