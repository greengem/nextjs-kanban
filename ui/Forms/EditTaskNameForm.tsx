'use client'
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleEditTask } from "@/actions/TaskServerActions";
import { EditTaskSchema } from '@/types/zodTypes';
import { TaskEditData } from '@/types/types';
import { IconDeviceFloppy, IconLoader2, IconX } from "@tabler/icons-react";
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';

export default function EditTaskNameForm({ 
  title, taskId, boardId 
} : { 
  title: string; taskId: string; boardId: string; 
}) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm<TaskEditData>({
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
          <span onClick={toggleEdit} className="cursor-pointer w-full text-3xl font-semibold">{title}</span>
        </div>
      ) : (
        <div>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                autoComplete="off"
                autoFocus 
                isRequired
                label='Task Name'
                placeholder='Enter a name for your task'
                type='text' 
                className='mb-2'
                {...field}
              />
            )}
          />
          <div className='flex gap-1'>
            <Button 
              type="submit" 
              size='sm'
              disabled={isSubmitting}
              className='shrink-0 grow-0'
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 size={16} className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                <IconDeviceFloppy size={16} />
                Save Title
                </>
              )}
            </Button>

            <Button isIconOnly size='sm' color='danger' onClick={toggleEdit} type="button"><IconX size={20} /></Button>
          </div>
        </div>
      )}
    </form>
  )
}
