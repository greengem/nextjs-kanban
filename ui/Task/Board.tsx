'use client';
import { useState } from 'react';
import { Reorder } from "framer-motion"
import { BoardDetails, ColumnWithTasks } from "@/types/types";
import CreateColumnForm from "@/ui/Forms/CreateColumnForm";
import Column from "@/ui/Task/Column";
import { Card, CardBody } from '@/ui/Card/Card';

interface BoardProps {
  board: BoardDetails;
}

interface ColumnListProps {
  columns: ColumnWithTasks[];
  boardId: string;
}

const ColumnList: React.FC<ColumnListProps> = ({ columns, boardId }) => (
  <>
    {columns.map(column => (
      <Column key={column.id} boardId={boardId} column={column} />
    ))}
  </>
);

export default function Board({ board }: BoardProps) {
  const [columns, setColumns] = useState(board.columns);

  return (
    <Reorder.Group axis="x" values={columns} onReorder={setColumns} className='flex gap-5'>
      <ColumnList columns={columns} boardId={board.id} />
      <li className="flex-col flex-shrink-0 w-64">
        <Card>
          <CardBody>
            <CreateColumnForm boardId={board.id} />
          </CardBody>
        </Card>
      </li>
    </Reorder.Group>
  );
}
