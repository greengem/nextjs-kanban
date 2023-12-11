'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { ActivityWithUser } from "@/types/types";
import { Avatar } from "@nextui-org/avatar";
import { IconEdit, IconMoodPlus, IconTrash } from "@tabler/icons-react";
import { handleDeleteActivity } from '@/actions/ActivityActions';
import { ActivityDeletionData } from '@/types/types';
import { DeleteActivitySchema } from '@/types/zodTypes';

interface TaskModalActivityItemProps {
    activity: ActivityWithUser;
    columnTitle?: string;
    boardId?: string;
}

export default function TaskModalActivityItem({ activity, columnTitle, boardId }: TaskModalActivityItemProps) {
    const activityId = activity.id;

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<ActivityDeletionData>({
        resolver: zodResolver(DeleteActivitySchema),
        defaultValues: { boardId, activityId }
    });
    
    const handleEdit = () => {
        console.log("Edit comment");
        // Implement edit functionality
    };

    const handleReaction = () => {
        console.log("Add reaction");
        // Implement reaction functionality
    };

    const handleDelete: SubmitHandler<ActivityDeletionData> = async (data) => {
        if (window.confirm('Are you sure you want to delete this activity?')) {
            const response = await handleDeleteActivity(data);
            if (response.success) {
                toast.success('Activity Deleted');
            } else {
                toast.error(response.message);
            }
        }
    };

    return (
        <li className="flex gap-2 items-start">
            <Avatar 
                showFallback 
                name={activity.user.name ?? 'Unknown'} 
                src={activity.user.image ?? undefined} 
                className="shrink-0 grow-0"
            />

            {activity.type === 'COMMENT_ADDED' ? (

                <div>
                    <div className="text-sm">
                        <span className="font-semibold">{activity.user.name} </span> 
                        <span className="text-xs text-zinc-500">{new Date(activity.createdAt).toLocaleString()}</span>
                    </div>
                    <div>
                        {activity.content}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleReaction}><IconMoodPlus size={18} /></button>
                        <button onClick={handleEdit}><IconEdit size={18} /></button>
                        <form onSubmit={handleSubmit(handleDelete)}>
                            <input type="hidden" {...register('boardId')} />
                            <input type="hidden" {...register('activityId')} />
                            <button type='submit'><IconTrash className="text-red-500" size={18} /></button>
                        </form>
                    </div>
                </div>
            ) : (

                <div>
                    <div className="text-sm">
                        <span className="font-semibold">{activity.user.name} </span> 
                        {activity.content} {columnTitle || ''}
                    </div>
                    <div className="text-xs text-zinc-500">
                        {new Date(activity.createdAt).toLocaleString()}
                    </div>
                </div>
            )}
        </li>
    );
}
