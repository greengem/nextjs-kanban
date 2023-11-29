'use client'
import { handleEditTask } from "@/actions/TaskActions";
import { useFormState, useFormStatus } from "react-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IconX } from "@tabler/icons-react";

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      className="px-3 py-1 bg-purple-500 text-white rounded-md text-sm"
    >
      Save
    </button>
  )
}

export default function EditTaskForm({ title, taskId, boardId }: { title: string; taskId: string; boardId: string;  }) {
  const [state, formAction] = useFormState(handleEditTask, null)
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (state?.message) {
      setIsEditing(false);
      toast.success(state.message);
    }
  }, [state?.message]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="boardId" value={boardId} />
      <input type="hidden" name="taskId" value={taskId} />

      {!isEditing ? (
        <div className="flex justify-between">
          <span onClick={toggleEdit} className="cursor-pointer w-full">{title}</span>
        </div>
      ) : (
        <div>
          <input autoFocus type='text' name='taskTitle' id='editTaskTitle' defaultValue={title} className="mb-2 w-full p-2 rounded bg-zinc-900" />
          <div className="flex items-center justify-between">
            <SubmitButton />
            <button onClick={toggleEdit} type="button" className="p-1"><IconX size={20} /></button>
          </div>
        </div>
      )}

      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}
