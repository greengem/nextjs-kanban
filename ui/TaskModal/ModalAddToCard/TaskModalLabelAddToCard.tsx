'use client'
import { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Input, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { IconTag } from '@tabler/icons-react';
import { Label } from '@/types/types';
import { handleRemoveLabel, handleSaveLabel } from '@/actions/LabelServerActions';

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

export default function TaskModalLabelAddToCard({ 
    labels, taskId, boardId
}: { 
    labels: Label[], taskId: string, boardId: string;
}) {
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

    useEffect(() => {
        const initialSelected = labels.filter(label => label.isSelected).map(label => label.id);
        setSelectedLabels(initialSelected);
    }, [labels]);

    const handleCheckboxChange = async (labelId: string) => {
        const isSelected = selectedLabels.includes(labelId);
        const data = { labelId, taskId, boardId };
    
        try {
            if (isSelected) {
                // Remove the label from task
                await handleRemoveLabel(data);
                setSelectedLabels(selectedLabels.filter(id => id !== labelId));
            } else {
                // Add the label to task
                await handleSaveLabel(data);
                setSelectedLabels([...selectedLabels, labelId]);
            }
        } catch (error) {
            console.error('Error updating label association:', error);
        }
    };
    

    
    return (
        <Popover placement="bottom-start">
            <PopoverTrigger>
                <button className="w-full flex items-center gap-2"><IconTag size={14} /> Labels</button>
            </PopoverTrigger>

            <PopoverContent>
                <div className="px-1 py-2">
                    <h4 className="text-center font-semibold text-lg mb-2">Labels</h4>
                    <Input placeholder="Search for labels..." size="sm" className="w-full mb-2" labelPlacement="outside" />
                    <CheckboxGroup classNames={{ base: "w-full" }}>
                        {labels.map((label: any) => (
                            <Checkbox 
                                key={label.id} 
                                value={label.color}
                                isSelected={selectedLabels.includes(label.id)}
                                onValueChange={() => handleCheckboxChange(label.id)}
                                classNames={{
                                    base: "inline-flex max-w-md w-full bg-content1 m-0 items-center justify-start cursor-pointer rounded-lg gap-1 p-1 data-[selected=true]:border-primary",
                                    label: "w-full",
                                }}
                            >
                                <div className="w-full flex justify-between gap-2">
                                    <div className={`${getTailwindColorClass(label.color)} h-6 w-full rounded-md`}></div>
                                </div>
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                </div>
            </PopoverContent>
        </Popover>
    );
}
