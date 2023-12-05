'use client'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleDeleteBoard } from "@/actions/BoardActions";
import { DeleteBoardSchema } from '@/types/zodTypes';
import { BoardDeletionData } from '@/types/types';
import { IconTrash } from "@tabler/icons-react";

export default function DeleteBoardForm({ 
  boardId 
} : { 
  boardId: string; 
}) {
  const router = useRouter()
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<BoardDeletionData>({
    resolver: zodResolver(DeleteBoardSchema),
    defaultValues: { id: boardId }
  });

  const onSubmit: SubmitHandler<BoardDeletionData> = async (data) => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      const response = await handleDeleteBoard(data);

      if (response.success) {
        router.push('/board/');
        toast.success('Board Deleted');
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('id')} />

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="p-1 bg-red-500 text-white rounded"
      >
        {isSubmitting ? 'Deleting...' : <IconTrash size={16} />}
      </button>
    </form>
  )
}
