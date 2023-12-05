'use client'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleEditTask } from "@/actions/TaskActions";
import { EditTaskSchema } from '@/types/zodTypes';
import { TaskEditData } from '@/types/types';
import { IconX } from "@tabler/icons-react";

export default function EditTaskForm({ 
  title, taskId, boardId 
} : { 
  title: string; taskId: string; boardId: string; 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<TaskEditData>({
    resolver: zodResolver(EditTaskSchema),
    defaultValues: { id: taskId, boardId, title }
  });

  const onSubmit: SubmitHandler<TaskEditData> = async (data) => {
    const response = await handleEditTask(data);
    
    if (response.success) {
      toast.success('Task Edited');
      reset({ ...data, title: data.title });
      setIsEditing(false);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('id')} />
      <input type="hidden" {...register('boardId')} />

      {!isEditing ? (
        <div className="flex justify-between">
          <span onClick={toggleEdit} className="cursor-pointer w-full">{title}</span>
        </div>
      ) : (
        <div>
          <input 
            autoFocus 
            type='text' 
            {...register('title')}
            className="mb-2 w-full p-2 rounded bg-zinc-900" 
          />

          <div className="flex items-center justify-between">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-3 py-1 bg-purple-500 text-white rounded-md text-sm"
            >
              Save
            </button>
            <button onClick={toggleEdit} type="button" className="p-1"><IconX size={20} /></button>
          </div>
        </div>
      )}
    </form>
  )
}
