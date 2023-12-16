'use client'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleEditTask } from "@/actions/TaskServerActions";
import { EditTaskSchema } from '@/types/zodTypes';
import { TaskEditData } from '@/types/types';
import { IconLoader2, IconX } from "@tabler/icons-react";
import { Button, ButtonGroup } from '@nextui-org/button';

export default function EditTaskNameForm({ 
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
        <div className='mb-3'>
          <input 
            autoFocus 
            type='text' 
            {...register('title')}
            className="mb-2 w-full p-2 rounded bg-zinc-900 border-none focus:outline-none" 
          />

          <ButtonGroup size='sm'>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 size={16} className="animate-spin mr-2" />
                  Creating...
                </>
              ) : 'Save'}
            </Button>
            <Button isIconOnly color='danger' onClick={toggleEdit} type="button"><IconX size={20} /></Button>
          </ButtonGroup>
        </div>
      )}
    </form>
  )
}
