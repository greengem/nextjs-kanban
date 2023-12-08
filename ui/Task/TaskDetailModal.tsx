import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea, Button } from '@nextui-org/react';
import { TaskSummary } from '@/types/types';
import { format } from 'date-fns';
import { IconCards, IconExclamationCircle, IconTextPlus } from '@tabler/icons-react';
import { useState } from 'react';
import {RadioGroup, Radio} from "@nextui-org/radio";
import DeleteTaskForm from '../Forms/DeleteTaskForm';

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
    <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
      <ModalContent>
      {selectedTask ? (
        <>
        <ModalHeader className='flex gap-2'>
          <IconCards size={20} className='mt-1 w-5' />
          <div className='flex-col'>
            <h2>{selectedTask.title}</h2>
            <div className='text-sm text-zinc-500 font-normal'>
              <p>In list Col Name</p>
              <p>Created: {format(new Date(selectedTask.createdAt), 'MMMM d, yyyy')}</p>
              <p>Last Updated: {format(new Date(selectedTask.updatedAt), 'MMMM d, yyyy')}</p>
            </div>
          </div>
        </ModalHeader>

        <ModalBody>

          <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>

            <div className='col-span-4 space-y-5'>

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

            <div className='flex gap-2 w-full'>
              <IconExclamationCircle size={20} className='mt-1 w-5' />
              <div className='flex-col w-full'>
                <h4 className='text-large font-semibold'>Priority</h4>
                <RadioGroup 
                  orientation="horizontal" 

                  defaultValue='low'
                  label="Select your task priority"
                >
                  <Radio color='primary' value="none">None</Radio>
                  <Radio color='success' value="low">Low</Radio>
                  <Radio color='warning' value="medium">Medium</Radio>
                  <Radio color='danger' value="high">High</Radio>
                </RadioGroup>
              </div>
            </div>

              {selectedTask.dueDate && 
                <p>Due Date: {format(new Date(selectedTask.dueDate), 'MMMM d, yyyy')}</p>
              }
            </div>

            <div className='col-span-1 space-y-2'>
              <h4 className='text-sm text-zinc-500'>Add to card</h4>
              <div className='bg-primary p-5 text-white'>Item</div>
              <h4 className='text-sm text-zinc-500'>Actions</h4>
              <div className='bg-primary p-5 text-white'>Item</div>
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
