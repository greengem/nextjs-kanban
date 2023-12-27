'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import toast from 'react-hot-toast';
import { fetchUnsplashImages } from '@/actions/FetchUnsplashImages';
import { handleEditBoardImage } from '@/actions/BoardServerActions';
import { IconBackground } from '@tabler/icons-react';

interface FormData {
    searchTerm: string;
}

export default function BoardBackgroundImage({ boardId } : {boardId: string}) {
    const { register, handleSubmit } = useForm<FormData>();
    const [images, setImages] = useState<string[]>([]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
        <Popover 
            isOpen={isPopoverOpen} 
            onOpenChange={setIsPopoverOpen}
            showArrow 
            backdrop="blur" 
        >
            <PopoverTrigger>
                <Button color="primary" size="sm" isIconOnly>
                    <IconBackground size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='overflow-y-scroll'>
                <form onSubmit={handleSubmit(onSubmit)} className="px-1 py-2 max-w-lg space-y-3 max-h-64">
                    <div className='flex gap-x-2'>
                        <Input
                            {...register('searchTerm')}
                            labelPlacement='outside'
                            placeholder="Search unsplash"
                            size='sm'
                        />
                        <Button type="submit" color="primary" size='sm'>Search</Button>
                    </div>

                    {
                        images.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                {images.map((image, index) => (
                                    <div key={index} onClick={() => handleImageClick(image)} className='cursor-pointer'>
                                        <Image 
                                            src={image}
                                            alt="Unsplash Image"
                                            width={240}
                                            height={120}
                                            className='shadow-md rounded-lg'
                                        />
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </form>
            </PopoverContent>
        </Popover>
    );
}
