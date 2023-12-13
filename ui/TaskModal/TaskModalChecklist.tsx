import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { IconCheckbox } from "@tabler/icons-react";
import { Progress } from "@nextui-org/progress";

export default function TaskModalChecklist() {
    return (
        <div>
            <div className="flex gap-3 items-center">
                <IconCheckbox size={32} />
                <h4 className='text-large font-semibold'>Checklist</h4>
            </div>
            <CheckboxGroup defaultValue={["buenos-aires", "london"]}>
                <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
            </CheckboxGroup>
        </div>
    )
}