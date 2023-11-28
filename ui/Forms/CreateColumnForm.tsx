'use client'
import { handleCreateColumn } from "@/actions/ColumnActions";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Create New Column
    </button>
  )
}

export default function CreateColumnForm({ boardId }: { boardId: string }) {
  const [state, formAction] = useFormState(handleCreateColumn, null)
  return (
    <form action={formAction}>
      <div className="mb-3">
        <label htmlFor="columnTitle" className="block mb-2 text-sm font-medium">Column Title</label>
        <input type="text" id="columnTitle" name="columnTitle" className="w-full p-2 border rounded" />
      </div>

      <input type="hidden" name="boardId" value={boardId} />

      <SubmitButton />

      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>

    </form>
  )
}
