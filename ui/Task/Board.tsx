'use client';
import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
} from '@dnd-kit/sortable';
import { BoardDetails } from "@/types/types";
import CreateColumnForm from "@/ui/Forms/CreateColumnForm";
import Column from "@/ui/Task/Column";
import TaskItemDraggable from './TaskItemDraggable';
import { TaskSummary } from '@/types/types';
import UpdateBoardForm from '../Forms/UpdateBoard';

interface BoardProps {
  board: BoardDetails;
}

export default function Board({ board: initialBoard }: BoardProps) {
  const [board, setBoard] = useState(initialBoard);
  const [activeId, setActiveId] = useState(null);
  const [activeTask, setActiveTask] = useState<TaskSummary | null>(null);

  useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  function handleDragStart(event: DragStartEvent) {
    const draggedTaskId = event.active.id;
    const fromColumnId = event.active.data.current?.sortable.containerId;
  
    if (!fromColumnId) return;
  
    const fromColumnIndex = board.columns.findIndex(column => column.id === fromColumnId);
    const draggedTask = board.columns[fromColumnIndex]?.tasks.find(task => task.id === draggedTaskId);
  
    if (draggedTask) {
      setActiveTask(draggedTask);
    }
  }
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
  
    // Ensure we have a valid drop target
    if (over && active.id !== over.id) {
      const fromColumnId = active.data.current?.sortable.containerId;
      const toColumnId = over.data.current?.sortable.containerId;
  
      // Exit if we don't have valid container IDs
      if (!fromColumnId || !toColumnId) {
        return;
      }
  
      const fromColumnIndex = board.columns.findIndex(column => column.id === fromColumnId);
      const toColumnIndex = board.columns.findIndex(column => column.id === toColumnId);
  
      // Exit if column indices are invalid
      if (fromColumnIndex === -1 || toColumnIndex === -1) {
        return;
      }
  
      // Reordering within the same column
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
        // Moving to a different column
        const task = board.columns[fromColumnIndex].tasks.find(task => task.id === active.id);
        if (!task) {
          return;
        }
  
        // Determine the index to insert the task in the new column
        const overIndex = over.data.current?.sortable.index ?? board.columns[toColumnIndex].tasks.length;
  
        // Move the task to the new column at the determined index
        setBoard(prevBoard => {
          const newColumns = [...prevBoard.columns];
          const newToColumnTasks = [...newColumns[toColumnIndex].tasks];
          newToColumnTasks.splice(overIndex, 0, task);
  
          newColumns[fromColumnIndex] = {
            ...newColumns[fromColumnIndex],
            tasks: newColumns[fromColumnIndex].tasks.filter(task => task.id !== active.id)
          };
          newColumns[toColumnIndex] = {
            ...newColumns[toColumnIndex],
            tasks: newToColumnTasks
          };
  
          return { ...prevBoard, columns: newColumns };
        });
      }
    }
  };
  
  return (
    <>
    <UpdateBoardForm board={board} />

    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
      onDragEnd={handleDragEnd} 
      onDragStart={handleDragStart} 
      id="dnd-context-id"
    >
      <div className="flex gap-3 md:gap-5 no-scrollbar overflow-x-scroll">

        {board.columns.map(column => (
            <Column key={column.id} boardId={board.id} column={column} />
        ))}

        <CreateColumnForm boardId={board.id} />

        <DragOverlay>
        {activeTask ? <TaskItemDraggable task={activeTask} /> : null}
        </DragOverlay>

      </div>
    </DndContext>
          </>
  );
}
