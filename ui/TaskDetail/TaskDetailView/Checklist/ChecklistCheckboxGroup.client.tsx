"use client";
import { useState } from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { IconEdit, IconX } from "@tabler/icons-react";
import { toast } from "sonner";
import DeleteChecklistItemButton from "./DeleteChecklistItemButton.client";
import {
  handleEditChecklistItemContent,
  handleToggleCheckedItem,
} from "@/server-actions/ChecklistServerActions";
import { ChecklistSummary, ChecklistItemSummary } from "@/types/types";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

interface ChecklistCheckboxGroupProps {
  checkedItemIds: string[];
  checklist: ChecklistSummary;
  taskId: string;
}

export default function ChecklistCheckboxGroup({
  checkedItemIds,
  checklist,
  taskId,
}: ChecklistCheckboxGroupProps) {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});

  const handleEditClick = (itemId: string) => {
    setEditingItemId(itemId);
  };

  const handleCancelOrSubmit = () => {
    setEditingItemId(null);
    setInputErrors({});
  };

  const handleToggle = async (checklistItemId: string, isChecked: boolean) => {
    const response = await handleToggleCheckedItem({
      checklistItemId,
      isChecked,
      taskId,
    });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleEditSubmit = async (data: FormData) => {
    const response = await handleEditChecklistItemContent(data);
    if (response.success) {
      toast.success(response.message);
      handleCancelOrSubmit();
    } else {
      toast.error(response.message);
      const itemId = data.get("checklistItemId") as string;
      setInputErrors({ [itemId]: response.message });
    }
  };

  return (
    <CheckboxGroup className="mb-3" defaultValue={checkedItemIds}>
      {checklist.items.map((item: ChecklistItemSummary) => (
        <div
          className="flex justify-between gap-5 hover:bg-zinc-900 py-1 px-2 rounded-md"
          key={item.id}
        >
          <div className="flex grow items-center">
            <Checkbox
              value={item.id}
              onChange={(event) => handleToggle(item.id, event.target.checked)}
            >
              {editingItemId !== item.id && <span>{item.content}</span>}
            </Checkbox>

            {editingItemId === item.id && (
              <form
                className="flex gap-2 ml-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSubmit(new FormData(e.currentTarget));
                }}
              >
                <Input
                  autoComplete="off"
                  size="sm"
                  placeholder="Enter checklist item name..."
                  labelPlacement="outside"
                  name="content"
                  defaultValue={item.content}
                  isInvalid={!!inputErrors[item.id]}
                  errorMessage={inputErrors[item.id]}
                />
                <input type="hidden" name="checklistItemId" value={item.id} />
                <input type="hidden" name="taskId" value={taskId} />
                <Button type="submit" size="sm" color="primary">
                  Save
                </Button>
                <Button
                  size="sm"
                  type="button"
                  onClick={handleCancelOrSubmit}
                  isIconOnly
                >
                  <IconX size={16} />
                </Button>
              </form>
            )}
          </div>

          <div className="flex gap-2">
            <button
              className="shrink-0 grow-0"
              onClick={() => handleEditClick(item.id)}
            >
              <IconEdit
                className="text-zinc-500 hover:text-primary"
                size={18}
              />
            </button>
            <DeleteChecklistItemButton
              checklistItemId={item.id}
              taskId={taskId}
            />
          </div>
        </div>
      ))}
    </CheckboxGroup>
  );
}
