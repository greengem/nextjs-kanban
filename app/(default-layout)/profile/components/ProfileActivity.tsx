import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { ActivityWithUser } from "@/types/types";
import { generateActivityMessage } from "./activityMessage";

export default async function ProfileActivity() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const activities = await prisma.activity.findMany({
    where: {
      userId: userId,
      board: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      user: true,
      task: {
        select: {
          title: true,
        },
      },
      board: true,
      oldColumn: true,
      newColumn: true,
      originalColumn: true,
      targetUser: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (activities.length === 0) {
    return (
      <li className="border-b-1 last:border-b-0 border-zinc-700 py-1">
        No activities found
      </li>
    );
  }

  return (
    <>
      {activities.map((activity: ActivityWithUser) => (
        <li
          key={activity.id}
          className="border-b-1 last:border-b-0 border-zinc-700 py-1 text-sm"
        >
          {generateActivityMessage(activity)}
        </li>
      ))}
    </>
  );
}
