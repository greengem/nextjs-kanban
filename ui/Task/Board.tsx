'use client';
import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { BoardDetails } from "@/types/types";
import CreateColumnForm from "@/ui/Forms/CreateColumnForm";
import Column from "@/ui/Task/Column";

interface BoardProps {
  board: BoardDetails;
}

export default function Board({ board: initialBoard }: BoardProps) {
  const [board, setBoard] = useState(initialBoard);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragOver = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const fromColumnId = active.data.current.sortable.containerId;
    const toColumnId = over.data.current.sortable.containerId;

    if (fromColumnId !== toColumnId) {
      // Logic to handle item being dragged over a different column
      // Update state to reflect the item's new position for better visual feedback
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
  
    if (over && active.id !== over.id) {
      const fromColumnId = active.data.current.sortable.containerId;
      const toColumnId = over.data.current.sortable.containerId;
  
      console.log("From Column ID:", fromColumnId);
      console.log("To Column ID:", toColumnId);
  
      const fromColumnIndex = board.columns.findIndex(column => column.id === fromColumnId);
      const toColumnIndex = board.columns.findIndex(column => column.id === toColumnId);
  
      console.log("From Column Index:", fromColumnIndex);
      console.log("To Column Index:", toColumnIndex);
  
      if (fromColumnIndex === -1 || toColumnIndex === -1) {
        console.error("Column not found. Check column IDs.");
        return;
      }
  
      const fromColumn = board.columns[fromColumnIndex];
      const toColumn = board.columns[toColumnIndex];
  
      console.log("From Column:", fromColumn);
      console.log("To Column:", toColumn);
  
      if (fromColumnId === toColumnId) {
        const oldIndex = board.columns[fromColumnIndex].tasks.findIndex(task => task.id === active.id);
        const newIndex = board.columns[toColumnIndex].tasks.findIndex(task => task.id === over.id);
  
        const reorderedTasks = arrayMove(board.columns[fromColumnIndex].tasks, oldIndex, newIndex);
  
        setBoard(prevBoard => {
          const newColumns = [...prevBoard.columns];
          newColumns[fromColumnIndex] = {
            ...newColumns[fromColumnIndex],
            tasks: reorderedTasks
          };
          return { ...prevBoard, columns: newColumns };
        });
      } else {
        const task = board.columns[fromColumnIndex].tasks.find(task => task.id === active.id);
  
        if (!task) {
          console.error("Task not found in the column. Check task IDs.");
          return;
        }
  
        setBoard(prevBoard => {
          const newColumns = [...prevBoard.columns];
          newColumns[fromColumnIndex] = {
            ...newColumns[fromColumnIndex],
            tasks: newColumns[fromColumnIndex].tasks.filter(task => task.id !== active.id)
          };
          newColumns[toColumnIndex] = {
            ...newColumns[toColumnIndex],
            tasks: [...newColumns[toColumnIndex].tasks, task]
          };
  
          return { ...prevBoard, columns: newColumns };
        });
      }
    }
  };
  
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragOver={handleDragOver} id="unique-dnd-context-id">
      <ul className="flex gap-3 md:gap-5 no-scrollbar overflow-x-scroll">
        {board.columns.map(column => (
          <SortableContext key={column.id} items={column.tasks} strategy={verticalListSortingStrategy}>
            <Column key={column.id} boardId={board.id} column={column} />
          </SortableContext>
        ))}
        <CreateColumnForm boardId={board.id} />
      </ul>
    </DndContext>
  );
}
