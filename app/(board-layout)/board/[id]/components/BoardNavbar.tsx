import { Suspense } from "react";
import BoardMenu from "../components/BoardMenu";
import BoardFavourite from "../components/BoardFavourite";
import BoardTitle from "../components/BoardTitle";
import BoardFilterFetch from "./BoardFilter";
import { BoardSummary } from "@/types/types";
import BoardBackgroundImage from "./BoardBackgroundImage";
import BoardBackgroundImageButton from "./BoardBackgroundImageButton";
import BoardUsers from "./BoardUsers";
import { IconLoader2 } from "@tabler/icons-react";

export default async function BoardNavbar({
    board
} : {
    board: BoardSummary;
}) {
    

    return (
        <div className="mb-5">
            <div className="flex justify-between items-center bg-white/60 backdrop-blur-md px-5 py-2">
                <div className="flex gap-2 items-center">
                    <BoardTitle boardTitle={board.title} boardId={board.id} />
                    <BoardFavourite board={board} />
                    <Suspense fallback={<IconLoader2 className="animate-spin" size={16} />}>
                        <BoardFilterFetch boardId={board.id} />
                    </Suspense>
                    <BoardBackgroundImageButton />
                </div>
                <div className="flex gap-2 items-center">
                    <Suspense fallback={<IconLoader2 className="animate-spin" size={16} />}>
                        <BoardUsers boardId={board.id} />
                    </Suspense>
                    <BoardMenu boardId={board.id} />
                </div>
            </div>
            <BoardBackgroundImage boardId={board.id} />
        </div>
    )
}
