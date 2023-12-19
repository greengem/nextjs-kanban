import { auth } from "@/auth";
import { getTask } from "@/lib/FetchData";
import { ExpandedTask } from "@/types/types";
import TaskModalTitle from "@/ui/TaskModal/TaskModalTitle";
import TaskModalDescription from "@/ui/TaskModal/TaskModalDescription";
import TaskModalActivity from "@/ui/TaskModal/TaskModalActivity";
import TaskModalAddToCard from "@/ui/TaskModal/ModalAddToCard/TaskModalAddToCard";
import TaskModalActions from "@/ui/TaskModal/TaskModalActions";
import { format, isSameMonth, isSameYear } from 'date-fns';
import TaskModalChecklist from "../TaskModal/TaskModalChecklist";

export default async function TaskPage({ taskId } : { taskId: string }) {
  const task: ExpandedTask | null = await getTask(taskId);

  if (!task) {
    return <div>Task not found or loading error</div>;
  }
  
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
    <>
      <div className='flex gap-3 p-5 border-b-1 border-zinc-800 mb-5'>
        <TaskModalTitle selectedTask={task} boardId={task?.column.boardId} />
      </div>

      {task.labels && (
        <div className="px-5">
          <h4 className="uppercase text-xs text-zinc-500 font-semibold mb-1">Labels:</h4>
          <div className='flex'>
            {task.labels.map(label => (
              <div key={label.id} className={`bg-${label.color}-500 h-6 w-10 rounded-md mr-2`}></div>
            ))}
          </div>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 p-5'>
        <div className='col-span-3 space-y-5'>
          <div>
            Dates: {task.startDate || task.dueDate ? formatDateDisplay(task.startDate, task.dueDate) : 'No dates'}
          </div>
          <TaskModalDescription selectedTask={task} boardId={task.column.boardId} />
          <TaskModalChecklist task={task} boardId={task.column.boardId} />
          <TaskModalActivity task={task} session={session} />
        </div>

        <div className='col-span-1 space-y-2'>
          <TaskModalAddToCard task={task} />
          <TaskModalActions selectedTask={task} boardId={task.column.boardId} />
        </div>

      </div>
    </>
  );
}
