import { auth } from "@/auth";
import { ExpandedTask } from "@/types/types";
import TaskDetailDescription from "./Description/TaskDetaillDescription";
import TaskDetailActivity from "./Activity/TaskDetailActivity";
import { format, isSameMonth, isSameYear } from 'date-fns';
import TaskDetailChecklist from "./Checklist/TaskDetailChecklist";

export default async function TaskDetailView({ task } : { task: ExpandedTask }) {
  
    const session = await auth();

    function formatDateDisplay(startDate: Date | null, dueDate: Date | null): string {
        if (!startDate && !dueDate) return '';
    
        if (startDate && dueDate) {
            if (isSameMonth(startDate, dueDate) && isSameYear(startDate, dueDate)) {
                return `${format(startDate, 'dd')} - ${format(dueDate, 'dd MMM')}`;
            }
            return `${format(startDate, 'dd MMM')} - ${format(dueDate, 'dd MMM')}`;
        } else if (startDate) {
            return `Start Date: ${format(startDate, 'dd MMM')}`;
        } else if (dueDate) {
            return `Due: ${format(dueDate, 'dd MMM')}`;
        }
        return '';
    }

    return (
        <div className='col-span-3 space-y-5'>
            {
                task.labels && task.labels.length > 0 && (
                <div className="px-5">
                    <h4 className="uppercase text-xs text-zinc-500 font-semibold mb-1">Labels:</h4>
                    <div className='flex'>
                    {task.labels.map(label => (
                        <div key={label.id} className={`bg-${label.color}-500 h-6 w-10 rounded-md mr-2`}></div>
                    ))}
                    </div>
                </div>
                )
            }

            {(task.startDate || task.dueDate) &&
                <p>Dates: {formatDateDisplay(task.startDate, task.dueDate)}</p>
            }

            <TaskDetailDescription selectedTask={task} boardId={task.column.boardId} />
            <TaskDetailChecklist task={task} boardId={task.column.boardId} />
            <TaskDetailActivity task={task} session={session} />
        </div>
    );
}
