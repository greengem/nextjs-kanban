import { ReactNode } from 'react';
import DeleteColumnForm from '../Forms/DeleteColumnForm';
import CreateTaskFormSimple from '../Forms/CreateTaskFormSimple';
import { Card, CardHeader, CardBody, CardFooter } from '@/ui/Card/Card';

interface ColumnProps {
  title: string;
  columnId: string;
  children: ReactNode;
  boardId: string;
}

const Column: React.FC<ColumnProps> = ({ title, columnId, boardId, children }) => {
  return (
    <Card>
      <CardHeader>
        <h4 className='tracking-tight'>{title}</h4>
        <DeleteColumnForm boardId={boardId} columnId={columnId} columnTitle={title} />
      </CardHeader>
      <CardBody>
        <ul className='text-sm'>
          {children}
        </ul>
      </CardBody>
      <CardFooter>
        <CreateTaskFormSimple boardId={boardId} columnId={columnId} />
      </CardFooter>
    </Card>
  );
}

export default Column;
