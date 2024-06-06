'use client'
import { useState } from 'react';
import { RangeCalendar, DateValue, RangeValue } from '@nextui-org/react';
import { handleAddDate, handleRemoveDate } from '@/actions/TaskServerActions';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { parseDate, today, getLocalTimeZone } from '@internationalized/date';

export default function AddToCardDatesCalendar({ task } : { task: any }) {
    const startDate = task.startDate ? format(new Date(task.startDate), 'yyyy-MM-dd') : undefined;
    const dueDate = task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : undefined;
    const taskId: string = task.id;
    const boardId: string = task.column.boardId;

    const [selectedRange, setSelectedRange] = useState<RangeValue<DateValue>>({
        start: startDate ? parseDate(startDate) : today(getLocalTimeZone()),
        end: dueDate ? parseDate(dueDate) : today(getLocalTimeZone()).add({ weeks: 1 })
    });

    const handleRangeSelect = async (range: RangeValue<DateValue>) => {
        if (!range.start || !range.end) return;

        setSelectedRange(range);

        const newStartDate = new Date(range.start.year, range.start.month - 1, range.start.day);
        const newDueDate = new Date(range.end.year, range.end.month - 1, range.end.day);

        if (startDate !== format(newStartDate, 'yyyy-MM-dd')) {
            await sendDateRequest(newStartDate, 'startDate');
        }
        if (dueDate !== format(newDueDate, 'yyyy-MM-dd')) {
            await sendDateRequest(newDueDate, 'dueDate');
        }
    };

    const sendDateRequest = async (newDate: Date, dateType: 'startDate' | 'dueDate') => {
        try {
            const formattedDate = format(newDate, 'yyyy-MM-dd');
            const data = {
                taskId: taskId,
                date: formattedDate,
                boardId: boardId,
                dateType: dateType
            };

            const response = await handleAddDate(data);

            if (response.success) {
                toast.success(response.message);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            toast.error(`Failed to Update ${dateType === 'dueDate' ? 'Due Date' : 'Start Date'}`);
        }
    };

    const removeDates = async () => {
        try {
            const dataStartDate = {
                taskId: taskId,
                boardId: boardId,
                dateType: 'startDate' as 'startDate'
            };
            const dataDueDate = {
                taskId: taskId,
                boardId: boardId,
                dateType: 'dueDate' as 'dueDate'
            };

            const responseStartDate = await handleRemoveDate(dataStartDate);
            const responseDueDate = await handleRemoveDate(dataDueDate);

            if (responseStartDate.success && responseDueDate.success) {
                toast.success("Dates removed successfully");
                setSelectedRange({ start: today(getLocalTimeZone()), end: today(getLocalTimeZone()).add({ weeks: 1 }) });
            } else {
                throw new Error(responseStartDate.message || responseDueDate.message);
            }
        } catch (error) {
            toast.error(`Failed to Remove Dates`);
        }
    };

    return (
            <RangeCalendar
                aria-label="Date Range"
                value={selectedRange}
                onChange={handleRangeSelect}
            />
    );
}
