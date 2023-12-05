'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleCreateBoard } from "@/actions/BoardActions";
import { Card, CardHeader, CardBody, CardFooter } from '@/ui/Card/Card';
import { revalidatePath } from 'next/cache';
import toast from 'react-hot-toast';

const CreateBoardSchema = z.object({
  boardTitle: z.string().min(3, "Title must be at least 3 characters"),
  boardDescription: z.string().optional(),
});

export default function CreateBoardForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(CreateBoardSchema),
  });

  const onSubmit = async (data: any) => {
    const response = await handleCreateBoard(null, data);
  
    if (response.success && response.boardId) {
      router.push(`/board/${response.boardId}`);
      toast.success('Board Created!');
    } else {
      console.error(response.message);
    }
  };

  return (
    <Card className="w-64 shrink-0">
      <CardBody className="
        text-center 
        bg-gradient-to-br from-purple-600 to-purple-800
        h-28
      ">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-between h-full'>

          <div>
            <label htmlFor="boardTitle" className="block mb-2 text-sm font-medium sr-only">Board Title</label>
            <input 
              type="text" 
              id="boardTitle" 
              {...register('boardTitle')}
              className="w-full p-2 border rounded text-zinc-900 focus:outline-none text-sm" 
              autoFocus 
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-500 text-white rounded-md text-sm w-full" 
          >
            {isSubmitting ? 'Creating...' : 'Create New Board'}
          </button>

        </form>
      </CardBody>
    </Card>
  );
}
