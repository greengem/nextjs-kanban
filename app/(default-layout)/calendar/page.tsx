import prisma from '@/db/prisma';
import CalendarClient from './Calendar.client'

export default async function CalendarRoute() {
    const tasks = await prisma.task.findMany({
        where: {
          OR: [
            {
              dueDate: {
                not: null,
              },
            },
            {
              startDate: {
                not: null,
              },
            },
          ],
        },
    });
      
    const events = tasks.map((task) => ({
        title: task.title,
        start: task.startDate,
        end: task.dueDate,
    }));

    return (
        <>
            <h1 className="text-3xl font-semibold tracking-tight">Calendar</h1>
            <CalendarClient events={events} />
        </>
    )
}