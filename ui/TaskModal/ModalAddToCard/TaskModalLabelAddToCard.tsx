import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Input } from "@nextui-org/input";
import {CheckboxGroup, Checkbox} from "@nextui-org/checkbox";
import { IconEdit, IconTag } from '@tabler/icons-react';
import { cn } from "@nextui-org/react";

export default function TaskModalLabelAddToCard() {
    return(
        <Popover placement="bottom-start">

            <PopoverTrigger>
                <button className="w-full flex items-center gap-2"><IconTag size={14} /> Labels</button>
            </PopoverTrigger>

            <PopoverContent>
                <div className="px-1 py-2">
                    <h4 className="text-center font-semibold text-lg mb-2">Labels</h4>
                    <Input placeholder="Search for labels..." size="sm" className="w-full mb-2" labelPlacement="outside" />
                    <CheckboxGroup label="Labels" className="w-full">
                        <Checkbox value="green" className="w-full inline-block">
                            <span className="bg-green-500 w-full">t</span>
                        </Checkbox>
                    </CheckboxGroup>
                </div>
            </PopoverContent>
            
        </Popover>
    )
}