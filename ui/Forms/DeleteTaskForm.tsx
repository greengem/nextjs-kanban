'use client'

import { useFormState, useFormStatus } from "react-dom";
import { handleDeleteTask} from "@/actions/TaskActions";
import { IconTrash } from "@tabler/icons-react";

const initialState = {
  message: "",
}

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      className="p-1 bg-red-500 text-white rounded"
    >
      <IconTrash size={16} />
    </button>
  )
}

export default function DeleteTaskForm({ boardId, taskId, taskTitle }: { boardId: string; taskId: string; taskTitle: string; }) {
  const [state, formAction] = useFormState(handleDeleteTask, initialState)

  return (
    <form 
      action={formAction}
      onSubmit={(e) => {
        e.preventDefault();
        const confimed = confirm("Are you sure you want to delete this task?");
        if (confimed) {
          formAction(new FormData(e.currentTarget));
        }
      }}
    >
      <input type="hidden" name="boardId" value={boardId} />
      <input type="hidden" name="taskId" value={taskId} />
      <input type="hidden" name="taskTitle" value={taskTitle} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}
