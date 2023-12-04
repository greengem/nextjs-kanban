'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleCreateBoard } from "@/actions/BoardActions";

// Define your Zod schema for form validation
const CreateBoardSchema = z.object({
  boardTitle: z.string().min(3, "Title must be at least 3 characters"),
  boardDescription: z.string().optional(),
});

export default function CreateBoardForm() {
  // Initialize react-hook-form with Zod resolver for validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(CreateBoardSchema),
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    await handleCreateBoard(null, data);
    reset(); // Reset form fields after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Board Title Input */}
      <div className="mb-3">
        <label htmlFor="boardTitle" className="block mb-2 text-sm font-medium">Board Title</label>
        <input 
          type="text" 
          id="boardTitle" 
          {...register('boardTitle')} // Register with react-hook-form
          className="w-full p-2 border rounded text-black" 
          autoFocus 
        />
      </div>

      {/* Board Description Input */}
      <div className="mb-3 hidden">
        <label htmlFor="boardDescription" className="block mb-2 text-sm font-medium">Board Description</label>
        <input 
          type="text" 
          id="boardDescription" 
          {...register('boardDescription')} // Register with react-hook-form
          className="w-full p-2 border rounded text-black" 
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="px-4 py-2 bg-purple-500 text-white rounded-md" 
      >
        {isSubmitting ? 'Creating...' : 'Create New Board'}
      </button>

      {/* Optional: Display submission status, errors, etc. */}
    </form>
  );
}
