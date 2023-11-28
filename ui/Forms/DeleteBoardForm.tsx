'use client'

import { useFormState, useFormStatus } from "react-dom";
import { handleDeleteBoard } from "@/actions/BoardActions";
import { IconTrash } from "@tabler/icons-react";

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

export default function DeleteBoardForm({ boardTitle, boardId }: { boardTitle: string; boardId: string; }) {
  const [state, formAction] = useFormState(handleDeleteBoard, null)

  return (
    <form 
      action={formAction}
      onSubmit={(e) => {
        e.preventDefault();
        const confimed = confirm("Are you sure you want to delete this board?");
        if (confimed) {
          formAction(new FormData(e.currentTarget));
        }
      }}
    >
      <input type="hidden" name="boardId" value={boardId} />
      <input type="hidden" name="boardTitle" value={boardTitle} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}

