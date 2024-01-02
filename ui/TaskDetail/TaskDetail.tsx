import { getTask } from "@/lib/FetchData";
import { ExpandedTask } from "@/types/types";
import TaskDetailTitle from "./TaskDetailTitle/TaskModalTitle";
import TaskDetailSidebar from "./TaskDetailSidebar/TaskDetailSidebar";
import TaskDetailView from "./TaskDetailView/TaskDetailView";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "../Card/Card";

export default async function TaskDetail({ taskId }: { taskId: string }) {
  const task: ExpandedTask | null = await getTask(taskId);

  if (!task) {
    return <div>Task not found or loading error</div>;
  }

  // Define a variable to store the background style
  let backgroundStyle = {};

  // Check if the task's column has a backgroundUrl
  if (task.column && task.column.board && task.column.board.backgroundUrl) {
    backgroundStyle = {
      backgroundImage: `url(${task.column.board.backgroundUrl})`,
    };
  }

  return (
    <div
      className={`flex flex-col grow backdrop-blur-sm py-5 bg-cover bg-center bg-gradient-to-tl from-zinc-100 to-primary`}
      style={backgroundStyle}
    >
      <div className="flex-none ml-5 mb-5">
              <Button
                as={Link}
                className="inline-flex"
                href={`/board/${task.column?.boardId}`}
                size="sm"
                startContent={<IconArrowLeft size={18} />}
              >
          Back to board
        </Button>
        </div>

      <Card className="mx-5">
        <CardBody>


        <TaskDetailTitle selectedTask={task} boardId={task?.column.boardId} />

        <div className="grid grid-cols-1 md:grid-cols-4 p-5">
          <TaskDetailView task={task} />
          <TaskDetailSidebar task={task} />
        </div>
        </CardBody>
      </Card>
    </div>
    
  );
}
