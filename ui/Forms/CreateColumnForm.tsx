'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleCreateColumn } from "@/actions/ColumnServerActions";
import { CreateColumnSchema } from '@/types/zodTypes';
import { ColumnCreationData } from '@/types/types';
import { Card, CardBody } from '@/ui/Card/Card';
import { IconLoader2, IconPlus } from '@tabler/icons-react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

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
    <div className="shrink-0 w-64 ml-2">
        <div className='bg-white p-2 rounded-xl shadow-xl'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>

              <Input 
                autoComplete="off"
                type="text" 
                id="columnTitle" 
                {...register('title')}
                className="w-full" 
                size='sm'
                placeholder="Column name..."
                label='New Column'
                isRequired
                minLength={3}
              />

            <input 
              type="hidden" 
              {...register('boardId')}
            />

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className='w-full gap-1'
              color='primary'
            >
            {isSubmitting ? (
              <>
                <IconLoader2 size={16} className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <IconPlus size={16} />
                Create Column
              </>
            )}
            </Button>
          </form>
        </div>
      </div>
  )
}
