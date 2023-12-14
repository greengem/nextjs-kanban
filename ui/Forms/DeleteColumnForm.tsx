'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleDeleteColumn } from "@/actions/ColumnServerActions";
import { DeleteColumnSchema } from '@/types/zodTypes';
import { ColumnDeletionData } from '@/types/types';
import { IconLoader2, IconTrash } from "@tabler/icons-react";

export default function DeleteColumnForm({ 
  columnId, boardId
} : { 
  columnId: string; boardId: string;
}) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ColumnDeletionData>({
    resolver: zodResolver(DeleteColumnSchema),
    defaultValues: { id: columnId, boardId }
  });

  const onSubmit: SubmitHandler<ColumnDeletionData> = async (data) => {
    if (window.confirm('Are you sure you want to delete this column?')) {
      const response = await handleDeleteColumn(data);
  
      if (response.success) {
        toast.success('Column Deleted');
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('id')} />
      <input type="hidden" {...register('boardId')} />

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="text-red-500"
      >
        {isSubmitting ? <IconLoader2 size={22} className='animate-spin' /> : <IconTrash size={22} />}
      </button>
    </form>
  )
}
