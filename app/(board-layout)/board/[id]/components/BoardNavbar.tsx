import BoardMenu from "../components/BoardMenu";
import BoardFavourite from "../components/BoardFavourite";
import BoardTitle from "../components/BoardTitle";
import BoardFilter from "./BoardFilter";
import { getLabelsForBoard } from "@/lib/FetchData";
import { LabelSummary, BoardSummary } from "@/types/types";

export default async function BoardNavbar({
    board
} : {
    board: BoardSummary;
}) {
    const labels: LabelSummary[] = await getLabelsForBoard(board.id);

    return (
        <div className="flex justify-between items-center bg-zinc-700 opacity-90 px-5 py-2 mb-5">

            <div className="flex gap-5 items-center">
                <BoardTitle boardTitle={board.title} boardId={board.id} />
                <BoardFavourite board={board} />
                <BoardFilter labels={labels} />
            </div>

            <BoardMenu boardId={board.id} />

        </div>
    )
}
