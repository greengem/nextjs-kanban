'use client';
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { handleFavoriteBoard } from "@/actions/UserServerActions";

export default function BoardFavourite({ 
    board 
} : {
    board: any
}) {

    const handleToggleFavorite = async () => {
        handleFavoriteBoard(board.id)
    };

    return (
        <button onClick={handleToggleFavorite} className="mx-3">
            {board.isFavorited ? <IconStarFilled className="text-primary" size={18} /> : <IconStar size={18} />}
        </button>
    )
}