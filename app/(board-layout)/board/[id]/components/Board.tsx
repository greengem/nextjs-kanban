"use client";
import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import CreateColumnForm from "@/ui/Forms/CreateColumnForm";
import { Card, CardHeader, CardBody, CardFooter } from "@/ui/Card/Card";
import TaskItem from "./TaskItem";
import CreateTaskForm from "@/ui/Forms/CreateTaskForm";
import ColumnActions from "./ColumnActions";
import { BoardWithColumns } from "@/types/types";
import { handleUpdateBoard } from "@/server-actions/BoardServerActions";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";

export default function Board({ board }: { board: BoardWithColumns }) {
  const [currentBoard, setCurrentBoard] = useState<BoardWithColumns>(board);
  const [originalBoard, setOriginalBoard] = useState<BoardWithColumns>(board);
  const [isSaving, setIsSaving] = useState(false);

  const onDragStart = () => {
    setOriginalBoard({ ...currentBoard });
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }

    let newBoard = { ...currentBoard };

    if (type === "COLUMN") {
      const newColumns = Array.from(currentBoard.columns);
      const [removedColumn] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, removedColumn);
      newColumns.forEach((col, index) => (col.order = index + 1));

      newBoard = {
        ...currentBoard,
        columns: newColumns,
      };
    } else {
      const sourceColumn = currentBoard.columns.find(
        (col) => col.id === source.droppableId,
      );
      const destColumn = currentBoard.columns.find(
        (col) => col.id === destination.droppableId,
      );

      if (!sourceColumn || !destColumn) return;

      if (source.droppableId === destination.droppableId) {
        const copiedTasks = [...sourceColumn.tasks];
        const [removed] = copiedTasks.splice(source.index, 1);
        copiedTasks.splice(destination.index, 0, removed);
        copiedTasks.forEach((task, index) => (task.order = index + 1));

        newBoard = {
          ...currentBoard,
          columns: currentBoard.columns.map((col) =>
            col.id === sourceColumn.id ? { ...col, tasks: copiedTasks } : col,
          ),
        };
      } else {
        const sourceTasks = [...sourceColumn.tasks];
        const destTasks = [...destColumn.tasks];
        const [removed] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, removed);

        sourceTasks.forEach((task, index) => (task.order = index + 1));
        destTasks.forEach((task, index) => (task.order = index + 1));

        newBoard = {
          ...currentBoard,
          columns: currentBoard.columns.map((col) => {
            if (col.id === sourceColumn.id) {
              return { ...col, tasks: sourceTasks };
            } else if (col.id === destColumn.id) {
              return { ...col, tasks: destTasks };
            } else {
              return col;
            }
          }),
        };
      }
    }

    setCurrentBoard(newBoard);
    setIsSaving(true);

    try {
      const result = await handleUpdateBoard(currentBoard.id, {
        columns: newBoard.columns,
        originalColumns: originalBoard.columns,
      });
      setIsSaving(false);
      if (!result.success) {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error updating board:", error);
      setIsSaving(false);
      toast.error("Error saving changes");
    }
  };

  useEffect(() => {
    setCurrentBoard(board);
  }, [board]);

  return (
    <div className="z-10 flex flex-col grow">
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="COLUMN"
        >
          {(provided) => (
            <div
              className="grow flex overflow-x-scroll px-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {currentBoard.columns.map((column, columnIndex) => (
                <Draggable
                  key={column.id}
                  draggableId={column.id}
                  index={columnIndex}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="shrink-0 w-64 md:w-72 lg:w-80 mx-2"
                    >
                      <Card>
                        <CardHeader
                          className="tracking-tight"
                          showGrab
                          dragHandleProps={
                            provided.dragHandleProps ?? undefined
                          }
                        >
                          <div className="flex justify-between items-center gap-2">
                            <ColumnActions
                              columnId={column.id}
                              boardId={currentBoard.id}
                              columnTitle={column.title}
                            />
                          </div>
                        </CardHeader>
                        <Droppable droppableId={column.id} type="TASK">
                          {(provided) => (
                            <CardBody className="bg-zinc-950">
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {column.tasks.length === 0 ? (
                                  <div className="bg-zinc-900 text-center text-xs py-4 rounded-lg border-dashed border-2 border-zinc-700">
                                    Drop here
                                  </div>
                                ) : (
                                  column.tasks.map((task, taskIndex) => (
                                    <Draggable
                                      key={task.id}
                                      draggableId={task.id}
                                      index={taskIndex}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          className="mb-1"
                                        >
                                          <TaskItem
                                            task={task}
                                            dragHandleProps={
                                              provided.dragHandleProps
                                            }
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
                          <CreateTaskForm
                            boardId={currentBoard.id}
                            columnId={column.id}
                          />
                        </CardFooter>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <CreateColumnForm boardId={currentBoard.id} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {isSaving && (
        <div className="fixed bottom-5 right-5 z-20">
          <Spinner color="primary" />
        </div>
      )}
    </div>
  );
}
