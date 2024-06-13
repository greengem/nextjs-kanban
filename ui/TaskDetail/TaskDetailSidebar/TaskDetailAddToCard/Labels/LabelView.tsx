"use client";
import { Button } from "@nextui-org/button";
import { IconArrowLeft, IconPlus, IconX } from "@tabler/icons-react";
import { LabelCheckboxGroup } from "./LabelCheckboxGroup";
import { Label } from "./LabelTypes";

export function LabelView({
  labels,
  selectedLabels,
  handleCheckboxChange,
  enterEditMode,
  enterCreateMode,
  closePopover,
}: {
  labels: Label[];
  selectedLabels: string[];
  handleCheckboxChange: (values: string[]) => void;
  enterEditMode: (label: Label) => void;
  enterCreateMode: () => void;
  closePopover: () => void;
}) {
  return (
    <div className="px-1 py-2 w-full">
      <div className="flex justify-between items-center mb-3">
        <div className="opacity-0">
          <IconArrowLeft className="hidden" size={20} />
        </div>
        <h4 className="text-center font-semibold text-lg">Labels</h4>
        <button onClick={closePopover}>
          <IconX size={20} />
        </button>
      </div>
      <LabelCheckboxGroup
        labels={labels}
        selectedLabels={selectedLabels}
        handleCheckboxChange={handleCheckboxChange}
        enterEditMode={enterEditMode}
      />
      <Button
        className="w-full flex items-center gap-1"
        color="primary"
        size="sm"
        onClick={enterCreateMode}
      >
        <IconPlus size={18} /> Create a new label
      </Button>
    </div>
  );
}
