'use client';
import { useState, useEffect } from 'react';
import { Session } from "next-auth";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { BoardDetails } from "@/types/types";
import CreateColumnForm from "@/ui/Forms/CreateColumnForm";
import { Card, CardHeader, CardBody, CardFooter } from '@/ui/Card/Card';
import TaskItem from './TaskItem';
import CreateTaskFormSimple from '@/ui/Forms/CreateTaskFormSimple';
import ColumnActions from './ColumnActions';

interface BoardProps {
  board: BoardDetails;
  session: Session | null;
}

export default function Board({ board: initialBoard, session }: BoardProps) {
  const [board, setBoard] = useState(initialBoard);
  
  // Handle DnD Drag End
  const onDragEnd = async (result: DropResult) => {
    const { source, destination, type } = result;
  
    if (!destination) {
      return;
    }
  
    let newBoard = { ...board };
  
    if (type === "COLUMN") {
      const newColumns = Array.from(board.columns);
      const [removedColumn] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, removedColumn);
      newColumns.forEach((col, index) => col.order = index + 1);
  
      newBoard = {
        ...board,
        columns: newColumns
      };
    } else {
      const sourceColumn = board.columns.find(col => col.id === source.droppableId);
      const destColumn = board.columns.find(col => col.id === destination.droppableId);
  
      if (!sourceColumn || !destColumn) return;
  
      if (source.droppableId === destination.droppableId) {
        const copiedTasks = [...sourceColumn.tasks];
        const [removed] = copiedTasks.splice(source.index, 1);
        copiedTasks.splice(destination.index, 0, removed);
        copiedTasks.forEach((task, index) => task.order = index + 1);
  
        newBoard = {
          ...board,
          columns: board.columns.map(col => 
            col.id === sourceColumn.id ? {...col, tasks: copiedTasks} : col
          )
        };
      } else {
        const sourceTasks = [...sourceColumn.tasks];
        const destTasks = [...destColumn.tasks];
        const [removed] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, removed);
  
        sourceTasks.forEach((task, index) => task.order = index + 1);
        destTasks.forEach((task, index) => task.order = index + 1);
  
        newBoard = {
          ...board,
          columns: board.columns.map(col => {
            if (col.id === sourceColumn.id) {
              return {...col, tasks: sourceTasks};
            } else if (col.id === destColumn.id) {
              return {...col, tasks: destTasks};
            } else {
              return col;
            }
          })
        };
      }
    }
  
    setBoard(newBoard);
  
    try {
      await fetch(`/api/board/${board.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boardData: newBoard }),
      });

    } catch (error) {
      console.error('Error updating board:', error);
    }
  };
  
  // Update the state when the db is changed and refetched
  useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);
  
  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              className="grow flex overflow-x-scroll px-2 "
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {board.columns.map((column, columnIndex) => (
                <Draggable key={column.id} draggableId={column.id} index={columnIndex}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className='shrink-0 w-64 md:w-72 lg:w-80 mx-2'
                    >
                      <Card>
                        <CardHeader 
                          className='tracking-tight' 
                          showGrab
                          dragHandleProps={provided.dragHandleProps ?? undefined}
                        >
                          <div className='flex justify-between items-center gap-2 pl-1'>
                            <ColumnActions columnId={column.id} boardId={board.id} columnTitle={column.title} />
                          </div>
                        </CardHeader>
    
                        <Droppable droppableId={column.id} type="TASK">
                          {(provided) => (
                            <CardBody className='bg-white'>
                              <div ref={provided.innerRef} {...provided.droppableProps}>
                                {column.tasks.length === 0 ? (
                                  <div className="
                                    bg-zinc-200
                                    font-semibold
                                    text-center text-xs
                                    py-4
                                    rounded-lg
                                    border-dashed border-2 border-zinc-400
                                  ">
                                    Drop here
                                  </div>
                                ) : (
                                  column.tasks.map((task, taskIndex) => (
                                    <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          className="mb-2"
                                        >
                                          <TaskItem
                                            task={task}
                                            dragHandleProps={provided.dragHandleProps}
                                          />
                                        </div>
                                      )}
                                    </Draggable>
                                  ))
                                )}
                                {provided.placeholder}
                              </div>
                            </CardBody>

                          )}
                        </Droppable>
    
                        <CardFooter>
                          <CreateTaskFormSimple boardId={board.id} columnId={column.id} />
                        </CardFooter>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <CreateColumnForm boardId={board.id} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
  );
}
