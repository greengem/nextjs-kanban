'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { IconMenu2 } from "@tabler/icons-react";
import toast from 'react-hot-toast';
import { handleDeleteColumn, handleEditColumn } from "@/actions/ColumnActions";
import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function ColumnActions({
    columnId, boardId, columnTitle
} : {
    columnId: string; boardId: string; columnTitle: string;
}) {
	const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(columnTitle);

  const handleAction = async (action: 'edit' | 'delete') => {
    if (action === 'delete' && window.confirm('Are you sure you want to delete this column?')) {
      const response = await handleDeleteColumn({ id: columnId, boardId });
      if (response.success) {
        toast.success('Column Deleted');
      } else {
        toast.error(response.message);
      }
    } else if (action === 'edit') {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    const editData = {
      columnId: columnId,
      title: editedTitle,
      boardId: boardId
    };

    const response = await handleEditColumn(editData);
    
    if (response.success) {
      toast.success('Column Updated');
    } else {
      toast.error(response.message);
    }
    
    setIsEditing(false);
  };
  

  const handleCancel = () => {
    setEditedTitle(columnTitle);
    setIsEditing(false);
  };

  return(
  <>
          {isEditing ? (
              <div className="flex-col w-full">
                  <Input 
                      labelPlacement="outside"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="pl-0 mb-2"
                      autoFocus
                  />
                  <div className="flex gap-2">
                      <Button size="sm" color="primary" onClick={handleSave}>Save</Button>
                      <Button size="sm" onClick={handleCancel}>Cancel</Button>
                  </div>
              </div>
          ) : (
              <>
                  <h3>{columnTitle}</h3>
                  <Dropdown>
                      <DropdownTrigger>
                          <Button variant="flat" isIconOnly size='sm'><IconMenu2 size={20} /></Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Column Actions" onAction={(key) => handleAction(key as 'edit' | 'delete')}>
                          <DropdownItem key="edit">Edit Name</DropdownItem>
                          <DropdownItem key="delete" className="text-danger" color="danger">Delete Column</DropdownItem>
                      </DropdownMenu>
                  </Dropdown>
              </>
          )}
  </>
  )
}
