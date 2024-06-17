"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUIContext } from "@/contexts/UIContext";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { toast } from "sonner";
import { fetchUnsplashImages } from "@/server-actions/FetchUnsplashImages";
import {
  handleEditBoardImage,
  handleRemoveBoardImage,
} from "@/server-actions/BoardServerActions";
import { IconTrash, IconX } from "@tabler/icons-react";

interface FormData {
  searchTerm: string;
}

export default function BoardBackgroundImage({ boardId }: { boardId: string }) {
  const { uiState, toggleBackgroundImageSelector } = useUIContext();
  const { register, handleSubmit } = useForm<FormData>();
  const [images, setImages] = useState<string[]>([]);

  if (!uiState.isBackgroundImageSelectorOpen) {
    return null;
  }

  const handleClose = () => {
    toggleBackgroundImageSelector();
  };

  const handleDeleteBackground = async () => {
    if (
      window.confirm("Are you sure you want to remove the background image?")
    ) {
      try {
        const response = await handleRemoveBoardImage(boardId);
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Error removing board background image:");
      }
    }
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
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error updating board background image:");
    }
  };

  return (
    <div className="bg-zinc-900 shadow-inner border-t-1 border-zinc-700">
      <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-2">
        <div className="flex gap-x-2">
          <Input
            autoComplete="off"
            {...register("searchTerm")}
            labelPlacement="outside"
            placeholder="Search for background images..."
          />
          <Button type="submit" color="primary">
            Search
          </Button>
          <Button isIconOnly type="button" onClick={handleClose}>
            <IconX size={16} />
          </Button>
          <Button
            isIconOnly
            type="button"
            onClick={handleDeleteBackground}
            className="hover:bg-red-500"
          >
            <IconTrash size={16} />
          </Button>
        </div>

        {images.length > 0 && (
          <div className="flex gap-3 overflow-x-scroll no-scrollbar mt-2">
            {images.map((image, index) => (
              <div key={index} className="relative h-24 w-32 shrink-0 grow-0">
                <Image
                  src={image}
                  onClick={() => handleImageClick(image)}
                  alt="Unsplash Image"
                  fill={true}
                  sizes="128px"
                  className="object-cover rounded-lg shadow-md grow-0 shrink-0 cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
