import { handleDeleteColumn } from "@/actions/ColumnActions";

interface DeleteColumnFormProps {
    boardId: string;
    columnId: string;
}

const DeleteColumnForm: React.FC<DeleteColumnFormProps> = ({ columnId, boardId }) => {
  return (
    <form action={handleDeleteColumn}>
      <input type="hidden" name="boardId" value={boardId} />
      <input type="hidden" name="columnId" value={columnId} />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Delete Column</button>
    </form>
  )
}

export default DeleteColumnForm;
