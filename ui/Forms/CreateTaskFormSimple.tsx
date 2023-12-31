'use client'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleCreateTask } from "@/actions/TaskServerActions";
import { CreateTaskSchema } from '@/types/zodTypes';
import { TaskCreationData } from '@/types/types';
import { IconLoader2, IconPlus, IconX } from "@tabler/icons-react";

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" aria-label="Close form" onClick={onClick}>
      <IconX size={20} />
    </button>
  );
}

export default function CreateTaskForm({ 
  boardId, columnId 
} : { 
  boardId: string; columnId: string; 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<TaskCreationData>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: { boardId, columnId }
  });

  const onSubmit: SubmitHandler<TaskCreationData> = async (data) => {
    const response = await handleCreateTask(data);

    if (response.success) {
      toast.success('Task Created');
      reset();
      setIsEditing(false);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label htmlFor="taskTitle" className="block mb-2 font-medium sr-only">Task Title</label>
            <input 
              autoFocus 
              type="text" 
              id="taskTitle" 
              placeholder='Task'
              {...register('title')}
              className="w-full px-3 py-2 rounded text-sm bg-zinc-300 border-none outline-none" 
              required 
            />
          </div>

          <input type="hidden" {...register('boardId')} />
          <input type="hidden" {...register('columnId')} />

          <div className="flex justify-between items-center">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-4 py-2 bg-zinc-300 rounded-md text-xs flex justify-center items-center gap-1"
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 size={14} className="animate-spin mr-2" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <IconPlus size={14} />
                  <span>Create Task</span>
                </>
              )}
            </button>

            <CloseButton onClick={toggleEdit} />
          </div>
        </form>
      ) : (
        <button onClick={toggleEdit} className="text-sm flex items-center gap-2 w-full">
          <IconPlus size={16} />Add a card
        </button>
      )}
    </div>
  )
}
