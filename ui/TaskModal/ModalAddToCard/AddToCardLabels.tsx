'use client'
import { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Input, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { IconTag } from '@tabler/icons-react';
import { handleRemoveLabel, handleSaveLabel } from '@/actions/LabelServerActions';

type Label = {
    id: string;
    title: string | null;
    color: string;
};

export default function AddToCardLabels({ 
    labels, task, boardId
} : {
    labels: Label[]; task: any; boardId: string;
}) {
    const taskId = task.id;
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

    useEffect(() => {
        // Initialize selectedLabels with the IDs of labels associated with the task
        const initialSelectedLabels = task.labels.map((label: Label) => label.id);
        setSelectedLabels(initialSelectedLabels);
    }, [task, labels]);

    // Update to handle label selection change
    const handleCheckboxChange = async (labelId: string) => {
        const isSelected = selectedLabels.includes(labelId);
        const data = { labelId, taskId, boardId };

        try {
            if (isSelected) {
                await handleRemoveLabel(data);
                setSelectedLabels(selectedLabels.filter(id => id !== labelId));
            } else {
                await handleSaveLabel(data);
                setSelectedLabels([...selectedLabels, labelId]);
            }
        } catch (error) {
            console.error('Error updating label association:', error);
        }
    };

    return (
        <li className='bg-zinc-800 rounded-md'>
            <Popover placement="bottom-start" triggerScaleOnOpen={false}>
                <PopoverTrigger>
                    <button className='flex items-center gap-2 px-2 py-2 w-full'><IconTag size={14} /> Labels</button>
                </PopoverTrigger>

                <PopoverContent>
                    <div className="px-1 py-2">
                        <h4 className="text-center font-semibold text-lg mb-2">Labels</h4>
                        <Input placeholder="Search for labels..." size="sm" className="w-full mb-2" labelPlacement="outside" />
                        <CheckboxGroup value={selectedLabels} onValueChange={setSelectedLabels}>
                            {labels.map(label => (
                                <Checkbox
                                    key={label.id}
                                    value={label.id}
                                    isSelected={selectedLabels.includes(label.id)}
                                    onValueChange={() => handleCheckboxChange(label.id)}
                                    classNames={{
                                        base: `inline-flex max-w-md w-full bg-content1 m-0 items-center justify-start cursor-pointer rounded-lg gap-1 p-1 data-[selected=true]:border-primary`,
                                        label: "w-full",
                                    }}
                                >
                                    <div className={`bg-${label.color}-500 h-6 w-full rounded-md mr-2`}></div>
                                    {label.title && <span>{label.title}</span>}
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                    </div>
                </PopoverContent>
            </Popover>
        </li>
    );
}
