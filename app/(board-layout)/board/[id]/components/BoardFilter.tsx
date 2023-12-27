'use client'
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { LabelSummary } from "@/types/types";
import { IconFilter } from "@tabler/icons-react";

const LabelColorIndicator = ({ color } : { color: string }) => (
    <div className={`h-4 w-4 rounded-full bg-${color}-500`} />
);

export default function BoardFilter({
    labels
} : {
    labels: LabelSummary[]
}) {
    const [selectedLabel, setSelectedLabel] = useState('');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSelectionChange = (value: string) => {
        setSelectedLabel(value);
        setPopoverOpen(false);

        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set('label', value);
        } else {
            params.delete('label');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Popover 
            placement="bottom" 
            showArrow 
            backdrop="blur" 
            isOpen={popoverOpen}
            onOpenChange={setPopoverOpen}
        >
            <PopoverTrigger>
                <Button  color="primary" size="sm" isIconOnly>
                    <IconFilter size={16} />
                </Button>
            </PopoverTrigger>

            <PopoverContent>
                <div className="px-1 py-3 w-64 space-y-2">
                    <Select
                        label="Label"
                        placeholder="Select a label"
                        size="sm"
                        value={selectedLabel}
                        onChange={(e) => handleSelectionChange(e.target.value)}
                    >
                        {labels.map(label => (
                            <SelectItem 
                                key={label.id} 
                                value={label.id}
                                startContent={<LabelColorIndicator color={label.color} />}
                            >
                                {label.title}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </PopoverContent>
        </Popover>
    );
}
