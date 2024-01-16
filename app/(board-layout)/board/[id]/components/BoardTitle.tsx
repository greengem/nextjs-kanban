'use client'
import { useState } from 'react';
import { Input } from "@nextui-org/input"
import { Button, ButtonGroup } from "@nextui-org/button"
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleEditBoard } from '@/actions/BoardServerActions';
import { BoardEditData } from '@/types/types';
import { EditBoardSchema } from '@/types/zodTypes';
import { IconX } from '@tabler/icons-react';

export default function BoardTitle({
    boardId, boardTitle
} : {
    boardId: string, boardTitle: string
}) {
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, reset, setValue, watch, formState: { isSubmitting } } = useForm<BoardEditData>({
        resolver: zodResolver(EditBoardSchema),
        defaultValues: {
            title: boardTitle,
            id: boardId,
        }
    });

    const titleValue = watch('title');

    const handleTitleChange = (newValue: string) => {
        setValue('title', newValue, { shouldValidate: true });
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            reset();
        }
    };

    const onSubmit: SubmitHandler<BoardEditData> = async (data) => {
        const response = await handleEditBoard(data);

        if (response.success) {
            toast.success('Board Edited');
            reset({ ...data, title: data.title });
            setIsEditing(false);
        } else {
            toast.error(response.message);
        }
    };

    return (
        <>
            {!isEditing && (
                <h2 onClick={toggleEdit} className="cursor-pointer whitespace-nowrap overflow-ellipsis block overflow-x-hidden max-w-32 md:max-w-64">{boardTitle}</h2>
            )}
            {isEditing && (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap md:flex-nowrap gap-2">
                    <Input 
                        autoComplete="off"
                        value={titleValue}
                        size='sm'
                        labelPlacement='outside'
                        onValueChange={handleTitleChange}
                        autoFocus
                        className='grow shrink'
                    />
                    <input type="hidden" {...register('id')} />
                    <Button type="submit" color="primary" size="sm" disabled={isSubmitting}>Save</Button>
                    <Button onClick={toggleEdit} size="sm" isIconOnly><IconX size={18} /></Button>
                </form>
            )}
        </>
    )
}
