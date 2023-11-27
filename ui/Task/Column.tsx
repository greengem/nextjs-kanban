import { ReactNode } from 'react';
import DeleteColumnForm from '../Forms/DeleteColumnForm';

interface ColumnProps {
  title: string;
  columnId: string;
  children: ReactNode;
  boardId: string;
}

const Column: React.FC<ColumnProps> = ({ title, columnId, boardId, children }) => {
  return (
    <div className="bg-blue-300 p-5 w-64 rounded-lg">
      <h4 className='font-semibold mb-2'>{title}</h4>
      <div>
        <ul className='text-sm space-y-2 mb-5'>
          {children}
        </ul>
      </div>
      New Task
      <DeleteColumnForm boardId={boardId} columnId={columnId} />
    </div>
  );
}

export default Column;
