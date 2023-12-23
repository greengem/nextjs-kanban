'use client'
import { useState } from 'react';
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { handleEditBoard } from '@/actions/BoardServerActions';
import { BoardEditData } from '@/types/types';
import { EditBoardSchema } from '@/types/zodTypes';

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
                <h2 onClick={toggleEdit} className="cursor-pointer">{boardTitle}</h2>
            )}
            {isEditing && (
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                    <Input 
                        autoFocus 
                        size="sm" 
                        labelPlacement="outside"
                        value={titleValue}
                        onValueChange={handleTitleChange}
                    />
                    <input type="hidden" {...register('id')} />
                    <Button type="submit" color="primary" size="sm" disabled={isSubmitting}>Save</Button>
                    <Button onClick={toggleEdit} size="sm">Cancel</Button>
                </form>
            )}
        </>
    )
}
