'use client'
import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { TaskSummary } from '@/types/types';
import { format } from 'date-fns';
import { IconArrowRight, IconCalendar, IconCheckbox, IconPaint, IconPaperclip, IconTag, IconTextPlus, IconTrash, IconUser } from '@tabler/icons-react';

import DeleteTaskForm from '../Forms/DeleteTaskForm';
import TaskModalTitle from './TaskModalTitle';
import TaskModalDescription from './TaskModalDescription';
import TaskModalAddToCard from './TaskModalAddToCard';
import TaskModalActions from './TaskModalActions';
import TaskModalActivity from './TaskModalActivity';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTask: TaskSummary | null;
  boardId: string;
}


export default function TaskModal({
  isOpen,
  onClose,
  selectedTask,
  boardId,
}: TaskDetailModalProps) {


  return (
    <Modal isOpen={isOpen} onClose={onClose} size='3xl' scrollBehavior='outside'>
      <ModalContent>
      {selectedTask ? (
        <> 
        <ModalHeader className='flex gap-2 bg-primary'>
          <TaskModalTitle selectedTask={selectedTask} boardId={boardId} />
        </ModalHeader>

        <ModalBody>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
            <div className='col-span-3 space-y-5'>
              <TaskModalDescription selectedTask={selectedTask} boardId={boardId} />
              <TaskModalActivity />
              {selectedTask.dueDate && 
                <p>Due Date: {format(new Date(selectedTask.dueDate), 'MMMM d, yyyy')}</p>
              }
            </div>

            <div className='col-span-1 space-y-2'>
              <TaskModalAddToCard />
              <TaskModalActions selectedTask={selectedTask} boardId={boardId} onClose={onClose} />
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
