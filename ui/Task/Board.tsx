'use client';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { BoardDetails } from "@/types/types";
import CreateColumnForm from "@/ui/Forms/CreateColumnForm";
import { TaskSummary } from '@/types/types';
import { Card, CardHeader, CardBody, CardFooter, CardHeaderGrab } from '@/ui/Card/Card';
import DeleteColumnForm from '../Forms/DeleteColumnForm';
import CreateTaskFormSimple from '../Forms/CreateTaskFormSimple';
import TaskItem from "@/ui/Task/TaskItem";
import { ColumnWithTasks } from '@/types/types';

interface BoardProps {
  board: BoardDetails;
}

export default function Board({ board: initialBoard }: BoardProps) {
  const [board, setBoard] = useState(initialBoard);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceColumn = board.columns.find(col => col.id === source.droppableId);
    const destColumn = board.columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    if (source.droppableId === destination.droppableId) {
      const copiedTasks = [...sourceColumn.tasks];
      const [removed] = copiedTasks.splice(source.index, 1);
      copiedTasks.splice(destination.index, 0, removed);

      const newBoard = {
        ...board,
        columns: board.columns.map(col => 
          col.id === sourceColumn.id ? {...col, tasks: copiedTasks} : col
        )
      };

      setBoard(newBoard);
    } else {
      const sourceTasks = [...sourceColumn.tasks];
      const destTasks = [...destColumn.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      const newBoard = {
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

      setBoard(newBoard);
    }
  };

  useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
        {(provided) => (
          <div
            className="flex gap-3 md:gap-5 no-scrollbar overflow-x-scroll"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {board.columns.map((column, columnIndex) => (
              <Draggable key={column.id} draggableId={column.id} index={columnIndex}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className='shrink-0 w-72'
                  >
                    <Card>
                      <CardHeader 
                        className='tracking-tight' 
                        showGrab
                      >
                        <div className='flex justify-between' {...provided.dragHandleProps}>
                          {column.title}
                          <DeleteColumnForm columnId={column.id} boardId={board.id} />
                        </div>
                      </CardHeader>
  
                      <Droppable droppableId={column.id} type="TASK">
                        {(provided) => (
                          <CardBody>
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                              {column.tasks.map((task, taskIndex) => (
                                <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`mb-2`}
                                    >
                                      <TaskItem
                                        task={task}
                                        boardId={board.id}
                                        columnId={column.id}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          </CardBody>
                        )}
                      </Droppable>
  
                      <CardFooter className='pt-2'>
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
