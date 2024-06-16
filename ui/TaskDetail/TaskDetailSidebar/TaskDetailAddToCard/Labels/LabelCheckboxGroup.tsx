import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { IconEdit } from "@tabler/icons-react";
import { Label } from "@prisma/client";

export function LabelCheckboxGroup({
  labels,
  selectedLabels,
  handleCheckboxChange,
  enterEditMode,
}: {
  labels: Label[];
  selectedLabels: string[];
  handleCheckboxChange: (values: string[]) => void;
  enterEditMode: (label: Label) => void;
}) {
  return (
    <CheckboxGroup
      value={selectedLabels}
      onValueChange={handleCheckboxChange}
      className="mb-3"
    >
      {labels.map((label) => (
        <Checkbox
          key={label.id}
          value={label.id}
          classNames={{
            base: `inline-flex max-w-md w-full bg-content1 m-0 items-center justify-start cursor-pointer rounded-lg gap-1 p-1 data-[selected=true]:border-primary`,
            label: "w-full flex items-center",
          }}
        >
          <div
            className={`bg-${label.color}-500 h-6 w-full rounded-md mr-2 py-1 px-2`}
          >
            {label.title && (
              <p className="text-xs font-semibold text-white">{label.title}</p>
            )}
          </div>
          <button onClick={() => enterEditMode(label)}>
            <IconEdit className="text-zinc-500 hover:text-primary" size={22} />
          </button>
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
