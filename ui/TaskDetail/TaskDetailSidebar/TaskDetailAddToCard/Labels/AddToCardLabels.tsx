"use client";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Label } from "@prisma/client";
import { LabelView } from "./LabelView";
import { LabelEditMode } from "./LabelEditMode";
import { saveLabel, removeLabel } from "./LabelActions";
import { IconTag } from "@tabler/icons-react";

interface AddToCardLabelsProps {
  labels: Label[];
  activeLabels: Label[];
  taskId: string;
  boardId: string;
}

export default function AddToCardLabels({
  labels,
  activeLabels,
  taskId,
  boardId,
}: AddToCardLabelsProps) {
  const [selectedLabels, setSelectedLabels] = useState<string[]>(
    activeLabels.map((label) => label.id),
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingLabel, setEditingLabel] = useState<Label | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [tempLabelTitle, setTempLabelTitle] = useState<string>("");
  const [tempLabelColor, setTempLabelColor] = useState<string>("");

  const handleCheckboxChange = async (values: string[]) => {
    const newLabel = values.find(
      (labelId) => !selectedLabels.includes(labelId),
    );
    const removedLabel = selectedLabels.find(
      (labelId) => !values.includes(labelId),
    );

    if (newLabel) {
      await saveLabel(newLabel, taskId, boardId);
      setSelectedLabels(values);
    }

    if (removedLabel) {
      await removeLabel(removedLabel, taskId, boardId);
      setSelectedLabels(values);
    }
  };

  const closePopover = () => setIsPopoverOpen(false);

  const enterEditMode = (label: Label) => {
    setEditingLabel(label);
    setEditMode(true);
    setTempLabelTitle(label.title || "");
    setTempLabelColor(label.color);
  };

  const exitEditMode = () => {
    setEditMode(false);
    setEditingLabel(null);
  };

  const enterCreateMode = () => {
    setEditingLabel(null);
    setEditMode(true);
    setTempLabelTitle("");
    setTempLabelColor("blue");
  };

  return (
    <li className="bg-zinc-900 hover:bg-zinc-800 ring-zinc-800 rounded-md ring-2 hover:ring-primary">
      <Popover
        isOpen={isPopoverOpen}
        onOpenChange={(open) => setIsPopoverOpen(open)}
        placement="left-start"
        triggerScaleOnOpen={false}
      >
        <PopoverTrigger>
          <button className="flex items-center gap-2 px-2 py-2 w-full">
            <IconTag size={14} /> Labels
          </button>
        </PopoverTrigger>
        <PopoverContent>
          {editMode ? (
            <LabelEditMode
              editingLabel={editingLabel}
              tempLabelTitle={tempLabelTitle}
              setTempLabelTitle={setTempLabelTitle}
              tempLabelColor={tempLabelColor}
              setTempLabelColor={setTempLabelColor}
              exitEditMode={exitEditMode}
              closePopover={closePopover}
              boardId={boardId}
              taskId={taskId}
            />
          ) : (
            <LabelView
              labels={labels}
              selectedLabels={selectedLabels}
              handleCheckboxChange={handleCheckboxChange}
              enterEditMode={enterEditMode}
              enterCreateMode={enterCreateMode}
              closePopover={closePopover}
            />
          )}
        </PopoverContent>
      </Popover>
    </li>
  );
}
