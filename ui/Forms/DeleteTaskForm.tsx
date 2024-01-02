'use client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import { handleDeleteTask } from "@/actions/TaskServerActions";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { useState } from 'react';

export default function DeleteTaskForm({ 
  boardId, taskId, columnId,
} : { 
  boardId: string; taskId: string; columnId: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const onClickDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      const data = { id: taskId, boardId, columnId };
  
      try {
        const response = await handleDeleteTask(data);
  
        if (response.success) {
          toast.success('Task Deleted');
          router.back();
        } else {
          toast.error(response.message);
        }
      } catch (e) {
        toast.error('An error occurred while deleting the task.');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  

  return (
    <>
      <button 
        onClick={onClickDelete}
        className='flex items-center gap-2 w-full'
        disabled={isDeleting}
      >
        {isDeleting ? (
          <>
            <IconLoader2 size={14} className="animate-spin" /> Deleting
          </>
        ) : (
          <>
            <IconTrash size={14} /> Delete Task
          </>
        )}
      </button>
    </>
  )
}
