'use client'
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { handleFavoriteBoard } from "@/actions/UserServerActions";
  
export default function BoardFavouriteClient({ isFavorite, boardId } : { isFavorite: boolean, boardId: string }) {

const handleToggleFavorite = async () => {
    await handleFavoriteBoard(boardId);
};

return (
    <button onClick={handleToggleFavorite} className="mx-3">
        {isFavorite ? <IconStarFilled className="text-primary" size={18} /> : <IconStar size={18} />}
    </button>
);
}