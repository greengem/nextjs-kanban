'use client'
import { handleEditTask } from "@/actions/TaskActions";
import { useFormState, useFormStatus } from "react-dom";
import { useState, useEffect } from "react";
import { IconEdit } from "@tabler/icons-react";
import toast from "react-hot-toast";

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
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
      toast.success(`${title} Updated Successfully`);
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
          <span>{title}</span>
          <button type="button" onClick={toggleEdit}><IconEdit size={20} /></button>
        </div>

      ) : (

        <div>
          <input autoFocus type='text' name='taskTitle' id='editTaskTitle' defaultValue={title} className="mb-1 w-full p-2 border rounded" />
          <SubmitButton />
        </div>

      )}

      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
      
    </form>
  )
}
