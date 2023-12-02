'use client'
import { handleUpdateBoard } from "@/actions/UpdateAll";
import { useFormState, useFormStatus } from "react-dom";
import { BoardDetails } from "@/types/types";

interface BoardProps {
    board: BoardDetails;
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      className="px-4 py-2 bg-purple-500 text-white rounded-md text-sm"
    >
        Save Changes
    </button>
  )
}

export default function UpdateBoardForm({ board }: BoardProps) {
  const [state, formAction] = useFormState(handleUpdateBoard, null)

  return (
    <form action={formAction} className="mt-5">
        <input
            type='hidden'
            name="boardData"
            value={JSON.stringify(board)}
        />

        <SubmitButton />

        <pre aria-live="polite" role="status">
            {state?.message}
        </pre>
    </form>
  )
}
