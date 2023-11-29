'use client'
import { handleCreateColumn } from "@/actions/ColumnActions";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      className="px-2 py-1 bg-purple-500 text-white rounded-md text-sm w-full"
    >
      New Column
    </button>
  )
}

export default function CreateColumnForm({ boardId }: { boardId: string }) {
  const [state, formAction] = useFormState(handleCreateColumn, null)
  return (
    <form action={formAction}>
      <div className="mb-2">
        <label htmlFor="columnTitle" className="sr-only">Column Title</label>
        <input type="text" id="columnTitle" name="columnTitle" className="w-full p-2 border rounded text-sm text-black" placeholder="New Column" />
      </div>

      <input type="hidden" name="boardId" value={boardId} />

      <SubmitButton />

      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>

    </form>
  )
}
