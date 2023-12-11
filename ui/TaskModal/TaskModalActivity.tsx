'use client'
import { Session } from "next-auth";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import TaskModalActivityItem from "./TaskModalActivityItem"
import { Avatar } from "@nextui-org/avatar"
import { Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { ActivityWithUser } from "@/types/types"
import { IconActivity } from "@tabler/icons-react"
import { handleCreateActivity } from "@/actions/ActivityActions";
import { CreateActivitySchema } from "@/types/zodTypes";
import { ActivityCreationData } from "@/types/types";

interface TaskModalActivityProps {
    activities: ActivityWithUser[];
    columnTitle?: string;
    boardId: string;
    taskId: string;
    session: Session | null;
}

export default function TaskModalActivity({ activities, columnTitle, session, taskId, boardId }: TaskModalActivityProps) {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ActivityCreationData>({
        resolver: zodResolver(CreateActivitySchema),
        defaultValues: { boardId, taskId }
    });

    const onSubmit: SubmitHandler<ActivityCreationData> = async (data) => {

        const response = await handleCreateActivity(data);

        if (response.success) {
            toast.success('Activity Created');
            reset();
        } else {
            toast.error(response.message);
        }
    };

    return (
        <>
            <div className='flex gap-2 w-full'>
                <IconActivity size={20} className='mt-1 w-5' />
                <h4 className='text-large font-semibold'>Activity</h4>
            </div>

            <div className="flex gap-3 mb-3">
                <Avatar 
                    showFallback 
                    name={session?.user?.name ?? 'Unknown'} 
                    src={session?.user?.image ?? undefined}
                    className="shrink-0"
                />
                <div className="w-full" >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Textarea
                            className="mb-2"
                            placeholder="Enter a description..."
                            {...register('content')}
                        />

                        <input type="hidden" {...register('boardId')} />
                        <input type="hidden" {...register('taskId')} />

                        <div className="flex gap-2">
                        <Button type="submit">Submit</Button>

                        </div>
                    </form>
                </div>
            </div>

            <ul className="space-y-3">
                {activities && activities.map((activity, index) => (
                    <TaskModalActivityItem 
                        key={index}
                        activity={activity}
                        columnTitle={columnTitle}
                        boardId={boardId}
                    />
                ))}
            </ul>
        </>
    )
}
