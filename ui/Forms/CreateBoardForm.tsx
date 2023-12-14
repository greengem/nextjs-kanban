'use client'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleCreateBoard } from "@/actions/BoardServerActions";
import { CreateBoardSchema } from '@/types/zodTypes';
import { Card, CardBody } from '@/ui/Card/Card';
import { BoardCreationData } from '@/types/types';
import { IconLoader2 } from '@tabler/icons-react';

export default function CreateBoardForm() {
  const router = useRouter()
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<BoardCreationData>({
    resolver: zodResolver(CreateBoardSchema),
  });

  const onSubmit: SubmitHandler<BoardCreationData> = async (data) => {
    const response = await handleCreateBoard(data);
    if (response.success && response.boardId) {
      router.push(`/board/${response.boardId}`);
      toast.success('Board Created!');
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Card>
      <CardBody className="
        text-center 
        h-28
      ">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-between h-full'>

          <div>
            <label htmlFor="title" className="sr-only hidden">Board Title</label>
            <input 
              type="text" 
              id="title" 
              {...register('title')}
              placeholder='Board Title...'
              className="w-full p-3 border rounded bg-zinc-800 text-white border-none focus:outline-none text-sm" 
              autoFocus 
              required
              minLength={3}
            />
          </div>

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
            ) : 'Create New Board'}
          </button>


        </form>
      </CardBody>
    </Card>
  );
}
