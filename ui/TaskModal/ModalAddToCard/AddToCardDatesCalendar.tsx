'use client'

import { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Button } from '@nextui-org/button';
import { handleAddDueDate, handleRemoveDueDate } from '@/actions/TaskServerActions';
import toast from 'react-hot-toast';

export default function AddToCardDatesCalendar({ 
    taskId, boardId, dueDate
} : {
    taskId: string; boardId: string; dueDate: Date | null;
}) {
    const [selectedDueDate, setSelectedDueDate] = useState<Date | undefined>(dueDate || undefined);

    const handleDateSelect = (date: Date | undefined) => {
        if (!date) return;

        if (!dueDate || dueDate.toISOString() !== date.toISOString()) {
            setSelectedDueDate(date);
            sendDateRequest(date);
        }
    }

    const sendDateRequest = async (date: Date) => {
        try {
            const formattedDate = format(date, 'yyyy-MM-dd');
            console.log('Sending date:', formattedDate);

            const data = {
                taskId: taskId,
                dueDate: formattedDate,
                boardId: boardId
            }

            const response = await handleAddDueDate(data);
            console.log(response);

            if (response.success) {
                toast.success(response.message);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to Update Due Date');
        }
    }


    const removeDueDate = async () => {
        try {
            const data = {
                taskId: taskId,
                boardId: boardId
            };

            const response = await handleRemoveDueDate(data);
            console.log(response);

            if (response.success) {
                toast.success(response.message);
                setSelectedDueDate(undefined);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to Remove Due Date');
        }
    }

    const footerDueDate = (
        <Button 
            size='sm' 
            variant='ghost' 
            color='danger' 
            onClick={removeDueDate}
            isDisabled={!selectedDueDate}
        >
            Remove
        </Button>
    );

    return (
        <DayPicker
            mode="single"
            selected={selectedDueDate}
            onSelect={handleDateSelect}
            footer={footerDueDate}
            showOutsideDays fixedWeeks
        />
    );
}
