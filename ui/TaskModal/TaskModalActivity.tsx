'use client'
import { Session } from "next-auth";
import { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import TaskModalActivityItem from "./TaskModalActivityItem"
import { Avatar } from "@nextui-org/avatar"
import { Textarea } from "@nextui-org/input"
import { Button, ButtonGroup } from "@nextui-org/button"
import { ActivityWithUser } from "@/types/types"
import { IconActivity, IconX } from "@tabler/icons-react"
import { handleCreateActivity } from "@/actions/ActivityActions";
import { CreateActivitySchema } from "@/types/zodTypes";
import { ActivityCreationData } from "@/types/types";

interface TaskModalActivityProps {
    activities: ActivityWithUser[];
    columnTitle: string;
    boardId: string;
    taskId: string;
    session: Session | null;
}

export default function TaskModalActivity({ activities, columnTitle, session, taskId, boardId }: TaskModalActivityProps) {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ActivityCreationData>({
        resolver: zodResolver(CreateActivitySchema),
        defaultValues: { boardId, taskId }
    });

    const [showForm, setShowForm] = useState(false); // State to toggle form visibility

    const onSubmit: SubmitHandler<ActivityCreationData> = async (data) => {
        const response = await handleCreateActivity(data);
        if (response.success) {
            toast.success('Activity Created');
            reset();
        } else {
            toast.error(response.message);
        }
    };

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        reset();
    };

    return (
        <>
            <div>
                <div className='flex gap-3 w-full mb-2'>
                    <IconActivity size={32} />
                    <h4 className='text-large font-semibold'>Activity</h4>
                </div>

                <div className="flex gap-3 items-start">
                    <Avatar 
                        showFallback 
                        size="sm"
                        name={session?.user?.name ?? 'Unknown'} 
                        src={session?.user?.image ?? undefined}
                        className="shrink-0"
                    />

                    <div className="w-full">
                        {!showForm && (
                            <p onClick={handleToggleForm} className="cursor-pointer text-primary">Add a comment</p>
                        )}

                        {showForm && (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Textarea
                                    className="mb-2"
                                    placeholder="Enter a description..."
                                    autoFocus
                                    {...register('content')}
                                />

                                <input type="hidden" {...register('boardId')} />
                                <input type="hidden" {...register('taskId')} />

                                <ButtonGroup size="sm">
                                    <Button type="submit">Save</Button>
                                    <Button color="danger" isIconOnly onClick={handleCloseForm}><IconX /></Button>
                                </ButtonGroup>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <ul className="space-y-3">
                {activities && activities.map((activity) => (
                    <TaskModalActivityItem 
                        key={activity.id}
                        activity={activity}
                        columnTitle={columnTitle}
                        boardId={boardId}
                    />
                ))}
            </ul>
        </>
    );
}
