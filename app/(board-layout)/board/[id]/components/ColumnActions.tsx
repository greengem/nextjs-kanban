'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconEdit, IconMenu2, IconTrash, IconX } from "@tabler/icons-react";
import toast from 'react-hot-toast';
import { handleDeleteColumn, handleEditColumn, handleDeleteColumnTasks } from "@/actions/ColumnServerActions";
import { Input } from "@nextui-org/input";
import { useState } from "react";

export default function ColumnActions({
    columnId, boardId, columnTitle
} : {
    columnId: string; boardId: string; columnTitle: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(columnTitle);

  const handleAction = async (action: 'delete-column' | 'delete-tasks') => {

    // Delete column and tasks within
    if (action === 'delete-column' && window.confirm('Are you sure you want to delete this column?')) {
        const response = await handleDeleteColumn({ id: columnId, boardId });
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
    
    // Delete all the tasks within a column but keep the column
    } else if (action === 'delete-tasks' && window.confirm('Are you sure you want to delete all the tasks in this column?')) {
        const response = await handleDeleteColumnTasks({ columnId, boardId });
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
    }
  }

  const handleSave = async () => {
    const editData = {
        columnId: columnId,
        title: editedTitle,
        boardId: boardId
    };

    const response = await handleEditColumn(editData);
    
    if (response.success) {
        toast.success(response.message);
        setIsEditing(false);
    } else {
        toast.error(response.message);
    }
};

  
  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(columnTitle);
};

  return(
  <>
            {isEditing ? (
                <div className="flex-col w-full">
                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                        <Input 
                            autoComplete="off"
                            label="Column Title"
                            placeholder="Enter a column name"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="pl-0 mb-2"
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <Button size="sm" color="primary" type="submit">Save</Button>
                            <Button size="sm" onClick={handleCancel} isIconOnly><IconX size={20} /></Button>
                        </div>
                    </form>
                </div>
            ) : (
              <>
                  <h3 className="text-large" onClick={() => setIsEditing(true)}>{columnTitle}</h3>
                  <Dropdown>
                      <DropdownTrigger>
                          <button className="bg-zinc-200 p-1 rounded-md"><IconMenu2 size={18} /></button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Column Actions" onAction={(key) => handleAction(key as 'delete-column' | 'delete-tasks')}>
                          <DropdownItem key="delete-tasks" className="text-danger" color="danger" startContent={<IconTrash size={18} />}>Delete all tasks in this column</DropdownItem>
                          <DropdownItem key="delete-column" className="text-danger" color="danger" startContent={<IconTrash size={18} />}>Delete Column</DropdownItem>
                      </DropdownMenu>
                  </Dropdown>
              </>
          )}
  </>
  )
}
