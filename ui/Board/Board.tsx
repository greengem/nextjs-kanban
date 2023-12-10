'use client';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useDisclosure } from '@nextui-org/react';
import { BoardDetails, TaskSummary } from "@/types/types";
import CreateColumnForm from "@/ui/Forms/CreateColumnForm";
import { Card, CardHeader, CardBody, CardFooter } from '@/ui/Card/Card';
import TaskItem from "@/ui/Task/TaskItem";
import CreateTaskFormSimple from '../Forms/CreateTaskFormSimple';
import ColumnActions from './ColumnActions';
import TaskModal from '../TaskModal/TaskModal';

interface BoardProps {
  board: BoardDetails;
}

export default function Board({ board: initialBoard }: BoardProps) {
  // State for entire Board data
  const [board, setBoard] = useState(initialBoard);

  //State to track selected task for modal
  const [selectedTask, setSelectedTask] = useState<TaskSummary | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const handleTaskClick = (task: TaskSummary) => {
    setSelectedTask(task);
    onOpen(); // Opens the modal
  };
  
  const handleCloseModal = () => {
    onClose(); // Closes the modal
    setSelectedTask(null); // Clears selected task when modal closes
  };
  
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

  useEffect(() => {
    if (selectedTask) {
      // Find the updated task in the new board state
      const updatedTask = board.columns
        .flatMap(column => column.tasks)
        .find(task => task.id === selectedTask.id);
  
      // Update selectedTask if the task data has changed
      if (updatedTask && (updatedTask !== selectedTask)) {
        setSelectedTask(updatedTask);
      }
    }
  }, [board, selectedTask]);
  
  
  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
        {(provided) => (
          <div
            className="flex no-scrollbar overflow-x-scroll"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {board.columns.map((column, columnIndex) => (
              <Draggable key={column.id} draggableId={column.id} index={columnIndex}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className='shrink-0 w-64 md:w-72 lg:w-80 xl:w-96 mr-5'
                  >
                    <Card>
                      <CardHeader 
                        className='tracking-tight' 
                        showGrab
                        dragHandleProps={provided.dragHandleProps ?? undefined}
                      >
                        <div className='flex justify-between items-center gap-2'>
                          <ColumnActions columnId={column.id} boardId={board.id} columnTitle={column.title} />
                        </div>
                      </CardHeader>
  
                      <Droppable droppableId={column.id} type="TASK">
                        {(provided) => (
                          <CardBody>
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                              {column.tasks.length === 0 ? (
                                <div className="
                                  bg-zinc-800 text-zinc-400
                                  text-center text-sm
                                  py-3
                                  rounded-lg
                                  border-dashed border-3 border-zinc-700
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
                                          onTaskClick={handleTaskClick}
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

    <TaskModal
      isOpen={isOpen}
      onClose={handleCloseModal}
      selectedTask={selectedTask}
      boardId={board.id}
    />
</>
  );
}
