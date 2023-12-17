'use client'

import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { Button } from '@nextui-org/button';
import { handleAddDate, handleRemoveDate } from '@/actions/TaskServerActions';
import toast from 'react-hot-toast';

export default function AddToCardDatesCalendar({ 
    taskId, boardId, date, dateType
} : {
    taskId: string; boardId: string; date: Date | null; dateType: 'startDate' | 'dueDate';
}) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(date || undefined);

    const handleDateSelect = (newDate: Date | undefined) => {
        if (!newDate) return;

        if (!date || date.toISOString() !== newDate.toISOString()) {
            setSelectedDate(newDate);
            sendDateRequest(newDate);
        }
    }

    const sendDateRequest = async (newDate: Date) => {
        try {
            const formattedDate = format(newDate, 'yyyy-MM-dd');
            const data = {
                taskId: taskId,
                date: formattedDate,
                boardId: boardId,
                dateType: dateType
            }

            const response = await handleAddDate(data);

            if (response.success) {
                toast.success(response.message);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            toast.error(`Failed to Update ${dateType === 'dueDate' ? 'Due Date' : 'Start Date'}`);
        }
    }

    const removeDate = async () => {
        try {
            const data = {
                taskId: taskId,
                boardId: boardId,
                dateType: dateType
            };
    
            const response = await handleRemoveDate(data);
    
            if (response.success) {
                toast.success(response.message);
                setSelectedDate(undefined);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            toast.error(`Failed to Remove ${dateType === 'dueDate' ? 'Due Date' : 'Start Date'}`);
        }
    }

    const footer = (
        <Button 
            size='sm' 
            variant='ghost' 
            color='danger' 
            onClick={removeDate}
            isDisabled={!selectedDate}
        >
            Remove
        </Button>
    );

    return (
        <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            footer={footer}
            showOutsideDays fixedWeeks
        />
    );
}
