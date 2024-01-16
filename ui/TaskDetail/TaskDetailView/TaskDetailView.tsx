import { auth } from "@/auth";
import { ExpandedTask } from "@/types/types";
import TaskDetailDescription from "./Description/TaskDetaillDescription";
import TaskDetailActivity from "./Activity/TaskDetailActivity";
import TaskDetailChecklist from "./Checklist/TaskDetailChecklist";
import TaskDetailDates from "./Dates/TaskDetailDates";
import TaskDetailLabels from "./Labels/TaskDetailLabels";

export default async function TaskDetailView({ task } : { task: ExpandedTask }) {
    const session = await auth();

    return (
        <div className='col-span-3'>
            <TaskDetailLabels labels={task.labels} />
            <TaskDetailDates startDate={task.startDate} dueDate={task.dueDate} />
            <TaskDetailDescription selectedTask={task} boardId={task.column.boardId} />
            <TaskDetailChecklist task={task} />
            <TaskDetailActivity task={task} session={session} />
        </div>
    );
}
