import {
    handleEditChecklistName 
} from "@/actions/ChecklistServerActions";
import { IconCheckbox } from "@tabler/icons-react";
import { ExpandedTask } from "@/types/types";
import TaskDetailItemContent from "../ui/TaskDetailItemContent";
import { Progress } from "@nextui-org/progress";
import ChecklistItemForm from "./ChecklistItemForm.client";
import DeleteChecklistButton from "./DeleteChecklistButton.client";
import ChecklistCheckboxGroup from "./ChecklistCheckboxGroup.client";

export default function TaskDetailChecklist({ task }: { task: ExpandedTask }) {

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
                        <ChecklistCheckboxGroup taskId={task.id} checkedItemIds={checkedItemIds} checklist={checklist} />
                        <ChecklistItemForm checklistId={checklist.id} taskId={task.id}/>
                    </TaskDetailItemContent>
                </div>
            );
        })}
    </>
);
}
