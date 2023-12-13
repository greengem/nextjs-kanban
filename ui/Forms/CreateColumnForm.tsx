'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleCreateColumn } from "@/actions/ColumnActions";
import { CreateColumnSchema } from '@/types/zodTypes';
import { ColumnCreationData } from '@/types/types';
import { Card, CardBody } from '@/ui/Card/Card';
import { IconLoader2 } from '@tabler/icons-react';

export default function CreateColumnForm({ 
  boardId 
} : { 
  boardId: string 
}) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ColumnCreationData>({
    resolver: zodResolver(CreateColumnSchema),
    defaultValues: { boardId }
  });

  const onSubmit: SubmitHandler<ColumnCreationData> = async (data) => {
    const response = await handleCreateColumn(data);
  
    if (response.success) {
      toast.success('Column Created!');
      reset();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="shrink-0 w-64">
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>

            <div>
              <label htmlFor="columnTitle" className="sr-only hidden">Column Title</label>
              <input 
                type="text" 
                id="columnTitle" 
                {...register('title')}
                className="w-full p-3 border rounded text-sm bg-zinc-800 text-white border-none outline-none" 
                placeholder="New Column"
                required
                minLength={3}
              />
            </div>

            <input 
              type="hidden" 
              {...register('boardId')}
            />

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md text-sm w-full flex justify-center items-center"
            >
            {isSubmitting ? (
              <>
                <IconLoader2 size={16} className="animate-spin mr-2" />
                Creating...
              </>
            ) : 'Add another list'}
            </button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
