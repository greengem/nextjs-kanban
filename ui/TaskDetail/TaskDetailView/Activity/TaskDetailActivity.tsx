'use client'
import { Session } from "next-auth";
import { useState } from "react";
import toast from 'react-hot-toast';
import TaskDetailActivityItem from "./TaskDetailActivityItem";
import { Avatar } from "@nextui-org/avatar"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { IconActivity, IconX } from "@tabler/icons-react"
import { handleCreateActivity } from "@/actions/ActivityServerActions";
import TaskDetailItemHeading from "../ui/TaskDetailItemHeading";
import TaskDetailItemContent from "../ui/TaskDetailItemContent";

interface TaskDetailActivityProps {
    task: any;
    session: Session | null;
}

export default function TaskDetailActivity({ task, session }: TaskDetailActivityProps) {
    const taskId = task.id;
    const boardId = task.column.boardId;

    const [showForm, setShowForm] = useState(false);

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
            const response = await handleCreateActivity(taskId, boardId, formData);
            if (response.success) {
                toast.success(response.message);
                handleToggleForm();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('An error occurred while submitting the form');
        }
    };

    return (
        <>
            <TaskDetailItemHeading title="Activity" icon={<IconActivity size={32} />} />

            <TaskDetailItemContent indented>
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

                            <form onSubmit={onSubmitForm} className="w-full">
                                <Input
                                    autoComplete="off"
                                    className="mb-2"
                                    placeholder="Add a comment..."
                                    label="Activity"
                                    size="sm"
                                    autoFocus
                                    name="content"
                                    isRequired
                                />

                                <div className="flex items-center gap-2">
                                    <Button size="sm" type="submit" color="primary">Save</Button>
                                    <button onClick={handleToggleForm}><IconX size={20} /></button>
                                </div>

                            </form>

                        )}
                    </div>
                </div>

                <ul className="space-y-3">
                    {task.activities && task.activities.map((activity: any) => (
                        <TaskDetailActivityItem 
                            key={activity.id}
                            activity={activity}
                            columnTitle={task.column.columnTitle}
                            boardId={task.column.boardId}
                        />
                    ))}
                </ul>
            </TaskDetailItemContent>

        </>
    );
}
