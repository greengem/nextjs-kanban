"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { Label } from "./LabelTypes";
import { createLabel, updateLabel, deleteLabel } from "./LabelActions";
import { colorOptions } from "./ColorOptions";

export function LabelEditMode({
  editingLabel,
  tempLabelTitle,
  setTempLabelTitle,
  tempLabelColor,
  setTempLabelColor,
  exitEditMode,
  closePopover,
  boardId,
  taskId,
}: {
  editingLabel: Label | null;
  tempLabelTitle: string;
  setTempLabelTitle: (title: string) => void;
  tempLabelColor: string;
  setTempLabelColor: (color: string) => void;
  exitEditMode: () => void;
  closePopover: () => void;
  boardId: string;
  taskId: string;
}) {
  const isCreating = !editingLabel;
  const title = isCreating ? "Create Label" : "Edit Label";

  const handleSave = async () => {
    if (isCreating) {
      await createLabel(tempLabelColor, tempLabelTitle, boardId, taskId);
    } else {
      await updateLabel(
        editingLabel.id,
        tempLabelColor,
        tempLabelTitle,
        boardId,
      );
    }
    exitEditMode();
  };

  const handleDelete = async () => {
    if (
      editingLabel &&
      window.confirm("Are you sure you want to delete this label?")
    ) {
      await deleteLabel(editingLabel.id, boardId);
      exitEditMode();
    }
  };

  return (
    <div className="px-1 py-2 w-full">
      <div className="flex justify-between mb-3 items-center">
        <button onClick={exitEditMode}>
          <IconArrowLeft size={20} />
        </button>
        <h4 className="text-center font-semibold text-lg">{title}</h4>
        <button onClick={closePopover}>
          <IconX size={20} />
        </button>
      </div>

      <div
        className={`bg-${tempLabelColor}-500 h-9 w-full mb-3 rounded-md p-2 font-semibold text-white`}
      >
        {tempLabelTitle}
      </div>

      <div className="mb-3">
        <h4 className="uppercase font-semibold text-xs text-zinc-500 mb-1">
          Title
        </h4>
        <Input
          autoComplete="off"
          labelPlacement="outside"
          placeholder="Enter a title"
          size="sm"
          value={tempLabelTitle}
          onChange={(e) => setTempLabelTitle(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-5 gap-2 mb-3">
        {colorOptions.map((color) => (
          <div
            className="w-full"
            key={color.key}
            onClick={() => setTempLabelColor(color.key)}
          >
            <div
              className={`bg-${color.key}-500 h-6 w-full rounded-md cursor-pointer`}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button onClick={handleSave} size="sm" color="primary">
          <IconDeviceFloppy size={16} /> Save
        </Button>
        <Button onClick={exitEditMode} size="sm">
          <IconX size={16} /> Cancel
        </Button>
      </div>

      {!isCreating && (
        <>
          <hr className="my-3 border-zinc-800" />
          <Button
            className="w-full flex items-center gap-1"
            size="sm"
            color="danger"
            onClick={handleDelete}
          >
            <IconTrash size={16} /> Delete Label
          </Button>
        </>
      )}
    </div>
  );
}
