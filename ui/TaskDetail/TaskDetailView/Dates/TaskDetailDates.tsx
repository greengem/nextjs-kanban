import { format, isSameMonth, isSameYear } from 'date-fns';
import TaskDetailItemHeading from '../ui/TaskDetailItemHeading';
import { IconCalendar } from '@tabler/icons-react';
import TaskDetailItemContent from '../ui/TaskDetailItemContent';

interface TaskDetailDatesProps {
    startDate: Date | null;
    dueDate: Date | null;
}

export default function TaskDetailDates({ startDate, dueDate }: TaskDetailDatesProps) {

    if (!startDate && !dueDate) {
        return null;
    }

    function formatDateDisplay(startDate: Date | null, dueDate: Date | null): string {
        if (!startDate && !dueDate) return '';
    
        if (startDate && dueDate) {
            if (isSameMonth(startDate, dueDate) && isSameYear(startDate, dueDate)) {
                return `${format(startDate, 'dd')} - ${format(dueDate, 'dd MMM')}`;
            }
            return `${format(startDate, 'dd MMM')} - ${format(dueDate, 'dd MMM')}`;
        } else if (startDate) {
            return `Start Date: ${format(startDate, 'dd MMM')}`;
        } else if (dueDate) {
            return `Due: ${format(dueDate, 'dd MMM')}`;
        }
        return '';
    }

    return (
        <>
            <TaskDetailItemHeading title='Dates' icon={<IconCalendar />} />
            <TaskDetailItemContent indented>
                {(startDate || dueDate) && <p>{formatDateDisplay(startDate, dueDate)}</p>}
            </TaskDetailItemContent>
        </>
    );
}
