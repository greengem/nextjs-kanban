'use client'
import { 
    handleDeleteChecklistItem, 
    handleToggleCheckedItem,
    handleEditChecklistName 
} from "@/actions/ChecklistServerActions";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { IconCheckbox, IconEdit, IconTrash } from "@tabler/icons-react";
import { ExpandedTask } from "@/types/types";
import TaskDetailItemContent from "../ui/TaskDetailItemContent";
import {Progress} from "@nextui-org/progress";
import TaskDetailChecklistItemForm from "./TaskDetailChecklistItemForm.client";
import DeleteChecklistButton from "./DeleteChecklistButton.client";

interface TaskDetailChecklistProps {
    task: ExpandedTask;
    boardId: string;
}

export default function TaskDetailChecklist({
    task, boardId,
}: TaskDetailChecklistProps) {

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
                        <DeleteChecklistButton checklistId={checklist.id} taskId={task.id} />
                    </div>

                    <TaskDetailItemContent indented>
                        <Progress aria-label="Completion progress" value={completionPercentage} className="w-full mb-3"/>
                        
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
                        <TaskDetailChecklistItemForm checklistId={checklist.id} taskId={task.id}/>
                    </TaskDetailItemContent>
                </div>
            );
        })}
    </>
);
}
