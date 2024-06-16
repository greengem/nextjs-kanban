"use client";
import { DetailedTask } from "@/types/types";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { IconCalendar } from "@tabler/icons-react";
import AddToCardDatesCalendar from "./AddToCardDatesCalendar";

export default function AddToCardDates({
  taskId,
  boardId,
  startDate,
  dueDate,
}: {
  taskId: string;
  boardId: string;
  startDate: Date | null;
  dueDate: Date | null;
}) {
  return (
    <li className="bg-zinc-900 hover:bg-zinc-800 ring-zinc-800 rounded-md ring-2  hover:ring-primary">
      <Popover placement="left-start" triggerScaleOnOpen={false}>
        <PopoverTrigger>
          <button className="flex items-center gap-2 px-2 py-2 w-full">
            <IconCalendar size={14} /> Dates
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <AddToCardDatesCalendar
            taskId={taskId}
            boardId={boardId}
            startDate={startDate}
            dueDate={dueDate}
          />
        </PopoverContent>
      </Popover>
    </li>
  );
}
