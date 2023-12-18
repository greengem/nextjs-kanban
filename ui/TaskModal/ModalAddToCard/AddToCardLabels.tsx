'use client'
import { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Input } from '@nextui-org/input';
import { IconArrowLeft, IconEdit, IconTag, IconX } from '@tabler/icons-react';
import { handleRemoveLabel, handleSaveLabel } from '@/actions/LabelServerActions';
import { Button } from '@nextui-org/button';

type Label = {
    id: string;
    title: string | null;
    color: string;
};

const colorOptions = [
    { key: 'red', name: 'Red' },
    { key: 'amber', name: 'Amber' },
    { key: 'orange', name: 'Orange' },
    { key: 'yellow', name: 'Yellow' },
    { key: 'lime', name: 'Lime' },
    { key: 'green', name: 'Green' },
    { key: 'emerald', name: 'Emerald' },
    { key: 'teal', name: 'Teal' },
    { key: 'cyan', name: 'Cyan' },
    { key: 'sky', name: 'Sky' },
    { key: 'blue', name: 'Blue' },
    { key: 'indigo', name: 'Indigo' },
    { key: 'violet', name: 'Violet' },
    { key: 'purple', name: 'Purple' },
    { key: 'fuchsia', name: 'Fuchsia' },
    { key: 'pink', name: 'Pink' },
    { key: 'rose', name: 'Rose' },

];

export default function AddToCardLabels({ labels, task, boardId }: { labels: Label[]; task: any; boardId: string; }) {
    const taskId = task.id;
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [editingLabel, setEditingLabel] = useState<Label | null>(null);

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

    const enterEditMode = (label: Label) => {
        setEditingLabel(label);
        setEditMode(true);
    };

    const exitEditMode = () => {
        setEditMode(false);
        setEditingLabel(null);
    };

    return (
        <li className='bg-zinc-800 rounded-md'>
            <Popover placement="bottom-start" triggerScaleOnOpen={false}>
                <PopoverTrigger>
                    <button className='flex items-center gap-2 px-2 py-2 w-full'><IconTag size={14} /> Labels</button>
                </PopoverTrigger>

                <PopoverContent className='w-64'>
                    {editMode ? (
                        <div className="px-1 py-2 w-full">
                            <div className='flex justify-between mb-3 items-center'>
                                <button onClick={exitEditMode}><IconArrowLeft /></button>
                                <h4 className="text-center font-semibold text-lg">Edit Label</h4>
                                <button><IconX /></button>
                            </div>

                            <div className='bg-green-500 h-7 w-full mb-3 rounded-md p-1'>Text</div>

                            <div className='mb-2'>
                                <h4 className='uppercase font-semibold text-xs text-zinc-500 mb-1'>Title</h4>
                                <Input labelPlacement='outside' placeholder='Enter a title' size='sm' />
                            </div>

                            <div className='grid grid-cols-5 gap-2 mb-3'>
                            {colorOptions.map(color => (
                                <span
                                    key={color.key}
                                    className={`bg-${color.key}-500 h-6 w-full rounded-md cursor-pointer`}
                                />
                            ))}
                            </div>

                            <Button className='w-full' size='sm'>X Remove Color</Button>

                            <hr className='my-3' />

                            <div className='flex justify-between'>
                                <Button size='sm' color='primary'>Save</Button>
                                <Button size='sm' color='danger'>Cancel</Button>
                            </div>

                        </div>
                    ) : (
                        <div className="px-1 py-2 w-full">
                            <h4 className="text-center font-semibold text-lg mb-3">Labels</h4>
                            <Input placeholder="Search for labels..." size="sm" className="w-full mb-3" labelPlacement="outside" />
                            <CheckboxGroup value={selectedLabels} onValueChange={setSelectedLabels} className='mb-3'>
                                {labels.map(label => (
                                    <Checkbox
                                        key={label.id}
                                        value={label.id}
                                        isSelected={selectedLabels.includes(label.id)}
                                        onValueChange={() => handleCheckboxChange(label.id)}
                                        classNames={{
                                            base: `inline-flex max-w-md w-full bg-content1 m-0 items-center justify-start cursor-pointer rounded-lg gap-1 p-1 data-[selected=true]:border-primary`,
                                            label: "w-full flex items-center",
                                        }}
                                    >
                                        <div className={`bg-${label.color}-500 h-6 w-full rounded-md mr-2`}></div>
                                        {label.title && <span>{label.title}</span>}
                                        <button onClick={() => enterEditMode(label)}><IconEdit size={22} /></button>
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                            <Button className='w-full'>Create a new label</Button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </li>
    );
}