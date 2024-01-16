'use client'
import { useState } from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { IconEdit, IconX } from "@tabler/icons-react";
import DeleteChecklistItemButton from "./DeleteChecklistItemButton.client";
import { handleEditChecklistItemContent, handleToggleCheckedItem } from "@/actions/ChecklistServerActions";
import { ChecklistSummary, ChecklistItemSummary } from "@/types/types";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

interface ChecklistCheckboxGroupProps {
    checkedItemIds: string[],
    checklist: ChecklistSummary,
    taskId: string
}

export default function ChecklistCheckboxGroup({ checkedItemIds, checklist, taskId }: ChecklistCheckboxGroupProps) {
    const [editingItemId, setEditingItemId] = useState<string | null>(null);

    const handleEditClick = (itemId: string) => {
        setEditingItemId(itemId);
    };

    const handleCancelOrSubmit = () => {
        setEditingItemId(null);
    };

    return (
        <CheckboxGroup className="mb-3" defaultValue={checkedItemIds}>
            {checklist.items.map((item: ChecklistItemSummary) => (
                <div className="flex justify-between gap-5 hover:bg-zinc-300 py-1 px-2 rounded-md" key={item.id}>
                    <div className="flex grow items-center">
                        <Checkbox value={item.id} onChange={(event) => handleToggleCheckedItem({ 
                            checklistItemId: item.id, 
                            isChecked: event.target.checked, 
                            taskId: taskId 
                        })}>
                            {editingItemId !== item.id && <span>{item.content}</span>}
                        </Checkbox>

                        {editingItemId === item.id && (
                            <form action={handleEditChecklistItemContent} className="flex gap-2 ml-2" onSubmit={handleCancelOrSubmit}>
                                <Input 
                                    autoComplete="off"
                                    size="sm"
                                    placeholder="Enter checklist item name..."
                                    labelPlacement="outside"
                                    name="content"
                                    defaultValue={item.content}
                                />
                                <input type="hidden" name="checklistItemId" value={item.id} />
                                <input type="hidden" name="taskId" value={taskId} />
                                <Button type="submit" size="sm" color="primary">Save</Button>
                                <button type="button" onClick={handleCancelOrSubmit}><IconX size={16} /></button>
                            </form>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button className="shrink-0 grow-0" onClick={() => handleEditClick(item.id)}>
                            <IconEdit className="text-zinc-500 hover:text-primary" size={18} />
                        </button>
                        <DeleteChecklistItemButton checklistItemId={item.id} taskId={taskId} />
                    </div>
                </div>
            ))}
        </CheckboxGroup>
    )
}
