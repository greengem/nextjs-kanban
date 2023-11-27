import { handleCreateColumn } from "@/actions/ColumnActions";

interface NewColumnFormProps {
  boardId: string;
}

const NewColumnForm: React.FC<NewColumnFormProps> = ({ boardId }) => {
  return (
    <form action={handleCreateColumn}>
      <div className="mb-3">
        <label htmlFor="columnTitle" className="block mb-2 text-sm font-medium">Column Title</label>
        <input type="text" id="columnTitle" name="columnTitle" className="w-full p-2 border rounded" />
      </div>

      <input type="hidden" name="boardId" value={boardId} />

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create New Column</button>
    </form>
  )
}

export default NewColumnForm;
