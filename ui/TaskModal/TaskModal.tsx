'use client'
import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Session } from "next-auth";
import { Button } from '@nextui-org/button';
import { ExpandedTask } from '@/types/types';
import TaskModalTitle from './TaskModalTitle';
import TaskModalDescription from './TaskModalDescription';
import TaskModalAddToCard from './TaskModalAddToCard';
import TaskModalActions from './TaskModalActions';
import TaskModalActivity from './TaskModalActivity';
import { handleFetchTask } from '@/actions/FetchModalTask';
import toast from 'react-hot-toast';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  boardId: string;
  session: Session | null;
}


export default function TaskModal({
  isOpen,
  onClose,
  taskId,
  boardId,
  session,
}: TaskDetailModalProps) {

  const [taskData, setTaskData] = useState<ExpandedTask | null>(null);

  const fetchTaskData = async () => {
    try {
      const response = await handleFetchTask(taskId);
      if (response.success) {
        // Check if response.task is defined before setting it
        if (response.task) {
          setTaskData(response.task);
        } else {
          // Handle the case where task is undefined
          console.error('Task data is undefined');
          toast.error('Failed to load task details');
        }
      } else {
        // Check if response.message is defined before using it
        toast.error(response.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error fetching task:', error);
      toast.error('Failed to load task details');
    }
  };
  

  // Fetch task data when the modal opens or taskId changes
  useEffect(() => {
    if (isOpen && taskId) {
      fetchTaskData();
    }
  }, [isOpen, taskId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='3xl' scrollBehavior='outside'>
      <ModalContent>
      {taskData ? (
        <> 
        <ModalHeader className='flex gap-2 bg-primary'>
          <TaskModalTitle selectedTask={taskData} boardId={boardId} />
        </ModalHeader>

        <ModalBody>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>

            <div className='col-span-3 space-y-5'>
              <TaskModalDescription selectedTask={taskData} boardId={boardId} />
              <TaskModalActivity 
                activities={taskData.activities} 
                taskId={taskData.id}
                boardId={boardId}
                columnTitle={taskData.column?.title}
                session={session} 
              />
            </div>

            <div className='col-span-1 space-y-2'>
              <TaskModalAddToCard />
              <TaskModalActions selectedTask={taskData} boardId={boardId} onClose={onClose} />
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
