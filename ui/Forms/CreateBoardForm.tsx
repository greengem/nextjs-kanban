'use client'
import { handleCreateBoard } from "@/actions/BoardActions";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      className="px-4 py-2 bg-purple-500 text-white rounded-md"
    >
      Create New Board
    </button>
  )
}

export default function CreateBoardForm() {
  const [state, formAction] = useFormState(handleCreateBoard, null)
  return (
    <form action={formAction}>

      <div className="mb-3">
        <label htmlFor="boardTitle" className="block mb-2 text-sm font-medium">Board Title</label>
        <input type="text" id="boardTitle" name="boardTitle" className="w-full p-2 border rounded" required />
      </div>

      <div className="mb-3 hidden">
        <label htmlFor="boardDescription" className="block mb-2 text-sm font-medium">Board Description</label>
        <input type="text" id="boardDescription" name="boardDescription" className="w-full p-2 border rounded" />
      </div>

      <SubmitButton />

      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>

    </form>
  )
}
