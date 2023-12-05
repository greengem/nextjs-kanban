'use client'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleCreateTask } from "@/actions/TaskActions";
import { CreateTaskSchema } from '@/types/zodTypes';
import { TaskCreationData } from '@/types/types';
import { IconPlus, IconX } from "@tabler/icons-react";

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
              {...register('title')}
              className="w-full px-2 py-2 border rounded text-sm text-black" 
              required 
            />
          </div>

          <input type="hidden" {...register('boardId')} />
          <input type="hidden" {...register('columnId')} />

          <div className="flex justify-between items-center">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-3 py-1 bg-purple-500 text-white rounded-md text-sm"
            >
              Add Card
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
