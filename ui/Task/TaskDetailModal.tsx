'use client'
import { useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter } from '@nextui-org/modal';
import { Textarea } from "@nextui-org/input";
import { Button } from '@nextui-org/button';
import { TaskSummary } from '@/types/types';
import { format } from 'date-fns';
import { IconArrowRight, IconCalendar, IconCheckbox, IconPaint, IconPaperclip, IconTag, IconTextPlus, IconTrash, IconUser } from '@tabler/icons-react';

import DeleteTaskForm from '../Forms/DeleteTaskForm';
import TaskModalHeader from './TaskModalHeader';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTask: TaskSummary | null;
  boardId: string;
}


export default function TaskDetailModal({
  isOpen,
  onClose,
  selectedTask,
  boardId,
}: TaskDetailModalProps) {
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const toggleEditDescription = () => {
    setIsEditingDescription(!isEditingDescription);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='3xl' scrollBehavior='outside'>
      <ModalContent>
      {selectedTask ? (
        <>
        <TaskModalHeader selectedTask={selectedTask} boardId={boardId} />

        <ModalBody>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>

            <div className='col-span-3 space-y-5'>

            <div className='flex gap-2 w-full'>
              <IconTextPlus size={20} className='mt-1 w-5' />
              <div className='flex-col w-full'>
                <h4 className='text-large font-semibold'>Description</h4>
                {selectedTask.description && !isEditingDescription ? (
                  <p className='cursor-pointer' onClick={toggleEditDescription}>{selectedTask.description}</p>
                ) : (
                  <>
                    <Textarea 
                      placeholder="Enter your description"
                      className='w-full mb-2 mt-1' 
                      defaultValue={selectedTask.description || ''}
                    />
                    <div className='flex gap-2'>
                      <Button size='sm' color='primary'>Save</Button>
                      <Button size='sm' onClick={toggleEditDescription}>Cancel</Button>
                    </div>
                  </>
                )}
              </div>
            </div>

              {selectedTask.dueDate && 
                <p>Due Date: {format(new Date(selectedTask.dueDate), 'MMMM d, yyyy')}</p>
              }
            </div>

            <div className='col-span-1 space-y-2'>
              <h4 className='text-sm text-zinc-500'>Add to card</h4>
              <ul className='text-sm space-y-2'>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconUser size={14} /> Members</li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconTag size={14} /> Labels</li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconCheckbox size={14} /> Checklist</li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconCalendar size={14} /> Dates</li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconPaperclip size={14} /> Attachement</li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconPaint size={14} /> Cover</li>
              </ul>
              <h4 className='text-sm text-zinc-500'>Actions</h4>
              <ul className='text-sm space-y-2'>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconArrowRight size={14} /> Move</li>
                <li className='bg-zinc-800 px-2 py-1 rounded-md'>
                  <DeleteTaskForm 
                    taskId={selectedTask.id} 
                    boardId={boardId} 
                    columnId={selectedTask.columnId}
                    onCloseModal={onClose}
                  />
                </li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconTrash size={14} /> Make Template</li>
              </ul>
            </div>

          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
        </>
              ) : (
                <p>No task selected</p>
              )}
      </ModalContent>
    </Modal>
  );
};
