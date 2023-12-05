'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleDeleteTask } from "@/actions/TaskActions";
import { DeleteTaskSchema } from '@/types/zodTypes';
import { TaskDeletionData } from '@/types/types';
import { IconTrash } from "@tabler/icons-react";

export default function DeleteTaskForm({ 
  boardId, taskId, columnId 
} : { 
  boardId: string; taskId: string; columnId: string; 
}) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<TaskDeletionData>({
    resolver: zodResolver(DeleteTaskSchema),
    defaultValues: { id: taskId, boardId, columnId }
  });

  const onSubmit: SubmitHandler<TaskDeletionData> = async (data) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const response = await handleDeleteTask(data);
  
      if (response.success) {
        toast.success('Task Deleted');
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('id')} />
        <input type="hidden" {...register('boardId')} />
        <input type="hidden" {...register('columnId')} />
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="p-1 bg-red-500 text-white rounded-md"
        >
          {isSubmitting ? 'Deleting...' : <IconTrash size={14} />}
        </button>
      </form>
    </>
  )
}
