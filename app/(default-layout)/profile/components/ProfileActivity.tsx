import { auth } from "@/auth";
import prisma from '@/db/prisma';
import { format } from 'date-fns';
import { ActivityWithUser } from "@/types/types";

const getActivityMessage = (activity: ActivityWithUser) => {
    const taskTitle = activity.task?.title ?? "Unnamed Task";

    const bold = (text: string) => <span className="font-semibold">{text}</span>;

    const oldColumnTitle = activity.oldColumn?.title ?? "Previous Column";
    const newColumnTitle = activity.newColumn?.title ?? "Next Column";
    const originalColumnTitle = activity.originalColumn?.title ?? "Original Column";

    switch (activity.type) {
        case 'TASK_MOVED':
            return <>Moved {bold(taskTitle)} from {bold(oldColumnTitle)} to {bold(newColumnTitle)}</>;
        case 'TASK_CREATED':
            return <>Added {bold(taskTitle)} to {bold(originalColumnTitle)}</>;
        case 'START_DATE_ADDED':
            return <>Set the start date of {bold(taskTitle)} to {bold(formatDate(activity.startDate))}</>;
        case 'START_DATE_UPDATED':
            return <>Changed the start date of {bold(taskTitle)} to {bold(formatDate(activity.startDate))}</>;
        case 'START_DATE_REMOVED':
            return <>Removed the start date of {bold(taskTitle)}</>;
        case 'DUE_DATE_ADDED':
            return <>Set the due date of {bold(taskTitle)} to {bold(formatDate(activity.dueDate))}</>;
        case 'DUE_DATE_UPDATED':
            return <>Changed the due date of {bold(taskTitle)} to {bold(formatDate(activity.dueDate))}</>;
        case 'DUE_DATE_REMOVED':
            return <>Removed the due date of {bold(taskTitle)}</>;
        default:
            return <>{activity.content}</>;
    }
};

const formatDate = (date: Date | null) => {
    return date ? format(new Date(date), 'dd/MM/yyyy') : 'N/A';
};


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
                        userId: userId
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc',
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
        },
    });

    if (activities.length === 0) {
        return <li className="border-b-1 last:border-b-0 border-zinc-300 py-1">No activities found</li>;
    }

    return (
        <>
            {activities.map((activity: ActivityWithUser) => (
                <li key={activity.id} className="border-b-1 last:border-b-0 border-zinc-300 py-1">
                    {getActivityMessage(activity)}
                </li>
            ))}
        </>
    );
}
