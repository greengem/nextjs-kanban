'use client'
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleEditTask } from "@/actions/TaskActions";
import { EditTaskSchema } from '@/types/zodTypes';
import { ExpandedTask, TaskEditData } from '@/types/types';
import { Textarea } from "@nextui-org/react";
import { Button } from '@nextui-org/react';
import { IconTextPlus, IconLoader2, IconX } from '@tabler/icons-react';

export default function TaskModalDescription({ 
    selectedTask, boardId
} : {
    selectedTask: ExpandedTask; boardId: string;
}) {
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const toggleEditDescription = () => setIsEditingDescription(!isEditingDescription);

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<TaskEditData>({
        resolver: zodResolver(EditTaskSchema),
        defaultValues: { id: selectedTask.id, boardId, description: selectedTask.description }
    });

    const onSubmit: SubmitHandler<TaskEditData> = async (data) => {
        const response = await handleEditTask(data);
        
        if (response.success) {
            toast.success('Description Updated');
            reset({ ...data, description: data.description });
            setIsEditingDescription(false);
        } else {
            toast.error(response.message);
        }
    };

    return (
        <div className='flex gap-2 w-full'>
            <IconTextPlus size={20} className='mt-1 w-5' />
            <div className='flex-col w-full'>
            <h4 className='text-large font-semibold mb-2'>Description</h4>
            {!isEditingDescription ? (
                <p onClick={toggleEditDescription} className="cursor-pointer">
                    {selectedTask.description ? selectedTask.description : 'Add a description'}
                </p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('id')} />
                    <input type="hidden" {...register('boardId')} />
                    <Textarea 
                        placeholder="Enter your description"
                        autoFocus
                        defaultValue={selectedTask.description || ''}
                        className='w-full mb-2 mt-1 border-none focus:outline-none' 
                        {...register('description')}
                    />
                    <div className='flex gap-2'>
                        <Button 
                            type='submit' 
                            size='sm' 
                            color='primary'
                            disabled={isSubmitting}
                            className="px-4 py-1 text-white rounded-md text-sm flex justify-center items-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <IconLoader2 size={16} className="animate-spin mr-2" />
                                    Saving...
                                </>
                            ) : 'Save'}
                        </Button>
                        <Button 
                            size='sm' 
                            onClick={toggleEditDescription} 
                            type="button" 
                            className="p-1"
                            isIconOnly
                            color='danger'
                        >
                            <IconX size={20} />
                        </Button>
                    </div>
                </form>
            )}
            </div>
        </div>
    )
}
