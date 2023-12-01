'use client';
import { useState, useEffect } from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { BoardDetails } from "@/types/types";
import CreateColumnForm from "@/ui/Forms/CreateColumnForm";
import Column from "@/ui/Task/Column";

interface BoardProps {
  board: BoardDetails;
}

export default function Board({ board }: BoardProps) {
  const [columns, setColumns] = useState(board.columns);

  useEffect(() => {
    setColumns(board.columns);
  }, [board.columns]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
  
    // Check if the item is dropped in a valid location
    if (!over || active.id === over.id) {
      return;
    }
  
    // Find the column which contains the task being dragged
    const column = columns.find(col => col.tasks.some(task => task.id === active.id));
    
    if (column) {
      // Find the indexes of the task being dragged and the task it is dropped over
      const oldIndex = column.tasks.findIndex(task => task.id === active.id);
      const newIndex = column.tasks.findIndex(task => task.id === over.id);
  
      // Create a new array with the tasks reordered
      const reorderedTasks = arrayMove(column.tasks, oldIndex, newIndex);
  
      // Update the state with the new columns array
      setColumns(prevColumns => {
        return prevColumns.map(col => {
          if (col.id === column.id) {
            return { ...col, tasks: reorderedTasks };
          }
          return col;
        });
      });
    }
  };
  
  
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>

      <ul className="flex gap-3 md:gap-5 no-scrollbar overflow-x-scroll">

        {columns.map(column => (

          <SortableContext key={column.id} items={column.tasks} strategy={verticalListSortingStrategy}>

            <Column key={column.id} boardId={board.id} column={column} />
            
          </SortableContext>

        ))}

        <CreateColumnForm boardId={board.id} />

      </ul>

    </DndContext>
  );
}
