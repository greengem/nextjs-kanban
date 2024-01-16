'use client'
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { IconEdit } from "@tabler/icons-react";
import DeleteChecklistItemButton from "./DeleteChecklistItemButton.client";
import { handleToggleCheckedItem } from "@/actions/ChecklistServerActions";
import { ChecklistSummary, ChecklistItemSummary } from "@/types/types";

interface ChecklistCheckboxGroupProps {
    checkedItemIds: string[],
    checklist: ChecklistSummary,
    taskId: string
}

export default function ChecklistCheckboxGroup({ checkedItemIds, checklist, taskId} : ChecklistCheckboxGroupProps) {
    return (
        <CheckboxGroup className="mb-3" defaultValue={checkedItemIds}>
            {checklist.items.map((item: ChecklistItemSummary) => (
                <div className="flex justify-between gap-5 hover:bg-zinc-300 py-1 px-2 rounded-md" key={item.id}>
                    <Checkbox className="grow" value={item.id}
                        onChange={(event) => handleToggleCheckedItem({ 
                            checklistItemId: item.id, 
                            isChecked: event.target.checked, 
                            taskId: taskId 
                        })}
                    >
                        {item.content}
                    </Checkbox>
                    <div className="flex gap-2">
                        <button className="shrink-0 grow-0"><IconEdit className="text-zinc-500 hover:text-primary" size={18} /></button>
                        <DeleteChecklistItemButton checklistItemId={item.id} taskId={taskId} />

                    </div>
                </div>
            ))}
        </CheckboxGroup>
    )
}
