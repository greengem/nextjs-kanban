'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUIContext } from '@/contexts/UIContext';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import toast from 'react-hot-toast';
import { fetchUnsplashImages } from '@/actions/FetchUnsplashImages';
import { handleEditBoardImage } from '@/actions/BoardServerActions';

interface FormData {
    searchTerm: string;
}

export default function BoardBackgroundImage({ boardId } : {boardId: string}) {
    const { uiState, toggleBackgroundImageSelector } = useUIContext();
    const { register, handleSubmit } = useForm<FormData>();
    const [images, setImages] = useState<string[]>([]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    if (!uiState.isBackgroundImageSelectorOpen) {
        return null;
    }

    const handleClose = () => {
        toggleBackgroundImageSelector();
    };

    const onSubmit = async (data: FormData) => {
        const results = await fetchUnsplashImages(data.searchTerm);
        setImages(results);
    };

    const handleImageClick = async (imageUrl: string) => {
        try {
            const response = await handleEditBoardImage(imageUrl, boardId);
            if (response.success) {
                toast.success(response.message);
                setIsPopoverOpen(false);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Error updating board background image:');
            console.error('Error updating board background image:', error);
        }
    };

    return (
        <div className="bg-zinc-200 shadow-inner">
            <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-3">
                <div className='flex gap-x-2'>
                    <Input
                        {...register('searchTerm')}
                        labelPlacement='outside'
                        placeholder="Search Unsplash..."
                    />
                    <Button type="submit" color="primary">Search</Button>
                    <Button type="button" onClick={handleClose}>Close</Button>
                </div>

                {
                    images.length > 0 && (
                        <div className="flex gap-3 overflow-x-scroll no-scrollbar mt-3">
                            {images.map((image, index) => (
                                <div key={index} className='relative h-24 w-32'>
                                <Image 
                                    src={image}
                                    onClick={() => handleImageClick(image)} 
                                    alt="Unsplash Image"
                                    fill={true}
                                    sizes="128px"
                                    className='object-cover rounded-lg shadow-md grow-0 shrink-0 cursor-pointer'
                                />
                                </div>
                            ))}
                        </div>
                    )
                }
            </form>
        </div>
    );
}
