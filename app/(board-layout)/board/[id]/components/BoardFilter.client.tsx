'use client'
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { LabelSummary } from "@/types/types";
import { IconFilter, IconFilterFilled, IconFilterOff } from "@tabler/icons-react";

const LabelColorIndicator = ({ color } : { color: string }) => (
    <div className={`h-4 w-4 rounded-full bg-${color}-500`} />
);

export default function BoardFilter({
    labels
} : {
    labels: LabelSummary[]
}) {
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    useEffect(() => {
        const labelQuery = searchParams.get('labels');
        if (labelQuery) {
            const labelIds = labelQuery.split(',');
            setSelectedLabels(labelIds);
        }
    }, [searchParams]);

    const handleSelectionChange = (values: string[]) => {
        setSelectedLabels(values);

        const params = new URLSearchParams(searchParams);
        if (values.length > 0) {
            params.set('labels', values.join(','));
        } else {
            params.delete('labels');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const isFilterActive = selectedLabels.length > 0;

    return (
        <Popover 
            placement="bottom" 
            showArrow 
            isOpen={popoverOpen}
            onOpenChange={setPopoverOpen}
        >
            <PopoverTrigger>
                <Button color="primary" size="sm" isIconOnly variant="ghost">
                    {isFilterActive ? (
                        <IconFilterFilled size={16} />
                    ) : (
                        <IconFilter size={16} />
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent>
                <div className="px-1 py-3 w-64 space-y-2">
                    <CheckboxGroup
                        label="Filter by label"
                        color="primary"
                        size="sm"
                        value={selectedLabels}
                        onValueChange={handleSelectionChange}
                    >
                        {labels.map(label => (
                            <Checkbox 
                                key={label.id} 
                                value={label.id}
                                classNames={{
                                    base: `max-w-full w-full`,
                                    label: "w-full flex items-center",
                                }}
                            >
                                <div className="flex w-full items-center justify-between">
                                {label.title}
                                <LabelColorIndicator color={label.color} />
                                </div>
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                </div>
            </PopoverContent>
        </Popover>
    );
}
