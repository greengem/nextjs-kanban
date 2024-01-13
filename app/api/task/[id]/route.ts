import prisma from '@/db/prisma';
import { auth } from "@/auth";

export async function GET(request: Request, { params }: { params: { id: string }}) {
    const taskId = params.id;

    // Authenticate and get the user session
    const session = await auth();
    const userId = session?.user?.id;

    // Check if the user is a member of the board associated with the task
    const boardMembership = await prisma.boardMember.findFirst({
        where: {
            userId: userId,
            board: {
                columns: {
                    some: {
                        tasks: {
                            some: { id: taskId }
                        }
                    }
                }
            }
        }
    });

    // If the user is not a board member, return an error response
    if (!boardMembership) {
        return new Response(JSON.stringify({ error: "Access denied: User is not authorized to view this task" }), {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Fetch the task details
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

    // Return the task details in the response
    if (task) {
        return new Response(JSON.stringify(task), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } else {
        return new Response(JSON.stringify({ error: "Task not found" }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
