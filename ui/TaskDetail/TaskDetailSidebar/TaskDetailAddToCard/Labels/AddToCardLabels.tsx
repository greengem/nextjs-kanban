'use client'
import { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Input } from '@nextui-org/input';
import { IconArrowLeft, IconDeviceFloppy, IconEdit, IconPlus, IconTag, IconTrash, IconX } from '@tabler/icons-react';
import { handleRemoveLabel, handleSaveLabel, handleUpdateLabel, handleDeleteLabel, handleCreateLabel } from '@/actions/LabelServerActions';
import { Button } from '@nextui-org/button';
import { colorOptions } from './ColorOptions';
import toast from 'react-hot-toast';

type Label = {
    id: string;
    title: string | null;
    color: string;
};

export default function AddToCardLabels({ labels, task, boardId }: { labels: Label[]; task: any; boardId: string; }) {
    const taskId = task.id;
    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [editingLabel, setEditingLabel] = useState<Label | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [tempLabelTitle, setTempLabelTitle] = useState('');
    const [tempLabelColor, setTempLabelColor] = useState('');

    useEffect(() => {
        const initialSelectedLabels = task.labels.map((label: Label) => label.id);
        setSelectedLabels(initialSelectedLabels);
    }, [task, labels]);

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

    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    const enterEditMode = (label: Label) => {
        setEditingLabel(label);
        setEditMode(true);
        setTempLabelTitle(label.title || '');
        setTempLabelColor(label.color);
    };
    
    const exitEditMode = () => {
        setEditMode(false);
        setEditingLabel(null);
    };

    const enterCreateMode = () => {
        setEditingLabel(null);
        setEditMode(true);
        setTempLabelTitle('');
        setTempLabelColor('blue');
    };
    
    const onColorClick = (color: string) => {
        setTempLabelColor(color);
    };

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempLabelTitle(e.target.value);
    };
    
    const handleDelete = async () => {
        if (editingLabel && window.confirm("Are you sure you want to delete this label?")) {
            const deleteData = {
                labelId: editingLabel.id,
                boardId: boardId
            };
    
            const response = await handleDeleteLabel(deleteData);
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
    
            exitEditMode();
        }
    };

    const renderLabelView = () => (
        <div className="px-1 py-2 w-full">
            <div className='flex justify-between items-center mb-3'>
                <div className='opacity-0'>
                    <IconArrowLeft className='hidden' size={20} />
                </div>
                <h4 className="text-center font-semibold text-lg">Labels</h4>
                <button onClick={closePopover}><IconX size={20} /></button>
            </div>
            <CheckboxGroup value={selectedLabels} onValueChange={setSelectedLabels} className='mb-3'>
                {labels.map(label => (
                    <Checkbox
                        key={label.id}
                        value={label.id}
                        onValueChange={() => handleCheckboxChange(label.id)}
                        classNames={{
                            base: `inline-flex max-w-md w-full bg-content1 m-0 items-center justify-start cursor-pointer rounded-lg gap-1 p-1 data-[selected=true]:border-primary`,
                            label: "w-full flex items-center",
                        }}
                    >
                        <div className={`bg-${label.color}-500 h-6 w-full rounded-md mr-2 py-1 px-2`}>
                            {label.title && <p className='text-xs font-semibold text-white'>{label.title}</p>}
                        </div>
                        <button onClick={() => enterEditMode(label)}><IconEdit className='text-zinc-500 hover:text-primary' size={22} /></button>
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <Button className='w-full flex items-center gap-1' color='primary' size='sm' onClick={enterCreateMode}><IconPlus size={18} /> Create a new label</Button>
        </div>
    );

    const renderEditMode = () => {
        const isCreating = !editingLabel;
        const title = isCreating ? "Create Label" : "Edit Label";
    
        const handleSave = async () => {
            if (isCreating) {
                const createData = {
                    color: tempLabelColor,
                    title: tempLabelTitle,
                    boardId: boardId,
                    taskId: taskId
                };
                const response = await handleCreateLabel(createData);

                if (response.success) {
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            } else {
                const updateData = {
                    labelId: editingLabel.id,
                    color: tempLabelColor,
                    title: tempLabelTitle,
                    boardId: boardId
                };
                const response = await handleUpdateLabel(updateData);

                if (response.success) {
                    toast.success(response.message);
                } else {
                    toast.error(response.message);
                }
            }
            exitEditMode();
        };
    
        return (
            <div className="px-1 py-2 w-full">
                <div className='flex justify-between mb-3 items-center'>
                    <button onClick={exitEditMode}><IconArrowLeft size={20} /></button>
                    <h4 className="text-center font-semibold text-lg">{title}</h4>
                    <button onClick={closePopover}><IconX size={20} /></button>
                </div>
    
                <div className={`bg-${tempLabelColor}-500 h-9 w-full mb-3 rounded-md p-2 font-semibold text-white`}>
                    {tempLabelTitle}
                </div>
    
                <div className='mb-3'>
                    <h4 className='uppercase font-semibold text-xs text-zinc-500 mb-1'>Title</h4>
                    <Input 
                        autoComplete="off"
                        labelPlacement='outside' 
                        placeholder='Enter a title' 
                        size='sm' 
                        value={tempLabelTitle}
                        onChange={onTitleChange}
                    />
                </div>
    
                <div className='grid grid-cols-5 gap-2 mb-3'>
                    {colorOptions.map(color => (
                        <div className='w-full' key={color.key} onClick={() => onColorClick(color.key)}>
                            <div className={`bg-${color.key}-500 h-6 w-full rounded-md cursor-pointer`} />
                        </div>
                    ))}
                </div>
    
                <div className='grid grid-cols-2 gap-3'>
                    <Button onClick={handleSave} size='sm' color='primary'><IconDeviceFloppy size={16} /> Save</Button>
                    <Button onClick={exitEditMode} size='sm'><IconX size={16} /> Cancel</Button>
                </div>

                <hr className='my-3 border-zinc-200' />

                { !isCreating && (
                    <Button className='w-full flex items-center gap-1' size='sm' color='danger' onClick={handleDelete}>
                        <IconTrash size={16} />Delete Label
                    </Button>
                )}
            </div>
        );
    };

    return (
        <li className='bg-zinc-200 hover:bg-zinc-300 rounded-md ring-2 hover:ring-primary'>
            <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen} placement="left-start" triggerScaleOnOpen={false}>
                <PopoverTrigger>
                    <button className='flex items-center gap-2 px-2 py-2 w-full'><IconTag size={14} /> Labels</button>
                </PopoverTrigger>

                <PopoverContent className='w-64'>
                    {editMode ? renderEditMode() : renderLabelView()}
                </PopoverContent>
            </Popover>
        </li>
    );
}
