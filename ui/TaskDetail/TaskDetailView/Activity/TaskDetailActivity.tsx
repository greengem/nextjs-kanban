'use client'
import { Session } from "next-auth";
import { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import TaskDetailActivityItem from "./TaskDetailActivityItem";
import { Avatar } from "@nextui-org/avatar"
import { Input } from "@nextui-org/input"
import { Button, ButtonGroup } from "@nextui-org/button"
import { IconActivity, IconX } from "@tabler/icons-react"
import { handleCreateActivity } from "@/actions/ActivityServerActions";
import { CreateActivitySchema } from "@/types/zodTypes";
import { ActivityCreationData } from "@/types/types";
import TaskDetailItemHeading from "../ui/TaskDetailItemHeading";
import TaskDetailItemContent from "../ui/TaskDetailItemContent";

interface TaskDetailActivityProps {
    task: any;
    session: Session | null;
}

export default function TaskDetailActivity({ task, session }: TaskDetailActivityProps) {
    const taskId = task.id;
    const boardId = task.column.boardId;
    const columnTitle = task.column.columnTitle;
    const activities = task.activities;

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ActivityCreationData>({
        resolver: zodResolver(CreateActivitySchema),
        defaultValues: { boardId, taskId }
    });

    const [showForm, setShowForm] = useState(false);

    const onSubmit: SubmitHandler<ActivityCreationData> = async (data) => {
        const response = await handleCreateActivity(data);
        if (response.success) {
            toast.success('Activity Created');
            handleCloseForm();
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
            <TaskDetailItemHeading title="Activity" icon={<IconActivity size={32} />} />

            <TaskDetailItemContent>
                <div className="flex items-start mb-5 mt-4">
                    <div className="w-[40px]">
                        <Avatar 
                            showFallback 
                            size="sm"
                            name={session?.user?.name ?? 'Unknown'} 
                            src={session?.user?.image ?? undefined}
                            className="shrink-0"
                        />
                    </div>
                    <div className="w-full">
                        {!showForm ? (
                            <div className="flex items-center h-[32px]">
                                <p onClick={handleToggleForm} className="cursor-pointer text-primary pl-4">Add a comment</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                                <Input
                                    className="mb-2"
                                    placeholder="Enter a description..."
                                    autoFocus
                                    labelPlacement="outside"
                                    {...register('content')}
                                />

                                <input type="hidden" {...register('boardId')} />
                                <input type="hidden" {...register('taskId')} />

                                <ButtonGroup size="sm">
                                    <Button type="submit" isLoading={isSubmitting}>Save</Button>
                                    <Button color="danger" isIconOnly onClick={handleCloseForm}><IconX size={20} /></Button>
                                </ButtonGroup>
                            </form>
                        )}
                    </div>
                </div>

                <ul className="space-y-3">
                    {activities && activities.map((activity: any) => (
                        <TaskDetailActivityItem 
                            key={activity.id}
                            activity={activity}
                            columnTitle={columnTitle}
                            boardId={boardId}
                        />
                    ))}
                </ul>
            </TaskDetailItemContent>

        </>
    );
}
