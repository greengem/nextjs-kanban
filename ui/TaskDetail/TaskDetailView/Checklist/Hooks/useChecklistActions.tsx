'use client'
import { useState, useCallback } from 'react';
import { handleCreateChecklistItem, handleDeleteChecklistItem } from '@/actions/ChecklistServerActions';
import toast from 'react-hot-toast';

export function useChecklistActions(boardId: string) {
  const [showInput, setShowInput] = useState<Record<string, boolean>>({});
  const [newItemContent, setNewItemContent] = useState<string>('');

  const handleAddItem = useCallback(async (checklistId: string): Promise<void> => {
    try {
        const result = await handleCreateChecklistItem({
            content: newItemContent,
            checklistId: checklistId,
            boardId: boardId
        });
        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    } catch (error) {
        console.error('Error adding checklist item:', error);
    }
    setShowInput(prev => ({ ...prev, [checklistId]: false }));
  }, [newItemContent, boardId]);

  const handleDeleteItem = useCallback(async (checklistItemId: string): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this item?")) {
        try {
            const result = await handleDeleteChecklistItem({
                checklistItemId: checklistItemId,
                boardId: boardId
            });
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error deleting checklist item:', error);
        }
    }
  }, [boardId]);

  const toggleInput = useCallback((checklistId: string) => {
    setShowInput(prev => ({ ...prev, [checklistId]: !prev[checklistId] }));
    setNewItemContent("");
  }, []);

  return { showInput, newItemContent, setNewItemContent, handleAddItem, handleDeleteItem, toggleInput };
}
