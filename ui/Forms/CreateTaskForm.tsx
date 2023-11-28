'use client'
import { handleCreateTask } from "@/actions/TaskActions";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Create New Task
    </button>
  )
}

export default function CreateTaskForm({ boardId, columnId }: { boardId: string; columnId: string;  }) {
  const [state, formAction] = useFormState(handleCreateTask, initialState)
  return (
    <form action={formAction}>
      <div className="mb-3">
        <label htmlFor="taskTitle" className="block mb-2 text-sm font-medium">Task Title</label>
        <input type="text" id="taskTitle" name="taskTitle" className="w-full p-2 border rounded" required />
      </div>

      <div className="mb-3 hidden">
        <label htmlFor="taskDescription" className="block mb-2 text-sm font-medium">Task Description</label>
        <input type="text" id="taskDescription" name="taskDescription" className="w-full p-2 border rounded" />
      </div>



      <input type="hidden" name="boardId" value={boardId} />
      <input type="hidden" name="columnId" value={columnId} />

      <SubmitButton />
      
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
      
    </form>
  )
}
