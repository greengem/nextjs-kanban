import { ReactNode } from 'react';
import DeleteColumnForm from '../Forms/DeleteColumnForm';
import CreateTaskFormSimple from '../Forms/CreateTaskFormSimple';

interface ColumnProps {
  title: string;
  columnId: string;
  children: ReactNode;
  boardId: string;
}

const Column: React.FC<ColumnProps> = ({ title, columnId, boardId, children }) => {
  return (
    <div className="w-full md:w-64">
      <div className='flex justify-between items-center bg-blue-300 rounded-t-lg py-2 px-5'>
        <h4 className='tracking-tight'>{title}</h4>
        <DeleteColumnForm boardId={boardId} columnId={columnId} columnTitle={title} />
      </div>
      <div className='bg-blue-200 px-2 py-3'>
        <ul className='text-sm space-y-2'>
          {children}
        </ul>
      </div>
      <div className='bg-blue-300 p-3 rounded-b-lg'>
        <CreateTaskFormSimple boardId={boardId} columnId={columnId} />
      </div>
    </div>
  );
}

export default Column;
