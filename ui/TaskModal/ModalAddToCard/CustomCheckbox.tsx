import { cn } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/checkbox";

export default function CustomCheckbox({ 
  labelColor, labelId, displayColor
} : { 
  labelColor: string; labelId: string; displayColor: string;
}){
  return (
    <Checkbox
      value={labelColor}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "items-center justify-start",
          "cursor-pointer rounded-lg gap-1 p-1",
          "data-[selected=true]:border-primary"
        ),
        label: "w-full",
      }}
    >
      <div className="w-full flex justify-between gap-2">
        <div className={`${displayColor} h-6 w-full rounded-md`}></div>
      </div>
    </Checkbox>
  );
};
