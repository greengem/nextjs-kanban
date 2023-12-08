import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea, Button } from '@nextui-org/react';
import { TaskSummary } from '@/types/types';
import { format } from 'date-fns';
import { IconArrowRight, IconCalendar, IconCards, IconCheckbox, IconExclamationCircle, IconPaint, IconPaperclip, IconTag, IconTextPlus, IconTrash, IconUser } from '@tabler/icons-react';
import { useState } from 'react';
import DeleteTaskForm from '../Forms/DeleteTaskForm';
import EditTaskForm from '../Forms/EditTaskForm';

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
        <ModalHeader className='flex gap-2 bg-primary'>
          <IconCards size={20} className='mt-1 w-5' />
          <div className='flex-col w-full pr-5'>
            <EditTaskForm taskId={selectedTask.id} title={selectedTask.title} boardId={boardId} />
            <div className='text-xs text-zinc-100 font-normal'>
              <p>In list Col Name</p>
              <p>Created on {format(new Date(selectedTask.createdAt), 'MMMM d, yyyy')} | Updated on {format(new Date(selectedTask.updatedAt), 'MMMM d, yyyy')}</p>
              <p></p>
            </div>
          </div>
        </ModalHeader>

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
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconTrash size={14} /> Delete</li>
                <li className='flex items-center gap-2 bg-zinc-800 px-2 py-1 rounded-md'><IconTrash size={14} /> Make Template</li>
              </ul>
            </div>

          </div>
        </ModalBody>
        <ModalFooter>
          <DeleteTaskForm 
            taskId={selectedTask.id} 
            boardId={boardId} 
            columnId={selectedTask.columnId}
            onCloseModal={onClose}
          />
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
