import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Input } from "@nextui-org/input";
import { CheckboxGroup } from "@nextui-org/checkbox";
import { IconTag } from '@tabler/icons-react';
import CustomCheckbox from "./CustomCheckbox";
import { color } from "framer-motion";

type ColorName = 'green' | 'yellow' | 'red' | 'orange' | 'purple' | 'blue';

const colorMapping: Record<ColorName, string> = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
    blue: "bg-blue-500",
};

function getTailwindColorClass(colorName: ColorName): string {
    return colorMapping[colorName] || "bg-gray-500";
}

export default function TaskModalLabelAddToCard({ labels } : { labels: any }) {
    
    return(
        <Popover placement="bottom-start">

            <PopoverTrigger>
                <button className="w-full flex items-center gap-2"><IconTag size={14} /> Labels</button>
            </PopoverTrigger>

            <PopoverContent>
                <div className="px-1 py-2">
                    <h4 className="text-center font-semibold text-lg mb-2">Labels</h4>
                    <Input placeholder="Search for labels..." size="sm" className="w-full mb-2" labelPlacement="outside" />
                    <CheckboxGroup
                        classNames={{
                            base: "w-full"
                        }}
                    >
                        {labels.map((label: any) => (
                            <CustomCheckbox key={label.id} labelColor={label.color} labelId={label.id} displayColor={getTailwindColorClass(label.color)} />
                        ))}
                    </CheckboxGroup>
                </div>
            </PopoverContent>
            
        </Popover>
    )
}