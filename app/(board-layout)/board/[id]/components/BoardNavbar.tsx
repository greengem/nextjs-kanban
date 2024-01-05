import BoardMenu from "../components/BoardMenu";
import BoardFavourite from "../components/BoardFavourite";
import BoardTitle from "../components/BoardTitle";
import BoardFilter from "./BoardFilter";
import { getLabelsForBoard } from "@/lib/FetchData";
import { LabelSummary, BoardSummary } from "@/types/types";
import BoardBackgroundImage from "./BoardBackgroundImage";
import BoardBackgroundImageButton from "./BoardBackgroundImageButton";

export default async function BoardNavbar({
    board
} : {
    board: BoardSummary;
}) {
    const labels: LabelSummary[] = await getLabelsForBoard(board.id);

    return (
        <div className="mb-5">
            <div className="flex justify-between items-center bg-white/60 backdrop-blur-md px-5 py-2">
                <div className="flex gap-2 items-center">
                    <BoardTitle boardTitle={board.title} boardId={board.id} />
                    <BoardFavourite board={board} />
                    <BoardFilter labels={labels} />
                    <BoardBackgroundImageButton />
                </div>
                <BoardMenu boardId={board.id} />
            </div>
            <BoardBackgroundImage boardId={board.id} />
        </div>
    )
}
