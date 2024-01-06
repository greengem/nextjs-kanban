'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleCreateColumn } from "@/actions/ColumnServerActions";
import { CreateColumnSchema } from '@/types/zodTypes';
import { ColumnCreationData } from '@/types/types';
import { Card, CardBody } from '@/ui/Card/Card';
import { IconLoader2 } from '@tabler/icons-react';
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
      <Card>
        <CardBody className='bg-white'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>

              <Input 
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
              className='w-full'
              color='primary'
            >
            {isSubmitting ? (
              <>
                <IconLoader2 size={16} className="animate-spin mr-2" />
                Creating...
              </>
            ) : 'Create Column'}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
