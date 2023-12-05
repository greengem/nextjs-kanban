import { IconGripVertical } from '@tabler/icons-react';
import { IconInfoCircle } from '@tabler/icons-react';
import { IconTrash } from "@tabler/icons-react";
import { forwardRef } from 'react';
import { TaskSummary } from '@/types/types';

export default function TaskItemDraggable({ task }: { task: TaskSummary }){
  return (
    <div className='my-3 flex select-none rounded-lg shadow-md'>
      
      <div className='px-0 flex items-center cursor-grab bg-zinc-800 rounded-l-lg touch-none'>
        <IconGripVertical className='text-purple-500' />
      </div>

      <div className='flex-grow px-3 py-2 rounded-r-lg bg-zinc-800'>

        <div className='mb-1 text-sm font-semibold'>
          {task.title}
        </div>

        <div className='flex justify-between items-center'>
          <div className='text-xs font-semibold text-purple-300'>{task.priority && `${task.priority}`}</div>
          <div className='flex gap-1'>
            <button className='bg-purple-500 p-1 rounded-md text-white'><IconInfoCircle size={14} /></button>
            <button 
              className="p-1 bg-red-500 text-white rounded-md"
            >
              <IconTrash size={14} />
            </button>
          </div>
        </div>
        
      </div>

    </div>
  );
}
