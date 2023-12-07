'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleDeleteTask } from "@/actions/TaskActions";
import { DeleteTaskSchema } from '@/types/zodTypes';
import { TaskDeletionData } from '@/types/types';
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { Button } from '@nextui-org/button';

export default function DeleteTaskForm({ 
  boardId, taskId, columnId, onCloseModal 
} : { 
  boardId: string; taskId: string; columnId: string; onCloseModal: () => void; 
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
        onCloseModal();
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
        <Button 
          type="submit" 
          color='danger'
          disabled={isSubmitting}
        >
            {isSubmitting ? (
              <>
                Deleting <IconLoader2 size={14} className="animate-spin" />
              </>
            ) : (
              <>
                Delete <IconTrash size={14} />
              </>
            )}
        </Button>
      </form>
    </>
  )
}
