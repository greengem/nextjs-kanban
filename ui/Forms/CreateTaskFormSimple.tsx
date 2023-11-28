'use client'
import { handleCreateTask } from "@/actions/TaskActions";
import { useFormState, useFormStatus } from "react-dom";
import { useState, useEffect } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";

const initialState = {
  message: "",
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
    >
      Add Card
    </button>
  )
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      type="button"
      aria-label="Close form"
      onClick={onClick}
    >
      <IconX size={20} />
    </button>
  );
}

export default function CreateTaskForm({ boardId, columnId }: { boardId: string; columnId: string;  }) {
  const [state, formAction] = useFormState(handleCreateTask, initialState);
  const [isInputVisible, setInputVisible] = useState(false);
  const handleToggleInput = () => setInputVisible(!isInputVisible);


  return (
    <div>
      {isInputVisible ? (
<>
        <form action={formAction}>

          <div className="mb-2">
            <label htmlFor="taskTitle" className="block mb-2 font-medium sr-only">Task Title</label>
            <input autoFocus type="text" id="taskTitle" name="taskTitle" className="w-full px-2 py-2 border rounded text-sm" required />
          </div>

          <input type="hidden" name="boardId" value={boardId} />
          <input type="hidden" name="columnId" value={columnId} />

          <div className="flex justify-between items-center">
            <SubmitButton />
            <CloseButton onClick={handleToggleInput} />
          </div>
          

          <p aria-live="polite" className="sr-only" role="status">
            {state?.message}
          </p>
          
        </form>
</>
      ) : (

        <button onClick={handleToggleInput} className="text-sm flex items-center gap-2">
          <IconPlus size={16} />Add a card
        </button>

      )}  
    </div>
  )
}
