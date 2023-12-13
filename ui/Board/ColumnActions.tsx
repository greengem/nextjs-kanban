'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconEdit, IconMenu2, IconTrash, IconX } from "@tabler/icons-react";
import toast from 'react-hot-toast';
import { handleDeleteColumn, handleEditColumn } from "@/actions/ColumnActions";
import { Input } from "@nextui-org/input";
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
                    <ButtonGroup size="sm">
                      <Button onClick={handleSave}>Save</Button>
                      <Button color="danger" onClick={handleCancel} isIconOnly><IconX size={20} /></Button>
                    </ButtonGroup>
                  </div>
              </div>
          ) : (
              <>
                  <h3>{columnTitle}</h3>
                  <Dropdown backdrop='blur'>
                      <DropdownTrigger>
                          <Button variant="flat" isIconOnly size='sm'><IconMenu2 size={20} /></Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Column Actions" onAction={(key) => handleAction(key as 'edit' | 'delete')}>
                          <DropdownItem key="edit" startContent={<IconEdit size={18} />}>Edit Name</DropdownItem>
                          <DropdownItem key="delete" className="text-danger" color="danger" startContent={<IconTrash size={18} />}>Delete Column</DropdownItem>
                      </DropdownMenu>
                  </Dropdown>
              </>
          )}
  </>
  )
}
