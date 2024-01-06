import prisma from '@/db/prisma';
import TaskDetailTitle from "./TaskDetailTitle/TaskModalTitle";
import TaskDetailSidebar from "./TaskDetailSidebar/TaskDetailSidebar";
import TaskDetailView from "./TaskDetailView/TaskDetailView";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "../Card/Card";

export default async function TaskDetail({ taskId }: { taskId: string }) {

  const task = await prisma.task.findUnique({
    where: {
        id: taskId
    },
    select: {
        id: true,
        title: true,
        description: true,
        dueDate: true,
        startDate: true,
        createdAt: true,
        updatedAt: true,
        order: true,
        columnId: true,
        column: {
            select: {
                title: true,
                boardId: true,
                board: {
                    select: {
                        backgroundUrl: true,
                    }
                }
            },
        },
        labels: {
            select: {
                id: true,
                title: true,
                color: true
            }
        },
        checklists: {
            select: {
                id: true,
                title: true,
                items: {
                    orderBy: {
                        createdAt: 'asc'
                    },
                    select: {
                        id: true,
                        content: true,
                        isChecked: true,
                        createdAt: true
                    }
                }
            }
        },
        activities: {
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                type: true,
                content: true,
                createdAt: true,
                startDate: true,
                dueDate: true,
                oldColumn: {
                    select: { title: true },
                },
                newColumn: {
                    select: { title: true },
                },
                originalColumn: {
                    select: { title: true },
                },
                task: {
                    select: {
                      title: true,
                    },
                  },
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                },
            }
        }
    }
  });

  if (!task) {
    return <div>Task not found or loading error</div>;
  }

  let backgroundStyle = {};

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
        <CardBody className="bg-white">


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
